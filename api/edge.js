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
    // Check for a custom header to detect forwarded requests
    const forwardedHeader = req.headers.get('X-Forwarded-By');
    if (forwardedHeader === 'edge-function') {
      console.log('Preventing infinite loop for forwarded request');
      return new Response('Infinite loop prevented', { status: 400 });
    }
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

  // Valid credentials: Forward request to original destination with a custom header
  console.log('Forwarding request:', req.url);
  const response = await fetch(req.url, {
    method: req.method,
    headers: {
      ...Object.fromEntries(req.headers.entries()),
      'X-Forwarded-By': 'edge-function', // Add custom header to prevent loops
    },
    body: req.body,
  });

  return response;
}
