import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, VT323, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ScanLines } from "@/components/terminal/ScanLines";
import { FileTreeNav } from "@/components/nav/FileTreeNav";
import { StatusBar } from "@/components/nav/StatusBar";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  weight: ["400"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ricardo silva — portfolio",
  description:
    "Full-stack engineer · AI integrations · Next.js · Vue · Python. Projects and LinkedIn profile rendered as a CRT terminal.",
  openGraph: {
    title: "ricardo silva — portfolio",
    description:
      "Full-stack engineer based in Oeiras, PT. Ten shipped projects with interactive in-page demos.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${vt323.variable} ${plex.variable}`}>
      <body className="min-h-dvh">
        <ScanLines />
        <div className="flex min-h-dvh flex-col">
          <StatusBar />
          <div className="flex flex-1">
            <aside className="sticky top-[28px] hidden h-[calc(100dvh-28px)] w-56 shrink-0 overflow-y-auto border-r border-[var(--color-border-bright)] bg-[var(--color-bg-raised)]/50 phosphor-scroll md:block">
              <FileTreeNav />
            </aside>
            <main className="min-w-0 flex-1">{children}</main>
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}

function MobileNav() {
  return (
    <nav className="sticky bottom-0 z-30 flex items-center justify-around border-t border-[var(--color-border-bright)] bg-[var(--color-bg-elev)]/95 px-2 py-1.5 text-[11px] backdrop-blur md:hidden">
      <a href="/" className="px-3 py-1 text-[var(--color-phosphor-dim)]">
        ~/home
      </a>
      <a href="/projects" className="px-3 py-1 text-[var(--color-phosphor-dim)]">
        ~/projects
      </a>
      <a
        href="https://github.com/ricardosilva1998"
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1 text-[var(--color-phosphor-dim)]"
      >
        github ↗
      </a>
    </nav>
  );
}
