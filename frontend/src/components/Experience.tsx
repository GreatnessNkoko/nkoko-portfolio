import { achievements, education, experience, type TimelineItem } from "../content";
import { Section } from "./Section";

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="border-t border-line">
      {items.map((item) => (
        <li
          key={item.title + item.org}
          className="grid gap-2 border-b border-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8"
        >
          <p className="text-sm tabular-nums text-muted sm:pt-1">{item.period}</p>
          <div>
            <h4 className="text-lg font-semibold leading-snug tracking-tight">{item.title}</h4>
            <p className="text-muted">
              {item.org}
              {item.place && <span> · {item.place}</span>}
            </p>
            {item.points && (
              <ul className="mt-3 space-y-1.5 text-[0.95rem] text-muted">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Experience() {
  return (
    <Section id="experience" label="Experience" title="Where I've worked and studied">
      <div className="space-y-16">
        <div>
          <h3 className="mb-4 text-xl font-semibold tracking-tight">Work</h3>
          <Timeline items={experience} />
        </div>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="mb-4 text-xl font-semibold tracking-tight">Education</h3>
            <Timeline items={education} />
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold tracking-tight">Awards & certificates</h3>
            <Timeline items={achievements} />
          </div>
        </div>
      </div>
    </Section>
  );
}
