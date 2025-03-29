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

  // Valid credentials: Return a simple response or redirect
  console.log('Authenticated request:', req.url);

  return new Response(`Authenticated access to ${path}`, { status: 200 });
}
