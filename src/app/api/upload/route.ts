import { prisma } from '@/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.contentBlock) {
    const { key, markdown } = body.contentBlock;
    const up = await prisma.contentBlock.upsert({
      where: { key },
      update: { markdown },
      create: { key, markdown }
    });
    return NextResponse.json(up);
  }

  const { name, path, mime, page } = body;
  const created = await prisma.uploadedFile.create({ data: { name, path, mime, page } });
  return NextResponse.json(created);
}
