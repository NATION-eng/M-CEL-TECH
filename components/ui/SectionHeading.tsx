import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <span className="section-eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-3xl font-bold leading-tight text-ink md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
