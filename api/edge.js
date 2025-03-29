export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  const authHeader = req.headers.get('Authorization');
  const validToken = 'Basic ' + btoa('test:test123'); // Replace with your credentials

  if (path === '/logout') {
    // Logout endpoint: Force browser to clear cached credentials
    return new Response('Logged out successfully', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

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

  // Valid credentials: Forward the request to the original destination
  return fetch(req);
}
