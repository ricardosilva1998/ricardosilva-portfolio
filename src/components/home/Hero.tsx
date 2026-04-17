"use client";

import { BIO } from "@/data/bio";
import { Typewriter } from "@/components/terminal/Typewriter";
import { BlinkCursor } from "@/components/terminal/BlinkCursor";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { useState } from "react";

export function Hero() {
  const [done, setDone] = useState(false);

  return (
    <section
      aria-label="intro"
      className="px-4 pt-6 pb-10 sm:px-8 sm:pt-10 sm:pb-16"
    >
      <TerminalWindow
        title="ricardo@silva: ~"
        subtitle="login shell · zsh 5.9"
        className="mx-auto max-w-5xl h-[340px] sm:h-[380px]"
        bodyClassName="p-6 sm:p-8"
      >
        <div className="space-y-3 text-sm sm:text-base">
          <div className="text-[var(--color-phosphor-mute)]">
            Last login: Mon Apr 17 09:14:22 on ttys001
          </div>
          <Typewriter
            charDelay={18}
            onDone={() => setDone(true)}
            lines={[
              {
                text: "> whoami",
                className: "text-[var(--color-phosphor-dim)]",
              },
              {
                text: BIO.whoami,
                className:
                  "text-[var(--color-phosphor-glow)] phosphor-glow text-lg sm:text-2xl",
                delayBefore: 100,
              },
              {
                text: "> cat ~/focus.txt",
                className: "text-[var(--color-phosphor-dim)] pt-3",
                delayBefore: 200,
              },
              {
                text: BIO.focus,
                className: "text-[var(--color-phosphor)]",
                delayBefore: 100,
              },
              {
                text: "> ls ./projects",
                className: "text-[var(--color-phosphor-dim)] pt-3",
                delayBefore: 300,
              },
              {
                text: "10 shipped apps · scroll ↓ to interact",
                className: "text-[var(--color-amber)] phosphor-glow-soft",
                delayBefore: 100,
              },
            ]}
          />
          {done && (
            <div className="pt-2">
              <span className="text-[var(--color-phosphor-dim)]">{"> "}</span>
              <BlinkCursor />
            </div>
          )}
        </div>
      </TerminalWindow>
    </section>
  );
}
