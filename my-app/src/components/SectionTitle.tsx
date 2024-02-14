export default function SectionTitle({
  title,
  desc,
  className,
}: {
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
