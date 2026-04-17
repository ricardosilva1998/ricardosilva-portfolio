"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useClock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function pathToTitle(pathname: string): string {
  if (pathname === "/") return "~";
  if (pathname === "/projects") return "~/projects.md";
  return pathname;
}

export function StatusBar() {
  const pathname = usePathname();
  const time = useClock();

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 flex items-center gap-3 border-b border-[var(--color-border-bright)] bg-[var(--color-bg-elev)]/95 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--color-phosphor-dim)] backdrop-blur"
    >
      <span className="flex items-center gap-2">
        <span className="inline-block size-2 rounded-full bg-[var(--color-phosphor)] phosphor-glow" />
        <span>ricardo@silva</span>
      </span>
      <span className="text-[var(--color-phosphor-mute)]">—</span>
      <span className="text-[var(--color-phosphor)]">main ●</span>
      <span className="text-[var(--color-phosphor-mute)]">·</span>
      <span className="text-[var(--color-phosphor-dim)]">{pathToTitle(pathname)}</span>
      <span className="ml-auto flex items-center gap-3">
        <span className="hidden sm:inline text-[var(--color-phosphor-mute)]">
          utf-8 · LF
        </span>
        <span className="text-[var(--color-amber)] phosphor-glow-soft">
          {time || "--:--"}
        </span>
      </span>
    </header>
  );
}
