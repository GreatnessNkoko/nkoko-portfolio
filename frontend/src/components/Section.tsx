import type { ReactNode } from "react";
import { useReveal } from "../lib/hooks";

export function Section({
  id,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-20 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-3 text-sm font-medium text-accent">{label}</p>
        <h2 id={`${id}-title`} className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
