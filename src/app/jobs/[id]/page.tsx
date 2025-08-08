import { prisma } from '@/src/lib/prisma';
import { notFound } from 'next/navigation';

export default async function JobDetail({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{job.title} at {job.company}</h1>
      <p className="opacity-70">{job.location}</p>
      <p className="whitespace-pre-wrap">{job.description}</p>
    </article>
  );
}
