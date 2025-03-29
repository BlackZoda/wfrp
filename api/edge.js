export const config = { runtime: 'edge' };

export default async function handler(req) {
  console.log('Incoming request:', req.url);

  const url = new URL(req.url);
  const path = url.pathname;

  // Handle logout endpoint
  if (path === '/logout') {
    console.log('Handling logout');
    return new Response('Logged out successfully.', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const authHeader = req.headers.get('Authorization');
  const validToken = 'Basic ' + btoa('test:test123'); // Replace with your credentials

  // No credentials? Challenge the user
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
  console.log('Authenticated request:', req.url);

  // Forward with custom header to prevent loops
  const response = await fetch(`https://${req.headers.get('host')}${path}`, {
    method: req.method,
    headers: {
      ...Object.fromEntries(req.headers.entries()),
      'X-Processed-By': 'edge-function', // Add header to bypass Edge Function
    },
    body: req.body,
  });

  return response;
}
