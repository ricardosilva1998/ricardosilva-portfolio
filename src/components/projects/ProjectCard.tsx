"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { cn } from "@/lib/cn";
import { ExternalLink, Github, Play, Tag } from "lucide-react";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const number = String(index + 1).padStart(2, "0");
  const hl = project.highlight;

  return (
    <>
      <article
        className={cn(
          "group relative flex flex-col gap-3 rounded-md border bg-[var(--color-bg-raised)] p-5 transition",
          "border-[var(--color-border)] hover:border-[var(--color-phosphor-dim)]",
          "hover:shadow-[0_0_0_1px_var(--color-phosphor-dim),0_0_24px_rgba(51,255,102,0.12)]",
        )}
      >
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] tracking-[0.3em] text-[var(--color-phosphor-mute)]">
              /{number}/
            </span>
            <h3 className="text-base leading-tight text-[var(--color-phosphor)] phosphor-glow-soft">
              {project.name}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest">
            {project.liveUrl && (
              <span className="rounded-sm border border-[var(--color-phosphor)] bg-[var(--color-phosphor)]/10 px-1.5 py-0.5 text-[var(--color-phosphor)] phosphor-glow-soft">
                live
              </span>
            )}
            {hl === "ai" && (
              <span className="rounded-sm border border-[var(--color-magenta)] bg-[var(--color-magenta)]/10 px-1.5 py-0.5 text-[var(--color-magenta)]">
                ai
              </span>
            )}
            {hl === "production" && (
              <span className="rounded-sm border border-[var(--color-amber)] bg-[var(--color-amber)]/10 px-1.5 py-0.5 text-[var(--color-amber)]">
                prod
              </span>
            )}
          </div>
        </header>

        <p className="text-xs text-[var(--color-phosphor-dim)] leading-relaxed">
          <span className="text-[var(--color-phosphor-mute)]">{"// "}</span>
          {project.tagline}
        </p>

        <ul className="flex flex-wrap gap-1">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="inline-flex items-center gap-1 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-1.5 py-0.5 text-[10px] text-[var(--color-phosphor-dim)]"
            >
              <Tag className="size-2.5" />
              {tech}
            </li>
          ))}
        </ul>

        <footer className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-xs">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-phosphor)] bg-[var(--color-phosphor)]/10 px-2 py-1 text-[var(--color-phosphor)] transition hover:bg-[var(--color-phosphor)] hover:text-[var(--color-bg)] phosphor-glow-soft"
          >
            <Play className="size-3" />
            ./preview
          </button>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-border-bright)] px-2 py-1 text-[var(--color-phosphor-dim)] transition hover:border-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor)]"
          >
            <Github className="size-3" />
            ./repo
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-border-bright)] px-2 py-1 text-[var(--color-phosphor-dim)] transition hover:border-[var(--color-amber)] hover:text-[var(--color-amber)]"
            >
              <ExternalLink className="size-3" />
              ./live
            </a>
          )}
          <span className="ml-auto text-[10px] text-[var(--color-phosphor-mute)]">
            {project.year}
          </span>
        </footer>
      </article>

      {open && (
        <ProjectModal project={project} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
