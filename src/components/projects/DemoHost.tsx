"use client";

import type { DemoKey } from "@/data/projects";
import { DEMOS } from "./demos";

/**
 * Client boundary for demo rendering. Server components (like
 * app/projects/[slug]/page.tsx) can't index into a Record of client components
 * directly — the values aren't individually registered as client references.
 * This thin wrapper reads DEMOS on the client side.
 */
export function DemoHost({ demo }: { demo: DemoKey }) {
  const Component = DEMOS[demo];
  if (!Component) {
    return (
      <div className="rounded-md border border-dashed border-[var(--color-border-bright)] p-6 text-sm text-[var(--color-phosphor-dim)]">
        demo not wired up — check the repo below.
      </div>
    );
  }
  return <Component />;
}
