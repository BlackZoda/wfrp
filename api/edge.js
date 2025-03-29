export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);

  // Prevent infinite loops: Skip requests to /api/edge
  if (url.pathname.startsWith('/api/edge')) {
    return new Response('Infinite loop prevented', { status: 500 });
  }

  // Handle logout requests
  if (url.pathname === '/logout') {
    return logoutHandler();
  }

  // Bypass authentication for static files and assets
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/static/')) {
    return fetch(req); // Forward static file requests directly
  }

  // Handle authentication for all other requests
  return authHandler(req, url);
}

// Authentication Handler
async function authHandler(req, url) {
  const authHeader = req.headers.get('Authorization');
  const validToken = 'Basic ' + btoa('test:test123'); // Replace with your credentials

  // Check if the user is already authenticated via a cookie
  const cookies = req.headers.get('cookie') || '';
  if (cookies.includes('authenticated=true')) {
    // Rewrite the request URL to bypass the Edge Function for subsequent rendering
    const newUrl = new URL(req.url);
    newUrl.pathname = '/'; // Rewrite to root or original path
    return fetch(newUrl.toString(), req);
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
  response.headers.set(
    'Set-Cookie',
    'authenticated=true; Path=/; HttpOnly; Secure; Max-Age=3600' // Cookie expires in 1 hour
  );
  return response;
}

// Logout Handler
function logoutHandler() {
  // Clear the authentication cookie by setting Max-Age to 0
  const response = new Response('You have been logged out.', { status: 200 });
  response.headers.set(
    'Set-Cookie',
    'authenticated=false; Path=/; HttpOnly; Secure; Max-Age=0'
  );
  return response;
}
