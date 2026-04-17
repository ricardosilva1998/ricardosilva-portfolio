"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Leaf = { label: string; href: string };

const ROOT: Leaf[] = [
  { label: "~/home.md", href: "/" },
  { label: "~/projects.md", href: "/projects" },
];

export function FileTreeNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="site navigation"
      className="flex flex-col gap-1 py-4 text-xs"
    >
      <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.25em] text-[var(--color-phosphor-mute)]">
        explorer
      </div>
      {ROOT.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            pathname === item.href
              ? "mx-2 rounded px-2 py-1 bg-[var(--color-bg-elev)] text-[var(--color-phosphor)] phosphor-glow-soft transition"
              : "mx-2 rounded px-2 py-1 text-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor)] hover:bg-[var(--color-bg-elev)] transition"
          }
        >
          {pathname === item.href ? "▸ " : "  "}
          {item.label}
        </Link>
      ))}

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
