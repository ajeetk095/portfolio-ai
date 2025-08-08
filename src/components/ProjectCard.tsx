import Link from 'next/link';

export default function ProjectCard({
  title,
  description,
  tech,
  demoUrl,
  repoUrl,
  platform
}: {
  title: string;
  description: string;
  tech: string[];
  demoUrl?: string | null;
  repoUrl?: string | null;
  platform?: string | null;
}) {
  return (
    <div className="p-4 rounded-lg glass">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm opacity-80">{description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        {demoUrl && (
          <Link href={demoUrl} target="_blank" className="underline text-primary">
            Live demo {platform ? `(${platform})` : ''}
          </Link>
        )}
        {repoUrl && (
          <Link href={repoUrl} target="_blank" className="underline">
            Repo
          </Link>
        )}
      </div>
    </div>
  );
}
