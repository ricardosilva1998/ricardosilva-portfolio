"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";

type Leaf = { label: string; href: string };

const ROOT: Leaf[] = [
  { label: "~/home.md", href: "/" },
  { label: "~/linkedin.md", href: "/linkedin" },
];

export function FileTreeNav() {
  const pathname = usePathname();
  const [projectsOpen, setProjectsOpen] = useState(true);

  return (
    <nav
      aria-label="site navigation"
      className="flex flex-col gap-1 py-4 text-xs"
    >
      <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.25em] text-[var(--color-phosphor-mute)]">
        explorer
      </div>
      {ROOT.map((item) => (
        <LeafLink
          key={item.href}
          href={item.href}
          label={item.label}
          active={pathname === item.href}
        />
      ))}
      <button
        type="button"
        onClick={() => setProjectsOpen((v) => !v)}
        className="group mt-2 flex w-full items-center gap-1 px-3 py-1 text-left text-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor)] hover:bg-[var(--color-bg-elev)] rounded"
        aria-expanded={projectsOpen}
      >
        <ChevronRight
          className={cn(
            "size-3 transition-transform",
            projectsOpen && "rotate-90",
          )}
        />
        {projectsOpen ? (
          <FolderOpen className="size-3.5 text-[var(--color-amber)]" />
        ) : (
          <Folder className="size-3.5 text-[var(--color-amber)]" />
        )}
        <span>~/projects</span>
      </button>
      {projectsOpen && (
        <div className="ml-5 flex flex-col border-l border-[var(--color-border)] pl-2">
          {PROJECTS.map((p) => {
            const href = `/projects/${p.slug}`;
            const active = pathname === href;
            return (
              <LeafLink
                key={p.slug}
                href={href}
                label={`${p.shellName}.md`}
                active={active}
              />
            );
          })}
        </div>
      )}

      <div className="mt-6 px-3 pb-2 text-[10px] uppercase tracking-[0.25em] text-[var(--color-phosphor-mute)]">
        external
      </div>
      <ExternalLink href="https://github.com/ricardosilva1998" label="github ↗" />
      <ExternalLink
        href="https://www.linkedin.com/in/ricardosilva98/"
        label="linkedin ↗"
      />
      <ExternalLink href="mailto:ricardomrbs1998@gmail.com" label="email ↗" />
      <ExternalLink href="/cv/ricardo-silva-cv.pdf" label="cv.pdf ↗" />
    </nav>
  );
}

function LeafLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "mx-2 rounded px-2 py-1 transition",
        active
          ? "bg-[var(--color-bg-elev)] text-[var(--color-phosphor)] phosphor-glow-soft"
          : "text-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor)] hover:bg-[var(--color-bg-elev)]",
      )}
    >
      {active ? "▸ " : "  "}
      {label}
    </Link>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="mx-2 rounded px-2 py-1 text-[var(--color-phosphor-dim)] transition hover:text-[var(--color-phosphor)] hover:bg-[var(--color-bg-elev)]"
    >
      {"  "}
      {label}
    </a>
  );
}
