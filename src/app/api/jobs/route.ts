import { prisma } from '@/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const jobs = await prisma.job.findMany({ orderBy: { startDate: 'desc' } });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await prisma.job.create({ data: body });
  return NextResponse.json(created);
}
