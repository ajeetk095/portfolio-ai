import { prisma } from '@/src/lib/prisma';
import JobCard from '@/src/components/JobCard';
import Link from 'next/link';

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({ orderBy: { startDate: 'desc' } });
  return (
    <section>
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-2xl font-bold">Experience</h1>
        <Link className="underline opacity-80" href="/jobs/placeholder">See details example</Link>
      </div>
      <div className="space-y-3">
        {jobs.map((j) => (
          <JobCard key={j.id}
            company={j.company}
            title={j.title}
            location={j.location}
            startDate={j.startDate.toISOString()}
            endDate={j.endDate?.toISOString() || null}
            description={j.description}
          />
        ))}
      </div>
    </section>
  );
}
