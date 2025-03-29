export const config = { runtime: 'edge' };

export default async function handler(req) {
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

  // Valid credentials: Forward to static files
  const url = new URL(req.url);
  url.pathname = '/_next/static'; // Bypass the Edge Function on subsequent requests
  return fetch(url.toString(), req);
}