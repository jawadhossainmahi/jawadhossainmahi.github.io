import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12">
      <span className="font-mono text-sm text-accent">
        {index}. {label}
      </span>
      <h2 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-xl text-subtle">{description}</p>
      )}
    </Reveal>
  );
}
