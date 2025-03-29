export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);

  // Handle logout requests
  if (url.pathname === '/logout') {
    return logoutHandler();
  }

  // Handle authentication for all other requests
  return authHandler(req);
}

async function authHandler(req, url) {
    const authHeader = req.headers.get('Authorization');
    const validToken = 'Basic ' + btoa('test:test123'); // Replace with your credentials
  
    // Check if the user is already authenticated via a cookie
    const cookies = req.headers.get('cookie') || '';
    if (cookies.includes('authenticated=true')) {
      // If authenticated, forward non-API requests directly to static files or pages
      if (!url.pathname.startsWith('/api')) {
        return fetch(req);
      }
      return new Response('Authenticated API request', { status: 200 });
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

function logoutHandler() {
  // Clear the authentication cookie by setting Max-Age to 0
  const response = new Response('You have been logged out.', { status: 200 });
  response.headers.set(
    'Set-Cookie',
    'authenticated=false; Path=/; HttpOnly; Secure; Max-Age=0'
  );
  return response;
}
