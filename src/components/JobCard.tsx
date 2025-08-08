export default function JobCard({
  company,
  title,
  location,
  startDate,
  endDate,
  description
}: {
  company: string;
  title: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  description: string;
}) {
  const range = `${new Date(startDate).toLocaleDateString()} – ${
    endDate ? new Date(endDate).toLocaleDateString() : 'Present'
  }`;
  return (
    <div className="p-4 rounded-lg glass">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{title} • {company}</h3>
        <span className="text-xs opacity-70">{location}</span>
      </div>
      <div className="text-xs opacity-70">{range}</div>
      <p className="mt-2 text-sm opacity-90 whitespace-pre-wrap">{description}</p>
    </div>
  );
}
