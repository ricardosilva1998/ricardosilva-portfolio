"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Line = { text: string; className?: string; delayBefore?: number };

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function Typewriter({
  lines,
  charDelay = 22,
  onDone,
  className,
}: {
  lines: Line[];
  charDelay?: number;
  onDone?: () => void;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      onDone?.();
      return;
    }
    if (lineIdx >= lines.length) {
      setDone(true);
      onDone?.();
      return;
    }
    const line = lines[lineIdx];
    if (charIdx === 0 && line.delayBefore) {
      const t = setTimeout(() => setCharIdx(1), line.delayBefore);
      return () => clearTimeout(t);
    }
    if (charIdx < line.text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), charDelay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 140);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, lines, charDelay, reduced, onDone]);

  return (
    <div className={cn("font-mono whitespace-pre-wrap", className)}>
      {lines.map((line, i) => {
        if (reduced || i < lineIdx) {
          return (
            <div key={i} className={line.className}>
              {line.text}
            </div>
          );
        }
        if (i === lineIdx) {
          return (
            <div key={i} className={line.className}>
              {line.text.slice(0, charIdx)}
              {!done && (
                <span className="blink-cursor text-phosphor-glow">▏</span>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
