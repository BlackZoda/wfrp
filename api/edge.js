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
      sameSite: 'Strict', // Legg til SameSite-attributt
    });

    // Log the cookie being set for debugging
    console.log('Setting loggedIn cookie to delete:', loggedInCookie);

    // Redirect to /logged-out
    const response = new Response(null, {
      status: 302,
      headers: {
        'Location': loggedOutUrl, // Use absolute URL
        'Set-Cookie': loggedInCookie, // Set the cookie in the response
      },
    });

    // Log the response headers before returning
    console.log('Response headers for logout:', {
        'Set-Cookie': loggedInCookie,
        'Location': loggedOutUrl,
    });

    return response;
  }

  // Log the cookies after logout
  console.log('Cookies after logout:', cookies);

  // Check if user is logged in based on the loggedIn cookie
  if (cookies.loggedIn === 'true') {
    console.log('User is logged in, forwarding request');
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

  // If the cookie is not present, prompt for login
  console.log('No valid session found, prompting for login');
  return new Response('Login required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}
