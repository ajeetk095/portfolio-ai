import { prisma } from '@/src/lib/prisma';
import ProjectCard from '@/src/components/ProjectCard';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.id}
            title={p.title}
            description={p.description}
            tech={p.tech}
            demoUrl={p.demoUrl}
            repoUrl={p.repoUrl}
            platform={p.platform}
          />
        ))}
      </div>
    </section>
  );
}
