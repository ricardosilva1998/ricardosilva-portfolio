import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ContactBlock } from "@/components/home/ContactBlock";
import { LINKEDIN } from "@/data/linkedin";
import { PROJECTS } from "@/data/projects";
import { AsciiBox } from "@/components/terminal/AsciiBox";
import { Prompt } from "@/components/terminal/Prompt";
import { ArrowUpRight, ExternalLink, FolderGit2 } from "lucide-react";

export default function HomePage() {
  return (
    <article className="pb-8">
      <Hero />

      <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-8">
        <header className="flex items-baseline gap-2 text-xs text-[var(--color-phosphor-dim)]">
          <Prompt path="~">cat profile.md</Prompt>
        </header>

        <AsciiBox title="header" tone="magenta" corner="0x0001">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <AsciiPortrait name={LINKEDIN.name} />
            <div className="flex-1 space-y-1.5">
              <h1 className="text-2xl text-[var(--color-phosphor)] phosphor-glow">
                {LINKEDIN.name}
              </h1>
              <div className="text-sm text-[var(--color-phosphor-dim)]">
                {LINKEDIN.headline}
              </div>
              <div className="text-xs text-[var(--color-phosphor-mute)]">
                📍 {LINKEDIN.location} · {LINKEDIN.connections}+ connections · open to work
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {LINKEDIN.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-sm border border-[var(--color-border-bright)] px-2 py-0.5 text-[10px] text-[var(--color-phosphor-dim)] transition hover:border-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor)]"
                  >
                    {l.label}
                    <ArrowUpRight className="size-2.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </AsciiBox>

        <Section heading="## about" prompt="head -c 2000 about.md">
          <p className="text-sm leading-relaxed text-[var(--color-phosphor)]">
            {LINKEDIN.about}
          </p>
        </Section>

        <Section heading="## experience" prompt="ls -la experience/">
          <ol className="space-y-4">
            {LINKEDIN.experience.map((exp, i) => (
              <li
                key={i}
                className="relative grid gap-2 border-l-2 border-[var(--color-phosphor-dim)] pl-4 sm:grid-cols-[140px_1fr]"
              >
                <div className="text-xs">
                  <div className="text-[var(--color-amber)]">{exp.period}</div>
                  {exp.location && (
                    <div className="text-[10px] text-[var(--color-phosphor-mute)]">
                      {exp.location}
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-[var(--color-phosphor)] phosphor-glow-soft">
                    {exp.title} <span className="text-[var(--color-phosphor-dim)]">@ {exp.company}</span>
                  </div>
                  <ul className="space-y-1 text-xs text-[var(--color-phosphor-dim)]">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="select-none text-[var(--color-phosphor-mute)]">
                          ›
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section heading="## education" prompt="cat education/*.md">
          <ol className="space-y-3">
            {LINKEDIN.education.map((ed, i) => (
              <li
                key={i}
                className="grid gap-2 border-l-2 border-[var(--color-phosphor-dim)] pl-4 sm:grid-cols-[140px_1fr]"
              >
                <div className="text-xs text-[var(--color-amber)]">{ed.period}</div>
                <div className="space-y-1">
                  <div className="text-sm text-[var(--color-phosphor)]">{ed.degree}</div>
                  <div className="text-xs text-[var(--color-phosphor-dim)]">{ed.school}</div>
                  <ul className="flex flex-wrap gap-1 pt-1 text-[10px]">
                    {ed.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-1.5 py-0.5 text-[var(--color-phosphor-dim)]"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section heading="## certifications" prompt="ls -la certs/">
          <ul className="grid gap-1 sm:grid-cols-2">
            {LINKEDIN.certifications.map((c, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-2 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-2 text-xs"
              >
                <span className="text-[var(--color-phosphor)]">{c.name}</span>
                <span className="shrink-0 text-right text-[10px] text-[var(--color-phosphor-dim)]">
                  {c.issuer} · <span className="text-[var(--color-amber)]">{c.year}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section heading="## skills" prompt="cat skills.txt | sort">
          <ul className="flex flex-wrap gap-1.5">
            {LINKEDIN.skills.map((s) => (
              <li
                key={s}
                className="rounded-sm border border-[var(--color-phosphor-dim)] bg-[var(--color-phosphor)]/5 px-2 py-0.5 text-[10px] text-[var(--color-phosphor)]"
              >
                {s}
              </li>
            ))}
          </ul>
        </Section>

        <Section heading="## notable-side-projects" prompt="cat projects/*.md">
          <ol className="space-y-2">
            {LINKEDIN.projects.map((p, i) => (
              <li
                key={i}
                className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3 text-xs"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm text-[var(--color-phosphor)]">{p.name}</span>
                  <span className="text-[var(--color-amber)]">{p.year}</span>
                </div>
                <div className="pt-1 text-[var(--color-phosphor-dim)]">{p.description}</div>
                <div className="flex flex-wrap gap-1 pt-1.5 text-[10px]">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-[var(--color-border)] px-1.5 py-0.5 text-[var(--color-phosphor-dim)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Section heading="## languages" prompt="locale">
            <ul className="space-y-1 text-xs">
              {LINKEDIN.languages.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between">
                  <span className="text-[var(--color-phosphor)]">{l.name}</span>
                  <span className="text-[var(--color-phosphor-dim)]">{l.level}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section heading="## publication" prompt="cat publication.md">
            <p className="text-xs text-[var(--color-phosphor-dim)]">{LINKEDIN.publication}</p>
          </Section>
        </div>

        <Section heading="## projects" prompt="ls ~/projects | wc -l">
          <div className="flex flex-col items-start gap-3 rounded-sm border border-[var(--color-phosphor)] bg-[var(--color-phosphor)]/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="text-sm text-[var(--color-phosphor)] phosphor-glow-soft">
                <FolderGit2 className="mr-2 inline size-4" />
                {PROJECTS.length} repositories on github
              </div>
              <div className="text-xs text-[var(--color-phosphor-dim)]">
                client work, side projects, learning exercises, games — all public.
              </div>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-phosphor)] px-3 py-1.5 text-xs uppercase tracking-widest text-[var(--color-phosphor)] transition hover:bg-[var(--color-phosphor)] hover:text-[var(--color-bg)]"
            >
              open ~/projects
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </Section>

        <footer className="border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-phosphor-mute)]">
          <a
            href="https://www.linkedin.com/in/ricardosilva98/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-magenta)] px-3 py-1.5 text-xs uppercase tracking-widest text-[var(--color-magenta)] transition hover:bg-[var(--color-magenta)] hover:text-[var(--color-bg)]"
          >
            open on linkedin.com
            <ExternalLink className="size-3" />
          </a>
        </footer>
      </div>

      <ContactBlock />
    </article>
  );
}

function Section({
  heading,
  prompt,
  children,
}: {
  heading: string;
  prompt: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-sm text-[var(--color-amber)] phosphor-glow-soft">
          {heading}
        </h2>
        <div className="text-[10px] text-[var(--color-phosphor-mute)]">
          {prompt}
        </div>
      </div>
      {children}
    </section>
  );
}

function AsciiPortrait({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      aria-hidden="true"
      className="grid size-20 shrink-0 place-items-center rounded-sm border border-[var(--color-magenta)] bg-[var(--color-bg-elev)] text-2xl tracking-[0.2em] text-[var(--color-magenta)] phosphor-glow"
    >
      {initials}
    </div>
  );
}
