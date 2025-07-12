import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // return NextResponse.json(body);
  const backendUrl = 'http://localhost:3001/api/recommendation';

  try {
    const apiRes = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log(apiRes)

    if (!apiRes.ok) {
        const errorBody = await apiRes.json();
        return NextResponse.json({ error: errorBody.error || 'Backend service error' }, { status: apiRes.status });
    }

    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return NextResponse.json({ error: 'Could not connect to the recommendation service.' }, { status: 503 });
  }
}

//testing for get
export async function GET() {
  return NextResponse.json({data:"Hello World"})
}