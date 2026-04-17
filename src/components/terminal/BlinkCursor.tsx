import { cn } from "@/lib/cn";

export function BlinkCursor({
  char = "█",
  className,
}: {
  char?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("blink-cursor text-phosphor phosphor-glow-soft", className)}
    >
      {char}
    </span>
  );
}
