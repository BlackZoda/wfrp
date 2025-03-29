export const config = { runtime: 'edge' };

export default async function handler(req) {
  const authHeader = req.headers.get('Authorization');
  const authorizedHeader = req.headers.get('x-authorized');
  const validToken = 'Basic ' + btoa('test:test123'); // Replace with your credentials

  // Skip authentication if already authorized
  if (authorizedHeader === 'true') {
    return fetch(req);
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

  // Valid credentials: Forward request and mark as authorized
  const newReq = new Request(req);
  newReq.headers.set('x-authorized', 'true');
  return fetch(newReq);
}