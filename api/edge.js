import { parse, serialize } from 'cookie';
import { randomUUID } from 'node:crypto';
import { kv } from '@vercel/kv'; // Import Vercel KV

const SESSION_TTL = 3600; // Session time-to-live (1 hour)

export default async function handler(req) {
  try {
    const host = req.headers.get('host');
    const baseUrl = `https://${host}`;
    let url;

    try {
      url = new URL(req.url, baseUrl);
    } catch (error) {
      console.error("Error parsing req.url:", error);
      return new Response("Bad Request: Invalid URL", { status: 400 });
    }

    const cookies = parse(req.headers.get('cookie') || '');
    const sessionId = cookies.sessionId;

    // Logout Endpoint
    if (url.pathname === '/logout') {
      if (sessionId) {
        await kv.del(`session:${sessionId}`); // Delete session from KV
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
      const session = await kv.get(`session:${sessionId}`); // Get session from KV

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
      }
    }

    // Basic Auth Check (if no session)
    const authHeader = req.headers.get('Authorization');
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
    await kv.set(`session:${newSessionId}`, { userId: 'test', createdAt: Date.now() }, { ex: SESSION_TTL }); // Store session in KV with TTL

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
