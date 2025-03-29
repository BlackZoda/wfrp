export const config = { runtime: 'edge' };

export default async function handler(req) {
  console.log('Incoming request:', req.url);

  const url = new URL(req.url);
  const path = url.pathname;

  // Handle logout endpoint
  if (path === '/logout') {
    console.log('Handling logout');
    return new Response('Logged out successfully', {
      status: 401, // Force browser to clear cached credentials
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"', // Trigger clearing of credentials
        'Location': '/logged-out', // Redirect after logging out
        'Content-Type': 'text/plain',
      },
    });
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
  console.log('Authenticated request:', req.url);

  // Forward request with a custom header to prevent loops
  const response = await fetch(`https://${req.headers.get('host')}${path}`, {
    method: req.method,
    headers: {
      ...Object.fromEntries(req.headers.entries()),
      'X-Processed-By': 'edge-function', // Add custom header to detect forwarded requests
    },
    body: req.body,
  });

  return response;
}
