export const config = { runtime: 'edge' };

export default async function handler(req) {
  const authHeader = req.headers.get('Authorization');
  const validToken = 'Basic ' + btoa('test:test123');

  // Check if the user is already authenticated via a cookie
  const cookies = req.headers.get('cookie') || '';
  if (cookies.includes('authenticated=true')) {
    return fetch(req); // Forward the request directly
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

  // Valid credentials: Set a cookie and forward the request
  const response = await fetch(req);
  response.headers.set('Set-Cookie', 'authenticated=true; Path=/; HttpOnly; Secure');
  return response;
}