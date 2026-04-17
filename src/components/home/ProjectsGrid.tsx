import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Prompt } from "@/components/terminal/Prompt";

export function ProjectsGrid() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="px-4 pb-14 sm:px-8"
    >
      <div className="mx-auto max-w-5xl space-y-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-[var(--color-phosphor-dim)]">
          <Prompt path="~/projects">ls -la --color</Prompt>
          <span className="text-[var(--color-phosphor-mute)]">
            {PROJECTS.length} entries · sorted by impact
          </span>
        </div>
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-phosphor-mute)]">
          {"// tip: click ./preview to run an interactive mock inside a modal"}
        </div>
      </div>
    </section>
  );
}
