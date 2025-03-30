import { parse, serialize } from 'cookie';
import { randomUUID } from 'node:crypto';

// Session storage (use a proper DB/KV store in production)
const sessions = new Map();

export default async function handler(req) {
  try {
    const baseUrl = `https://${req.headers.get('host')}`;
    let url;
    try {
      url = new URL(req.url);
    } catch (error) {
      console.error("Error parsing req.url:", error);
      return new Response("Bad Request: Invalid URL", { status: 400 });
    }

    const targetPath = url.pathname === "" ? "/" : url.pathname; // Default to "/" if pathname is empty
    const targetUrl = `${baseUrl}${targetPath}`; // Construct the full URL without duplicating the origin

    // Session Management Middleware
    const cookies = parse(req.headers.get('cookie') || '');
    const sessionId = cookies.sessionId;

    // 1. Logout Endpoint
    if (url.pathname === '/logout') {
      if (sessionId) sessions.delete(sessionId);

      return new Response(null, {
        status: 302,
        headers: {
          'Location': `${baseUrl}/logged-out`,
          'Set-Cookie': serialize('sessionId', '', {
            path: '/',
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
          })
        }
      });
    }

    // 2. Check Existing Session
    if (sessionId && sessions.has(sessionId)) {
      try {
        const newHeaders = new Headers(req.headers); // create a new Headers object
        newHeaders.set('X-Processed-By', 'edge-function');
        newHeaders.set('X-User-Id', sessions.get(sessionId).userId);

        const response = await fetch(targetUrl, { // Use the constructed targetUrl
          method: req.method,
          headers: newHeaders,
          body: req.body,
        });
        return response;
      } catch (error) {
        console.error("Fetch error:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    // 3. Login Flow
    const authHeader = req.headers.get('Authorization');
    const validCredentials = 'Basic ' + btoa('test:test123');

    if (!authHeader || authHeader !== validCredentials) {
      return new Response('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
      });
    }

    // 4. Create New Session
    const newSessionId = randomUUID();
    sessions.set(newSessionId, {
      userId: 'test',
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600_000 // 1 hour
    });

    return new Response(null, {
      status: 302,
      headers: {
        'Location': baseUrl,
        'Set-Cookie': serialize('sessionId', newSessionId, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 3600 // 1 hour
        })
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
