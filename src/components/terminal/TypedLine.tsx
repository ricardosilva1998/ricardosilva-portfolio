"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { BlinkCursor } from "./BlinkCursor";

export function TypedLine({
  text,
  delay = 0,
  charDelay = 16,
  className,
  showCursorWhenDone = false,
  onDone,
}: {
  text: string;
  delay?: number;
  charDelay?: number;
  className?: string;
  showCursorWhenDone?: boolean;
  onDone?: () => void;
}) {
  const [reduced, setReduced] = useState(false);
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setIdx(text.length);
      setStarted(true);
      onDone?.();
      return;
    }
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, text]);

  useEffect(() => {
    if (!started || reduced) return;
    if (idx >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setIdx((i) => i + 1), charDelay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, idx, text.length, charDelay, reduced]);

  const done = idx >= text.length;
  return (
    <span className={cn("inline", className)}>
      {text.slice(0, idx)}
      {(!done && started) && (
        <BlinkCursor className="ml-0.5" char="▏" />
      )}
      {(done && showCursorWhenDone) && (
        <BlinkCursor className="ml-0.5" char="▏" />
      )}
    </span>
  );
}
