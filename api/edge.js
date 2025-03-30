import { parse, serialize } from 'cookie';
import { randomUUID } from 'node:crypto';
import { get, update } from '@vercel/edge-config';

const SESSION_TTL = 3600; // Session time-to-live (1 hour)

export default async function handler(req) {
  try {
    const headersObj = Object.fromEntries(req.headers.entries());
    const baseUrl = `https://${headersObj.host}`;
    let url;

    try {
      url = new URL(req.url, baseUrl);
    } catch (error) {
      console.error("Error parsing req.url:", error);
      return new Response("Bad Request: Invalid URL", { status: 400 });
    }

    const cookies = parse(headersObj.cookie || '');
    const sessionId = cookies.sessionId;

    // Logout Endpoint
    if (url.pathname === '/logout') {
      if (sessionId) {
        try {
          // Delete session from Edge Config (using update)
          await update({
            items: [
              {
                operation: 'delete',
                key: `session:${sessionId}`,
              },
            ],
          });
        } catch (error) {
          console.error("Error deleting session from Edge Config:", error);
        }
      }

      return new Response(null, {
        status: 302,
        headers: {
          'Location': `${baseUrl}/logged-out`,
          'Set-Cookie': serialize('sessionId', '', {
            path: '/',
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
          }),
        },
      });
    }

    // Check Session
    if (sessionId) {
      try {
        const session = await get(`session:${sessionId}`);

        if (session) {
          console.log('User is logged in (session)');
          const response = await fetch(url.href, {
            method: req.method,
            headers: {
              ...Object.fromEntries(req.headers.entries()),
              'X-Processed-By': 'edge-function',
            },
            body: req.body,
          });

          return response;
        } else {
          console.log('Session not found');
        }
      } catch (error) {
        console.error("Error getting session from Edge Config:", error);
      }
    }

    // Basic Auth Check (if no session)
    const authHeader = headersObj.authorization;
    const validCredentials = 'Basic ' + btoa('test:test123');

    if (!authHeader) {
      console.log('No credentials provided, prompting for login');
      return new Response('Login required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }

    if (authHeader !== validCredentials) {
      console.log('Invalid credentials');
      return new Response('Invalid credentials', { status: 401 });
    }

    // Create Session
    const newSessionId = randomUUID();
    try {
      // Store session in Edge Config (using update)
      await update({
        items: [
          {
            operation: 'upsert',
            key: `session:${newSessionId}`,
            value: { userId: 'test', createdAt: Date.now() },
          },
        ],
      });
              setTimeout(async () => {
        try {
          await update({
            items: [
              {
                operation: 'delete',
                key: `session:${newSessionId}`,
              },
            ],
          });
          console.log(`Session ${newSessionId} deleted after timeout.`);
        } catch (error) {
          console.error(`Error deleting session ${newSessionId} after timeout:`, error);
        }
      }, SESSION_TTL * 1000);
    } catch (error) {
      console.error("Error setting session in Edge Config:", error);
    }

    const loggedInCookie = serialize('sessionId', newSessionId, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: SESSION_TTL,
    });

    const response = new Response(null, {
      status: 302,
      headers: {
        'Location': baseUrl,
        'Set-Cookie': loggedInCookie,
        'X-Processed-By': 'edge-function',
      },
    });

    return response;
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
