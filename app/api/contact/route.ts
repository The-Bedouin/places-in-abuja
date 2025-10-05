import { NextResponse } from 'next/server';

// Simple demo handler – in production, integrate an email service or Formspree
export async function POST(request: Request) {
  const body = await request.json();
  // Minimal validation/sanitization
  const name = String(body.name || '').slice(0, 120);
  const email = String(body.email || '').slice(0, 120);
  const message = String(body.message || '').slice(0, 5000);
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}


