import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function TerminalWindow({
  title = "~",
  subtitle,
  onClose,
  onMinimize,
  onMaximize,
  footer,
  children,
  className,
  bodyClassName,
  closeLabel = "close",
}: {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  closeLabel?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-md border border-[var(--color-border-bright)] bg-[var(--color-bg-raised)] shadow-[0_0_40px_rgba(51,255,102,0.08),inset_0_0_0_1px_rgba(51,255,102,0.06)]",
        className,
      )}
    >
      <header className="flex items-center gap-2 border-b border-[var(--color-border-bright)] bg-[var(--color-bg-elev)] px-3 py-2">
        <div className="flex gap-1.5">
          <button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="size-3 rounded-full bg-[var(--color-red)] hover:brightness-125 focus-visible:brightness-125 transition"
          />
          <button
            type="button"
            aria-label="minimize"
            onClick={onMinimize}
            className="size-3 rounded-full bg-[var(--color-amber)] hover:brightness-125 focus-visible:brightness-125 transition"
          />
          <button
            type="button"
            aria-label="maximize"
            onClick={onMaximize}
            className="size-3 rounded-full bg-[var(--color-phosphor)] hover:brightness-125 focus-visible:brightness-125 transition"
          />
        </div>
        <div className="flex-1 text-center text-xs text-[var(--color-phosphor-dim)]">
          <span className="phosphor-glow-soft">{title}</span>
          {subtitle && (
            <>
              <span className="mx-2 text-[var(--color-border-bright)]">·</span>
              <span className="text-[var(--color-phosphor-mute)]">{subtitle}</span>
            </>
          )}
        </div>
        <div className="w-[54px]" />
      </header>
      <div className={cn("flex-1 overflow-auto phosphor-scroll", bodyClassName)}>
        {children}
      </div>
      {footer && (
        <footer className="border-t border-[var(--color-border-bright)] bg-[var(--color-bg-elev)] px-3 py-2 text-xs">
          {footer}
        </footer>
      )}
    </div>
  );
}
