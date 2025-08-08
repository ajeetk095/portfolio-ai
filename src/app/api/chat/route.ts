// server endpoint not strictly required since AI runs in-browser.
// You can extend with server-side RAG if needed.
import { NextResponse } from 'next/server';
export async function POST() {
  return NextResponse.json({ ok: true, note: 'Client-side AI is used. No server inference.' });
}
