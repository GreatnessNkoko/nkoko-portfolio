import { ArrowUpRight, LayoutDashboard, Lock, Smartphone } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects, type Project } from "../content";
import { imageSrcSet, imageUrl } from "../lib/media";
import { Section } from "./Section";

function Cover({ project, featured }: { project: Project; featured: boolean }) {
  if (project.image) {
    return (
      <img
        src={imageUrl(project.image, 1280)}
        srcSet={imageSrcSet(project.image, [480, 800, 1280])}
        sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        alt={project.imageAlt ?? `${project.title} screenshot`}
        loading="lazy"
        width={1280}
        height={720}
        className="aspect-video size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
      />
    );
  }
  // No screenshot yet: a simple typographic cover instead of a fake image.
  return (
    <div
      className="flex aspect-video size-full flex-col justify-end p-6 text-white sm:p-8"
      style={{
        background: `radial-gradient(120% 120% at 100% 0%, rgba(255,255,255,.18), transparent 55%), ${project.coverColor ?? "#2f6b4f"}`,
      }}
    >
      {project.kind === "mobile" ? (
        <Smartphone size={44} strokeWidth={1.25} aria-hidden className="mb-auto text-white/85" />
      ) : (
        <LayoutDashboard size={44} strokeWidth={1.25} aria-hidden className="mb-auto text-white/85" />
      )}
      <span className="text-sm text-white/80">
        {project.kind === "mobile" ? "Mobile app" : "Web app"} · {project.stack.slice(0, 3).join(" · ")}
      </span>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const linkClass =
    "inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} border-ink bg-ink text-bg hover:opacity-85`}
        >
          Visit site <ArrowUpRight size={15} aria-hidden />
          <span className="sr-only">: {project.title}</span>
        </a>
      )}
      {project.codeUrl && (
        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <FaGithub size={15} aria-hidden /> Source code
          <span className="sr-only">: {project.title}</span>
        </a>
      )}
      {!project.codeUrl && project.codeNote && (
        <span className="inline-flex items-center gap-1.5 px-1 text-sm text-muted">
          <Lock size={14} aria-hidden /> {project.codeNote}
        </span>
      )}
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-line bg-surface ${
        featured ? "lg:grid lg:grid-cols-[1.35fr_1fr]" : "flex flex-col"
      }`}
    >
      <div className={`overflow-hidden border-line ${featured ? "border-b lg:border-b-0 lg:border-r" : "border-b"}`}>
        <Cover project={project} featured={featured} />
      </div>

      <div className={`flex flex-1 flex-col p-6 sm:p-8 ${featured ? "lg:justify-center" : ""}`}>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
          {project.context && (
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">{project.context}</span>
          )}
          {project.status && (
            <span className="rounded-full border border-line px-2.5 py-1 text-muted">{project.status}</span>
          )}
        </div>
        <h3 className="font-serif text-3xl tracking-tight sm:text-4xl">{project.title}</h3>
        <p className="mt-1 text-ink">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        {project.highlights.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm text-muted">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((t) => (
            <li key={t} className="rounded-md bg-bg px-2 py-1 text-xs text-muted ring-1 ring-line">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;
  return (
    <Section
      id="work"
      label="Selected work"
      title="Things I've built"
      intro="Real projects, from a job portal to a church website and a mobile queueing app. Each one links to its code or live site."
    >
      <div className="space-y-6">
        {featured && <ProjectCard project={featured} featured />}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
      <p className="mt-10 text-muted">
        More on{" "}
        <a
          href="https://github.com/GreatnessNkoko"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
        >
          GitHub
        </a>
        .
      </p>
    </Section>
  );
}
