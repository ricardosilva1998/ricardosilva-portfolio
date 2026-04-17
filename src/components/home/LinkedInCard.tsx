import Link from "next/link";
import { LINKEDIN } from "@/data/linkedin";
import { AsciiBox } from "@/components/terminal/AsciiBox";
import { Prompt } from "@/components/terminal/Prompt";
import { ArrowUpRight } from "lucide-react";

export function LinkedInCard() {
  return (
    <section aria-labelledby="linkedin-teaser" className="px-4 pb-14 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex items-baseline gap-2 text-xs text-[var(--color-phosphor-dim)]">
          <Prompt path="~">./linkedin --render</Prompt>
        </div>
        <h2 id="linkedin-teaser" className="sr-only">
          LinkedIn
        </h2>
        <AsciiBox title="linkedin.md" tone="magenta" corner="exported · static">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <AsciiInitials name={LINKEDIN.name} />
              <div className="space-y-1">
                <div className="text-base text-[var(--color-phosphor)] phosphor-glow-soft">
                  {LINKEDIN.name}
                </div>
                <div className="text-xs text-[var(--color-phosphor-dim)]">
                  {LINKEDIN.headline}
                </div>
                <div className="text-xs text-[var(--color-phosphor-mute)]">
                  {LINKEDIN.location} · {LINKEDIN.connections}+ connections
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:items-end">
              <Link
                href="/linkedin"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[var(--color-magenta)] px-3 py-1.5 text-xs uppercase tracking-widest text-[var(--color-magenta)] transition hover:bg-[var(--color-magenta)] hover:text-[var(--color-bg)]"
              >
                open ~/linkedin.md
                <ArrowUpRight className="size-3.5" />
              </Link>
              <a
                href="https://www.linkedin.com/in/ricardosilva98/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-1 text-[10px] uppercase tracking-widest text-[var(--color-phosphor-dim)] transition hover:text-[var(--color-phosphor)]"
              >
                view on linkedin.com ↗
              </a>
            </div>
          </div>
        </AsciiBox>
      </div>
    </section>
  );
}

function AsciiInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      aria-hidden="true"
      className="grid size-16 shrink-0 place-items-center rounded-sm border border-[var(--color-magenta)] bg-[var(--color-bg-elev)] text-xl tracking-[0.2em] text-[var(--color-magenta)] phosphor-glow-soft"
    >
      {initials.toUpperCase()}
    </div>
  );
}
