import { parse, serialize } from 'cookie';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  console.log('Incoming request:', req.url);

  const url = new URL(req.url);
  const path = url.pathname;

  // Parse cookies from the request
  const cookies = parse(req.headers.get('cookie') || '');

  // Handle logout endpoint
  if (path === '/logout') {
    console.log('Handling logout');
    // Set the loggedOut cookie
    const loggedOutCookie = serialize('loggedOut', 'true', {
      path: '/', // Make sure the cookie is valid for the entire domain
      httpOnly: true, // Recommended for security
    });

    // Return a redirect response
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/logged-out.html',
        'Set-Cookie': loggedOutCookie, // Set the cookie in the response
      },
    });
  }

  // Check if user is logged out
  if (cookies.loggedOut === 'true') {
    console.log('User is logged out, prompting for login');
    return new Response('You are logged out. Please log in.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  const authHeader = req.headers.get('Authorization');
  const validToken = 'Basic ' + btoa('test:test123'); // Replace with your credentials

  // No credentials? Challenge the user
  if (!authHeader) {
    console.log('No credentials provided, prompting for login');
    return new Response('Login required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  // Invalid credentials? Block access
  if (authHeader !== validToken) {
    console.log('Invalid credentials');
    return new Response('Invalid credentials', { status: 401 });
  }

  // Valid credentials: Forward request safely
  console.log('Authenticated request:', req.url);

  // Forward with custom header to prevent loops
  const response = await fetch(`https://${req.headers.get('host')}${path}`, {
    method: req.method,
    headers: {
      ...Object.fromEntries(req.headers.entries()),
      'X-Processed-By': 'edge-function', // Add header to prevent loops
    },
    body: req.body,
  });

  return response;
}
