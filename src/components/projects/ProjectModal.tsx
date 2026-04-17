"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/data/projects";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { DEMOS } from "./demos";
import { ExternalLink, Github, Info } from "lucide-react";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const DemoComponent = DEMOS[project.demo];

  useEffect(() => {
    lastFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    setTimeout(() => containerRef.current?.focus(), 10);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      lastFocused.current?.focus?.();
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`demo-${project.slug}-title`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)]/80 p-0 backdrop-blur-sm sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="scan-fade-in flex h-full w-full max-w-6xl flex-col outline-none sm:h-[86vh]"
      >
        <TerminalWindow
          title={`~/projects/${project.shellName}`}
          subtitle="live preview · mock data"
          onClose={onClose}
          closeLabel="close preview"
          className="h-full"
          bodyClassName="p-4 sm:p-6 bg-[var(--color-bg)]"
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2 text-[var(--color-phosphor-dim)]">
              <div className="flex items-center gap-2 text-xs">
                <Info className="size-3.5" />
                <span>
                  interactive mock — data is synthetic; nothing is persisted.
                </span>
              </div>
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
              <h2
                id={`demo-${project.slug}-title`}
                className="text-base text-[var(--color-phosphor)] phosphor-glow-soft"
              >
                {project.name}
              </h2>
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
              {DemoComponent ? <DemoComponent /> : <MissingDemo />}
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>,
    document.body,
  );
}

function MissingDemo() {
  return (
    <div className="rounded-md border border-dashed border-[var(--color-border-bright)] p-6 text-sm text-[var(--color-phosphor-dim)]">
      demo not wired up — this project is available via the repository link
      below.
    </div>
  );
}
