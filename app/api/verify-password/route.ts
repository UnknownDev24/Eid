import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.EIDI_PASSWORD;

    if (!correctPassword) {
      console.warn('EIDI_PASSWORD is not set in .env');
      // Fallback if env is missing
      if (password === 'Arfiya143') return NextResponse.json({ success: true });
    }

    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
