import { profile, skills } from "../content";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" label="About" title="A little about me">
      <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {profile.about.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {profile.facts.map((f) => (
              <div key={f.label} className="border-t border-line pt-4">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-medium text-muted">Tools I work with</h3>
          <dl className="divide-y divide-line border-y border-line">
            {skills.map((s) => (
              <div key={s.group} className="grid gap-2 py-4 sm:grid-cols-[110px_1fr]">
                <dt className="text-sm text-muted">{s.group}</dt>
                <dd className="text-[0.95rem] leading-relaxed">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
