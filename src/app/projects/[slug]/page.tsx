import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, findProject } from "@/data/projects";
import { DemoHost } from "@/components/projects/DemoHost";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { Prompt } from "@/components/terminal/Prompt";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return { title: "project not found" };
  return {
    title: `ricardo silva — ${project.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6 sm:px-8 sm:py-10">
      <nav className="flex items-center gap-2 text-xs text-[var(--color-phosphor-dim)]">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-[var(--color-phosphor)]"
        >
          <ArrowLeft className="size-3" /> home
        </Link>
        <span className="text-[var(--color-phosphor-mute)]">/</span>
        <Prompt path={`~/projects/${project.shellName}`}>./preview</Prompt>
      </nav>

      <TerminalWindow
        title={`~/projects/${project.shellName}`}
        subtitle="full-page preview · mock data"
        bodyClassName="p-4 sm:p-6 bg-[var(--color-bg)]"
        footer={
          <div className="flex flex-wrap items-center justify-between gap-2 text-[var(--color-phosphor-dim)]">
            <span className="text-xs">
              interactive mock — data is synthetic.
            </span>
            <div className="flex items-center gap-2">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-border-bright)] px-2 py-1 text-xs text-[var(--color-phosphor-dim)] transition hover:border-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor)]"
              >
                <Github className="size-3" />
                open repo
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-amber)] px-2 py-1 text-xs text-[var(--color-amber)] transition hover:bg-[var(--color-amber)] hover:text-[var(--color-bg)]"
                >
                  <ExternalLink className="size-3" />
                  open live site
                </a>
              )}
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <header className="space-y-1 border-b border-[var(--color-border)] pb-3">
            <h1 className="text-base text-[var(--color-phosphor)] phosphor-glow-soft">
              {project.name}
            </h1>
            <p className="text-xs text-[var(--color-phosphor-dim)]">
              {project.description}
            </p>
            <ul className="flex flex-wrap gap-1 pt-2 text-[10px]">
              {project.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-1.5 py-0.5 text-[var(--color-phosphor-dim)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </header>
          <div className="pt-2">
            <DemoHost demo={project.demo} />
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
