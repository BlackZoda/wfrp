import { parse, serialize } from 'cookie';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  console.log('Incoming request:', req.url);

  const url = new URL(req.url);
  const path = url.pathname;

  // Construct the absolute URL
  const baseUrl = `https://${req.headers.get('host')}`;
  const loggedOutUrl = `${baseUrl}/logged-out`;

  // Parse cookies from the request
  const cookies = parse(req.headers.get('cookie') || '');

  // Handle logout endpoint
  if (path === '/logout') {
    console.log('Handling logout');

    // Delete the loggedIn cookie by setting maxAge=0
    const loggedInCookie = serialize('loggedIn', '', {
      path: '/',
      httpOnly: true,
      maxAge: 0, // Delete the cookie
      sameSite: 'Strict',
    });

    // Redirect to /logged-out
    const response = new Response(null, {
      status: 302,
      headers: {
        'Location': loggedOutUrl,
        'Set-Cookie': loggedInCookie,
      },
    });

    return response;
  }

  // Check if user is logged in based on the loggedIn cookie
  if (cookies.loggedIn === 'true') {
    console.log('User is logged in, forwarding request');
    // Forward with custom header to prevent loops
    const response = await fetch(`https://${req.headers.get('host')}${path}`, {
      method: req.method,
      headers: {
        ...Object.fromEntries(req.headers.entries()),
        'X-Processed-By': 'edge-function',
      },
      body: req.body,
    });

    return response;
  }

  // Log the Authorization header
  const authHeader = req.headers.get('Authorization');
  console.log('Authorization header:', authHeader);

  const validCredentials = 'Basic ' + btoa('test:test123'); // Replace with your credentials

  // No credentials? Challenge the user
  if (!authHeader || cookies.loggedIn !== 'true') {
    console.log('No credentials provided, prompting for login');
    return new Response('Login required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  // Invalid credentials? Block access
  if (authHeader !== validCredentials) {
    console.log('Invalid credentials');
    return new Response('Invalid credentials', { status: 401 });
  }

  // Set the loggedIn cookie upon successful authentication
  console.log('Authenticated, setting loggedIn cookie');
  const loggedInCookie = serialize('loggedIn', 'true', {
    path: '/',
    httpOnly: true,
  });

  // Create the response with a redirect after successful login
  const response = new Response(null, {
    status: 302,
    headers: {
      'Location': baseUrl, // Redirect to the home page or intended page
      'Set-Cookie': loggedInCookie, // Set the loggedIn cookie
      'X-Processed-By': 'edge-function',
    },
  });

  return response;
}
