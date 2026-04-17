import { cn } from "@/lib/cn";
import { BlinkCursor } from "./BlinkCursor";
import type { ReactNode } from "react";

export function Prompt({
  user = "ricardo",
  host = "silva",
  path = "~",
  cursor = false,
  children,
  className,
}: {
  user?: string;
  host?: string;
  path?: string;
  cursor?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-mono", className)}>
      <span className="text-[var(--color-phosphor-dim)]">{user}</span>
      <span className="text-[var(--color-phosphor-mute)]">@</span>
      <span className="text-[var(--color-phosphor-dim)]">{host}</span>
      <span className="text-[var(--color-phosphor-mute)]">:</span>
      <span className="text-[var(--color-cyan)] phosphor-glow-soft">{path}</span>
      <span className="text-[var(--color-phosphor-dim)]">$ </span>
      {children && (
        <span className="text-[var(--color-phosphor)] phosphor-glow-soft">
          {children}
        </span>
      )}
      {cursor && <BlinkCursor className="ml-1" />}
    </span>
  );
}
