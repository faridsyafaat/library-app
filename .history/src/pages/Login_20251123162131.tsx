import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(
      'https://be-library-api-xh3x6c5iiq-et.a.run.app/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Proxy login error:', error);
    return NextResponse.json(
      { message: 'Internal proxy error' },
      { status: 500 }
    );
  }
}
