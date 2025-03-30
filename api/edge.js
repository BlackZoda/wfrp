import { parse, serialize } from 'cookie';
import { randomUUID } from 'node:crypto';

// Session storage (use a proper DB/KV store in production)
const sessions = new Map();

export default async function handler(req) {
  const url = new URL(req.url);
  const baseUrl = `https://${req.headers.get('host')}`; // Use original method

  // Session Management
  const cookies = parse(req.headers.get('cookie') || '');
  const sessionId = cookies.sessionId;

  // Logout Endpoint
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
          sameSite: 'Strict',
        },
        ),
      },
    });
  }

  // Check Session
  if (sessionId && sessions.has(sessionId)) {
    console.log('User is logged in (session)');
    const response = await fetch(`https://${req.headers.get('host')}${url.pathname}`, { // Original URL
      method: req.method,
      headers: {
        ...Object.fromEntries(req.headers.entries()),
        'X-Processed-By': 'edge-function',
      },
      body: req.body,
    });

    return response;
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
  sessions.set(newSessionId, { userId: 'test', createdAt: Date.now() });

  const loggedInCookie = serialize('sessionId', newSessionId, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600, // 1 hour
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
}
