import Link from "next/link";
import { AsciiBox } from "@/components/terminal/AsciiBox";
import { Prompt } from "@/components/terminal/Prompt";
import { BlinkCursor } from "@/components/terminal/BlinkCursor";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center gap-4 px-6 py-12">
      <div className="flex items-baseline gap-2">
        <Prompt path="~">./unknown-route</Prompt>
        <BlinkCursor />
      </div>
      <AsciiBox title="stderr" tone="amber">
        <div className="space-y-2 text-sm">
          <div className="text-[var(--color-red)]">
            bash: command not found
          </div>
          <div className="text-[var(--color-phosphor-dim)]">
            the path you typed doesn&apos;t resolve to a known route.
          </div>
          <div className="pt-2 text-xs text-[var(--color-phosphor-mute)]">
            {"// try ~/home or ~/projects"}
          </div>
        </div>
      </AsciiBox>
      <div className="flex gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-phosphor)] px-3 py-1.5 text-xs uppercase tracking-widest text-[var(--color-phosphor)] transition hover:bg-[var(--color-phosphor)] hover:text-[var(--color-bg)]"
        >
          cd ~
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-border-bright)] px-3 py-1.5 text-xs uppercase tracking-widest text-[var(--color-phosphor-dim)] transition hover:text-[var(--color-phosphor)]"
        >
          cd ~/projects
        </Link>
      </div>
    </section>
  );
}
