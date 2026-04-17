export type DemoKey =
  | "expense-tracker"
  | "formeq"
  | "restaurant-automation"
  | "vilela-notifications"
  | "cahico-erp"
  | "driving-school"
  | "iracing-leaderboard"
  | "barber-shop"
  | "vilela-bridge"
  | "auto-theme";

export type Project = {
  slug: string;
  name: string;
  shellName: string;
  tagline: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  year: number;
  demo: DemoKey;
  highlight?: "ai" | "production" | "fullstack";
};

export const PROJECTS: Project[] = [
  {
    slug: "expense-tracker",
    name: "Expense Tracker",
    shellName: "expense_tracker",
    tagline: "AI-categorized personal finance dashboard",
    description:
      "Full-stack finance app that ingests bank statements, auto-categorizes transactions with Claude, and visualizes budgets on a KPI dashboard. Python FastAPI backend, React frontend, Postgres, Fly.io-ready.",
    stack: ["python", "fastapi", "react", "postgres", "claude"],
    repoUrl: "https://github.com/ricardosilva1998/expense-tracker",
    year: 2025,
    demo: "expense-tracker",
    highlight: "ai",
  },
  {
    slug: "formeq-rebuild",
    name: "Formeq Rebuild",
    shellName: "formeq_rebuild",
    tagline: "Bilingual PT/EN site with a built-in SQLite CMS",
    description:
      "Replaced a brittle WordPress install with a Next.js 15 site using Drizzle + SQLite, a custom admin panel, iron-session auth, and a TipTap editor. Deploys as a single container to Railway.",
    stack: ["next.js", "drizzle", "sqlite", "tiptap", "tailwind"],
    repoUrl: "https://github.com/ricardosilva1998/formeq_rebuild",
    year: 2025,
    demo: "formeq",
    highlight: "fullstack",
  },
  {
    slug: "restaurant-automation",
    name: "Restaurant Automation",
    shellName: "restaurant_automation",
    tagline: "Full-stack POS with Claude-powered menu suggestions",
    description:
      "Ordering and kitchen system with a Hono+Bun backend, Vue 3 frontend, and the Anthropic SDK suggesting modifiers in real time. End-to-end tested with Playwright.",
    stack: ["hono", "bun", "vue", "anthropic", "playwright"],
    repoUrl: "https://github.com/ricardosilva1998/restaurant-automation",
    year: 2025,
    demo: "restaurant-automation",
    highlight: "ai",
  },
  {
    slug: "vilela-notifications",
    name: "Vilela Notifications",
    shellName: "vilela_notifications",
    tagline: "Self-service Discord bot for streamers",
    description:
      "A Discord bot streamers can configure through a web dashboard: Twitch live alerts, clip notifications, YouTube uploads, welcome messages, and subscriber sync. Production-ready on Railway with a persistent volume.",
    stack: ["node.js", "discord.js", "sqlite", "ejs", "express"],
    repoUrl: "https://github.com/ricardosilva1998/atleta-notifications-helper",
    year: 2025,
    demo: "vilela-notifications",
    highlight: "production",
  },
  {
    slug: "cahico-erp",
    name: "Cahico ERP",
    shellName: "cahico_erp_2026",
    tagline: "Internationalized ERP with Supabase + Vue 3",
    description:
      "A multi-tenant ERP front-end in Vue 3 + Vite with Supabase as the backend, full i18n (PT/EN/ES), and a Playwright E2E suite. Ships invoicing, customers, and activity streams.",
    stack: ["vue", "vite", "supabase", "typescript", "playwright"],
    repoUrl: "https://github.com/ricardosilva1998/cahico_erp_2026",
    year: 2026,
    demo: "cahico-erp",
    highlight: "fullstack",
  },
  {
    slug: "driving-school",
    name: "Driving School",
    shellName: "driving_school",
    tagline: "Management system for a driving school",
    description:
      "Student roster, lesson scheduling, progress tracking, and PDF certificate export. Built on Next.js 16 with NextAuth, Prisma, and react-pdf.",
    stack: ["next.js", "prisma", "nextauth", "react-pdf", "tailwind"],
    repoUrl: "https://github.com/ricardosilva1998/driving-school",
    year: 2025,
    demo: "driving-school",
    highlight: "fullstack",
  },
  {
    slug: "iracing-leaderboard",
    name: "iRacing Leaderboard",
    shellName: "iracing_leaderboard",
    tagline: "Real-time racing leaderboard with lap-time analytics",
    description:
      "Aggregates iRacing session data into a sortable leaderboard and per-driver stat panel with Recharts visualizations of lap times, incidents, and gap to leader.",
    stack: ["next.js", "prisma", "sqlite", "recharts", "tailwind"],
    repoUrl: "https://github.com/ricardosilva1998/iracing-leaderboard",
    year: 2025,
    demo: "iracing-leaderboard",
  },
  {
    slug: "barber-shop",
    name: "Barber Shop",
    shellName: "barber_shop",
    tagline: "Booking app with email confirmation",
    description:
      "A Next.js 16 booking app using Prisma with SQLite and Resend for transactional email. Customers pick a barber, service, and time slot; staff see upcoming appointments at a glance.",
    stack: ["next.js", "prisma", "resend", "react", "tailwind"],
    repoUrl: "https://github.com/ricardosilva1998/dragan-barbershop",
    year: 2025,
    demo: "barber-shop",
    highlight: "fullstack",
  },
  {
    slug: "vilela-bridge",
    name: "Vilela Bridge",
    shellName: "vilela_bridge_improvements",
    tagline: "Streaming platform with Claude-powered clip suggestions",
    description:
      "A React dashboard for streamers surfacing viewer stats, chat, and AI-picked clip highlights using the Anthropic SDK. Socket.io streams live signals from a Bun/Express backend.",
    stack: ["react", "bun", "express", "socket.io", "anthropic"],
    repoUrl: "https://github.com/ricardosilva1998/vilela-bridge-improvements",
    year: 2025,
    demo: "vilela-bridge",
    highlight: "ai",
  },
  {
    slug: "auto-theme",
    name: "Adriana's Store Theme",
    shellName: "auto_generated_theme",
    tagline: "Astro theme builder with live color/font preview",
    description:
      "An Astro 6 + React 19 theme builder for a small e-commerce: Drizzle ORM, Postgres, and S3-backed asset storage. Shop owners tweak colors and fonts and watch the preview update live.",
    stack: ["astro", "react", "drizzle", "postgres", "s3"],
    repoUrl: "https://github.com/ricardosilva1998/adrianas-store",
    year: 2025,
    demo: "auto-theme",
  },
];

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
