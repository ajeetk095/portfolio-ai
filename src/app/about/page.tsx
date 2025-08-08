import { prisma } from '@/src/lib/prisma';

export default async function AboutPage() {
  const about = await prisma.contentBlock.findUnique({ where: { key: 'about' } });

  return (
    <section className="prose prose-invert max-w-none">
      <h1>About</h1>
      <p>
        {about?.markdown ??
          `I'm Ajeet. I combine SEO, operations, and AI tools to create lean content systems.
           I’m resourceful, adaptable, and obsessed with measurable outcomes.`}
      </p>
      <h2>Skills</h2>
      <ul>
        {(await prisma.skill.findMany({ orderBy: { name: 'asc' } })).map((s) => (
          <li key={s.id}>{s.name}{s.level ? ` — ${s.level}` : ''}</li>
        ))}
      </ul>

      <h2>Languages</h2>
      <ul>
        {(await prisma.language.findMany()).map((l) => (
          <li key={l.id}>{l.name}{l.level ? ` — ${l.level}` : ''}</li>
        ))}
      </ul>
    </section>
  );
}
