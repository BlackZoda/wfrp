export const config = {
    runtime: 'edge', // Specifies that this is an Edge Function
  };
  
  export default async function handler(req) {
    const authHeader = req.headers.get('Authorization');
  
    // Check if the Authorization header matches your secret token
    if (authHeader !== 'Test123') {
      return new Response('Unauthorized', { status: 401 });
    }
  
    // If authorized, proceed with the request
    return new Response('Welcome to your protected site!', { status: 200 });
  }
  