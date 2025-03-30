import { parse, serialize } from 'cookie';
import { randomUUID } from 'node:crypto';
import { kv } from '@vercel/kv';

const SESSION_TTL = 3600;

async function safeGetHeader(headers, headerName) {
  try {
    if (typeof headers.get === 'function') {
      return headers.get(headerName);
    } else if (headers[headerName]) {
      return headers[headerName];
    } else {
      return null; // Or handle the missing header as needed
    }
  } catch (error) {
    console.error(`Error getting header ${headerName}:`, error);
    return null;
  }
}

export default async function handler(req) {
  try {
    const host = await safeGetHeader(req.headers, 'host');
    const baseUrl = `https://${host}`;
    let url;

    try {
      url = new URL(req.url, baseUrl);
    } catch (error) {
      console.error("Error parsing req.url:", error);
      return new Response("Bad Request: Invalid URL", { status: 400 });
    }

    const cookieHeader = await safeGetHeader(req.headers, 'cookie');
    const cookies = parse(cookieHeader || '');
    const sessionId = cookies.sessionId;

    if (url.pathname === '/logout') {
      if (sessionId) {
        try {
          await kv.del(`session:${sessionId}`);
        } catch (error) {
          console.error("Error deleting session from KV:", error);
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

    if (sessionId) {
      try {
        const session = await kv.get(`session:${sessionId}`);

        if (session) {
          console.log('User is logged in (session)');
          try {
            const response = await fetch(url.href, {
              method: req.method,
              headers: {
                ...Object.fromEntries(req.headers.entries()),
                'X-Processed-By': 'edge-function',
              },
              body: req.body,
            });

            return response;
          } catch (error) {
            console.error("Error during fetch:", error);
            return new Response("Internal Server Error", { status: 500 });
          }
        }
      } catch (error) {
        console.error("Error getting session from KV:", error);
      }
    }

    const authHeader = await safeGetHeader(req.headers, 'authorization');
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

    const newSessionId = randomUUID();
    try {
      await kv.set(`session:${newSessionId}`, { userId: 'test', createdAt: Date.now() }, { ex: SESSION_TTL });
    } catch (error) {
      console.error("Error setting session in KV:", error);
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
