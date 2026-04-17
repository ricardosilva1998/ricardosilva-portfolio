import { BIO } from "@/data/bio";
import { AsciiBox } from "@/components/terminal/AsciiBox";
import { Prompt } from "@/components/terminal/Prompt";

export function AboutBlock() {
  return (
    <section
      aria-labelledby="about-heading"
      className="px-4 pb-12 sm:px-8"
    >
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex items-center gap-2 text-xs text-[var(--color-phosphor-dim)]">
          <Prompt path="~">cat ~/about.md</Prompt>
        </div>
        <AsciiBox
          title="about.md"
          corner="[ 0.2 kb · utf-8 ]"
          tone="dim"
          className="scan-fade-in"
          bodyClassName="space-y-3 text-sm leading-relaxed text-[var(--color-phosphor)]"
        >
          <h2 id="about-heading" className="sr-only">
            About
          </h2>
          {BIO.paragraphs.map((p, i) => (
            <p key={i}>
              <span className="text-[var(--color-phosphor-mute)] select-none mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p}
            </p>
          ))}
          <div className="pt-2 text-xs text-[var(--color-phosphor-mute)]">
            {"// EOF"}
          </div>
        </AsciiBox>
      </div>
    </section>
  );
}
