export default async function handler(req) {
  const url = new URL(req.url);
  const baseUrl = `https://${req.headers.get('host')}`;
  const targetPath = url.pathname === "" ? "/" : url.pathname; // Default to "/" if pathname is empty
  const targetUrl = `https://${req.headers.get('host')}${targetPath}`; // Construct the full URL

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
      const response = await fetch(targetUrl, { // Use the constructed targetUrl
        method: req.method,
        headers: {
          ...Object.fromEntries(req.headers.entries()),
          'X-Processed-By': 'edge-function',
          'X-User-Id': sessions.get(sessionId).userId
        },
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
  const newSessionId = crypto.randomUUID();
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
}
