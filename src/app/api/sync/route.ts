import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.SYNC_CRON_SECRET) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  const url = process.env.PROFILE_SHEET_JSON;
  if (!url) return NextResponse.json({ ok: true, note: 'No sheet url configured' });

  try {
    const res = await fetch(url, { cache: 'no-store' });
    let text = await res.text();

    // Handle Google Sheets gviz JSON which wraps JSON in function call
    if (text.startsWith("/*O_o*/")) {
      const start = text.indexOf('setResponse(');
      const end = text.lastIndexOf(');');
      const jsonText = text.slice(start + 'setResponse('.length, end);
      const parsed = JSON.parse(jsonText);
      // You can map parsed.table.rows to your models
      // For demo, we’ll just upsert a content block
      await prisma.contentBlock.upsert({
        where: { key: 'about' },
        update: { markdown: 'Synced: ' + new Date().toISOString() },
        create: { key: 'about', markdown: 'Synced: ' + new Date().toISOString() }
      });
    } else {
      const data = JSON.parse(text);
      // Map your custom JSON here (projects, jobs, skills etc.)
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
