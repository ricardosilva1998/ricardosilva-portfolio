import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { ContactBlock } from "@/components/home/ContactBlock";
import { Prompt } from "@/components/terminal/Prompt";
import { BlinkCursor } from "@/components/terminal/BlinkCursor";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "ricardo silva — projects",
  description:
    "Every public repository from github.com/ricardosilva1998 — client work, side projects, learning exercises, games.",
};

export default function ProjectsPage() {
  const years = Array.from(new Set(PROJECTS.map((p) => p.year))).sort((a, b) => b - a);

  return (
    <article className="pb-8">
      <header className="mx-auto max-w-6xl space-y-2 px-4 pb-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <div className="flex items-baseline gap-2 text-xs text-[var(--color-phosphor-dim)]">
          <Prompt path="~">cd ~/projects</Prompt>
          <BlinkCursor className="ml-1" />
        </div>
        <div className="text-[var(--color-phosphor-dim)] text-sm">
          <span className="text-[var(--color-phosphor-mute)]">{"// "}</span>
          {PROJECTS.length} repositories — {years.length} years of work — click ./repo to view the source
        </div>
      </header>
      <ProjectsGrid />
      <ContactBlock />
    </article>
  );
}
