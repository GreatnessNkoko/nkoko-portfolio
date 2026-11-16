import { ArrowUpRight, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { contact, projects, type Project } from "../content";
import { media } from "../lib/media";
import { Section } from "./Section";

/** Where clicking the picture goes: the live site first, otherwise the code. */
const mainLink = (p: Project) => p.liveUrl || p.codeUrl || "";

function Cover({ project, fill = false }: { project: Project; fill?: boolean }) {
  const img = project.image ? (
    <img
      src={media(project.image)}
      alt={project.imageAlt ?? `${project.title} preview`}
      loading="lazy"
      width={1280}
      height={720}
      className={`aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] ${fill ? "lg:aspect-auto lg:h-full lg:object-left-top" : ""}`}
    />
  ) : (
    <div className="grid aspect-video w-full place-items-center bg-accent-soft text-2xl font-semibold text-accent">
      {project.title}
    </div>
  );
  const href = mainLink(project);
  if (!href) return img;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className={`block ${fill ? "lg:h-full" : ""}`}>
      {img}
    </a>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          Visit live site <ArrowUpRight size={15} aria-hidden />
          <span className="sr-only">: {project.title}</span>
        </a>
      )}
      {project.codeUrl && (
        <a
          href={project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
        >
          <FaGithub size={15} aria-hidden /> View code
          <span className="sr-only">: {project.title} on GitHub</span>
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

function Badges({ project }: { project: Project }) {
  if (!project.context && !project.status) return null;
  return (
    <div className="mb-3 flex flex-wrap gap-2 text-xs font-medium">
      {project.context && <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">{project.context}</span>}
      {project.status && <span className="rounded-full border border-line px-2.5 py-1 text-muted">{project.status}</span>}
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return <p className="text-sm text-muted">{items.join(" · ")}</p>;
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-surface lg:grid lg:grid-cols-[1.4fr_1fr]">
      <div className="overflow-hidden border-b border-line lg:border-b-0 lg:border-r">
        <Cover project={project} fill />
      </div>
      <div className="flex flex-col justify-center gap-5 p-6 sm:p-9">
        <div>
          <Badges project={project} />
          <h3 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{project.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{project.description}</p>
        </div>
        {project.highlights.length > 0 && (
          <ul className="space-y-2 text-sm">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        )}
        <Stack items={project.stack} />
        <Links project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="overflow-hidden border-b border-line">
        <Cover project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <Badges project={project} />
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-1.5 leading-relaxed text-muted">{project.tagline}</p>
        </div>
        <Stack items={project.stack} />
        <div className="mt-auto pt-1">
          <Links project={project} />
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
      intro="A live client website, my final-year project and the apps I build to solve everyday problems."
    >
      <div className="space-y-6">
        {featured && <FeaturedProject project={featured} />}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
      <a
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 font-medium underline decoration-line underline-offset-4 hover:decoration-accent"
      >
        <FaGithub aria-hidden /> See all my code on GitHub
      </a>
    </Section>
  );
}
