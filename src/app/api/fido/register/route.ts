const API_KEY = process.env.API_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookieHeader = req.headers.get('cookie') || '';

    const response = await fetch(`${BASE_URL}/fido/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
        'x-api-key': API_KEY
      },
      credentials: 'include', 
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[API] FIDO Register Final Step Error:', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}