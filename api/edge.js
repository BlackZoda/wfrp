export const config = { runtime: 'edge' };

export default async function handler(req) {
  console.log('Incoming request:', req.url);

  const url = new URL(req.url);
  const path = url.pathname;

  // Handle logout endpoint
  if (path === '/logout') {
    console.log('Handling logout');
    return new Response('Logged out successfully', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  // Prevent infinite loop by checking if the request is targeting this function
  if (path.startsWith('/api/edge')) {
    console.log('Preventing infinite loop for /api/edge');
    return new Response('Infinite loop prevented', { status: 400 });
  }

  const authHeader = req.headers.get('Authorization');
  const validToken = 'Basic ' + btoa('test:test123'); // Replace with your credentials

  // No credentials provided? Challenge the user
  if (!authHeader) {
    return new Response('Login required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  // Invalid credentials? Block access
  if (authHeader !== validToken) {
    return new Response('Invalid credentials', { status: 401 });
  }

  // Valid credentials: Forward request safely
  console.log('Forwarding request:', req.url);

  // Rewrite URL to point to static files or another backend
  const rewrittenUrl = `https://wfrp.vercel.app${path}`; // Forward directly to static files or backend
  console.log('Rewritten URL:', rewrittenUrl);

  const response = await fetch(rewrittenUrl, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  return response;
}
