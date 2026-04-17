import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function AsciiBox({
  title,
  corner,
  children,
  className,
  bodyClassName,
  tone = "phosphor",
}: {
  title?: string;
  corner?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  tone?: "phosphor" | "amber" | "magenta" | "dim";
}) {
  const toneClass = {
    phosphor: "border-[var(--color-phosphor-dim)] text-[var(--color-phosphor)]",
    amber: "border-[var(--color-amber)] text-[var(--color-amber)]",
    magenta: "border-[var(--color-magenta)] text-[var(--color-magenta)]",
    dim: "border-[var(--color-border-bright)] text-[var(--color-phosphor-dim)]",
  }[tone];

  return (
    <div
      className={cn(
        "relative border rounded-sm bg-[var(--color-bg-raised)]/60 backdrop-blur-[1px]",
        toneClass,
        className,
      )}
    >
      {title && (
        <div className="absolute -top-[9px] left-4 bg-[var(--color-bg)] px-2 text-[10px] uppercase tracking-[0.25em]">
          <span className="phosphor-glow-soft">{title}</span>
        </div>
      )}
      {corner && (
        <div className="absolute -top-[9px] right-4 bg-[var(--color-bg)] px-2 text-[10px] tracking-widest text-[var(--color-phosphor-dim)]">
          {corner}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </div>
  );
}
