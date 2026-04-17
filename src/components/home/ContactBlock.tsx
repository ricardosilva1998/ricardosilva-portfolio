import { AsciiBox } from "@/components/terminal/AsciiBox";
import { Prompt } from "@/components/terminal/Prompt";

type ContactRow = {
  key: string;
  label: string;
  href: string;
  external?: boolean;
};

const CONTACTS: ContactRow[] = [
  {
    key: "github",
    label: "github.com/ricardosilva1998",
    href: "https://github.com/ricardosilva1998",
    external: true,
  },
  {
    key: "linkedin",
    label: "linkedin.com/in/ricardosilva98",
    href: "https://www.linkedin.com/in/ricardosilva98/",
    external: true,
  },
  {
    key: "email",
    label: "ricardomrbs1998@gmail.com",
    href: "mailto:ricardomrbs1998@gmail.com",
  },
  {
    key: "cv",
    label: "./ricardo-silva-cv.pdf",
    href: "/cv/ricardo-silva-cv.pdf",
  },
];

export function ContactBlock() {
  return (
    <section aria-labelledby="contact-heading" className="px-4 pb-16 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex items-baseline gap-2 text-xs text-[var(--color-phosphor-dim)]">
          <Prompt path="~">cat ~/.contact</Prompt>
        </div>
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>
        <AsciiBox title=".contact" tone="amber" corner="chmod 600">
          <ul className="divide-y divide-[var(--color-border)] font-mono">
            {CONTACTS.map((c) => (
              <li key={c.key}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="grid grid-cols-[90px_1fr_auto] items-center gap-3 py-2 px-1 text-sm transition hover:bg-[var(--color-bg-elev)]"
                >
                  <span className="text-[var(--color-phosphor-mute)] uppercase tracking-wider text-xs">
                    {c.key}
                  </span>
                  <span className="text-[var(--color-phosphor)] phosphor-glow-soft truncate">
                    {c.label}
                  </span>
                  <span className="text-[var(--color-phosphor-dim)] text-xs">
                    {c.external ? "↗" : c.key === "email" ? "✉" : "⇣"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </AsciiBox>
        <div className="border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-phosphor-mute)]">
          {
            "// hint: press `g` to open the explorer, or tab through links with keyboard"
          }
        </div>
      </div>
    </section>
  );
}
