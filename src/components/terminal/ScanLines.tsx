"use client";

import { useEffect } from "react";

/**
 * Attaches the .scanlines class to <html> so the global overlay pseudo-elements
 * render. Kept as a component so a11y users can later opt in/out via prefs.
 */
export function ScanLines() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("scanlines");
    return () => root.classList.remove("scanlines");
  }, []);
  return null;
}
