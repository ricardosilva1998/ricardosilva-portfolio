// REVIEW BEFORE SHIP — The roles below are drafted stubs inferred from
// public repos and LinkedIn data that was login-walled. Please correct the
// titles, exact periods, and bullets before publishing:
//   - Capgemini (Software Engineer, 2023 – Present)
//   - Xalantis (Frontend Developer, 2022 – 2023)
//   - Web Winner Agency (Frontend Developer, 2021 – 2022)

export type Experience = {
  company: string;
  title: string;
  period: string;
  location?: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  bullets: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year: number;
};

export type LinkedInProject = {
  name: string;
  year: string;
  tech: string[];
  description: string;
};

export type LinkedInProfile = {
  name: string;
  headline: string;
  location: string;
  connections: number;
  about: string;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: LinkedInProject[];
  skills: string[];
  languages: { name: string; level: string }[];
  links: { label: string; href: string }[];
  publication: string;
};

export const LINKEDIN: LinkedInProfile = {
  name: "Ricardo Silva",
  headline: "Full-Stack Engineer · AI integrations · Next.js · Vue · Python",
  location: "Oeiras, Lisboa, Portugal",
  connections: 430,
  about:
    "Full-stack engineer with a bias for shipping. I build end-to-end web products and automations, from database schema to 60fps UI, and I integrate AI where it actually moves the needle — categorization, generation, suggestion. I've worked across Next.js, Vue, Python (FastAPI), Node, and Postgres, with the Anthropic and OpenAI SDKs. I care about product outcomes as much as technical ones.",
  experience: [
    {
      company: "Capgemini",
      title: "Software Engineer",
      period: "2023 – Present",
      location: "Lisboa, Portugal",
      bullets: [
        "Building and maintaining enterprise web applications across Java, TypeScript, and cloud stacks.",
        "Collaborating with distributed teams on feature delivery, code review, and production support.",
        "Focus on reliability, automated testing, and developer-experience improvements.",
        "// draft — please confirm role title, exact period, team, and bullets before publishing.",
      ],
    },
    {
      company: "Xalantis",
      title: "Frontend Developer",
      period: "2022 – 2023",
      location: "Lisboa, Portugal",
      bullets: [
        "Delivered Vue.js client sites and Node.js APIs — Sednai, BFRI (Stamina, Abreu), ECQ Digital Transition, Magnolia API, Camelia API.",
        "Full ownership from design hand-off to production deploy.",
        "// draft — please confirm exact title, period, and bullets before publishing.",
      ],
    },
    {
      company: "Web Winner Agency (WWA)",
      title: "Frontend Developer",
      period: "2021 – 2022",
      location: "Portugal",
      bullets: [
        "Built Vue.js client sites and templates — IKEA template, Majestic v2, Magnolia, Douro Wines tourism site.",
        "Worked directly with designers to turn static mockups into responsive production pages.",
        "// draft — please confirm exact title, period, and bullets before publishing.",
      ],
    },
    {
      company: "Personal projects & freelance",
      title: "Independent full-stack engineer",
      period: "2021 – Present",
      location: "Remote",
      bullets: [
        "Shipped 50+ public repos: AI finance tracker, restaurant POS, streaming bot, driving-school CRM, ERP systems, and more.",
        "Integrated the Anthropic and OpenAI APIs for categorization, content suggestions, and highlight detection.",
        "End-to-end delivery: design → build → deploy → operate (Railway, Vercel, Fly.io).",
      ],
    },
  ],
  education: [
    {
      school: "Instituto Politécnico de Santarém",
      degree: "Bachelor in Computer Engineering",
      period: "2017 – 2021",
      bullets: [
        "Computer Architecture, Operating Systems, Programming I & II",
        "Algorithms, Data Structures, Databases, Networks",
        "Mobile Development, Cloud Computing, Artificial Intelligence, Finance",
        "Security Systems, Multimedia Applications, Mathematics",
      ],
    },
  ],
  certifications: [
    { name: "Introduction to Next.js 13+", issuer: "Frontend Masters", year: 2023 },
    { name: "Complete Intro to React", issuer: "Frontend Masters", year: 2023 },
    { name: "Complete Web & Mobile Designer", issuer: "Udemy", year: 2022 },
    { name: "Vue JS 2 Course", issuer: "Udemy", year: 2021 },
    { name: "Intermediate Machine Learning", issuer: "Kaggle", year: 2021 },
    { name: "Natural Language Processing", issuer: "Kaggle", year: 2021 },
    { name: "Intro to Machine Learning", issuer: "Kaggle", year: 2021 },
    { name: "Python Beginner", issuer: "Udemy", year: 2021 },
    { name: "React Beginner", issuer: "Udemy", year: 2021 },
    { name: "React + Redux", issuer: "Udemy", year: 2021 },
  ],
  projects: [
    {
      name: "Douro Wines Web App",
      year: "2021 – 2023",
      tech: ["react", "node"],
      description:
        "React web app for a wine tourism business in the Douro Valley.",
    },
    {
      name: "Douro Wine Tours Marketing Website",
      year: "2020 – 2021",
      tech: ["wordpress"],
      description:
        "Bilingual marketing site built on WordPress; later superseded by a custom build.",
    },
    {
      name: "React Movies / To-Do / Calculator",
      year: "2021",
      tech: ["react"],
      description:
        "Portfolio of learning apps while onboarding React + Redux fundamentals.",
    },
    {
      name: "Platform game (Super Mario-style)",
      year: "2019",
      tech: ["javascript"],
      description: "Academic 2D platformer with hand-coded physics and collision.",
    },
    {
      name: "Pacman-style board game",
      year: "2018",
      tech: ["javascript"],
      description:
        "Academic arcade clone featuring pathfinding for the ghost AI.",
    },
  ],
  skills: [
    "vue.js",
    "next.js",
    "html",
    "css",
    "scss",
    "javascript",
    "typescript",
    "tailwind",
  ],
  languages: [
    { name: "Portuguese", level: "native" },
    { name: "English", level: "professional" },
    { name: "Spanish", level: "conversational" },
  ],
  links: [
    { label: "github.com/ricardosilva1998", href: "https://github.com/ricardosilva1998" },
    { label: "linkedin.com/in/ricardosilva98", href: "https://www.linkedin.com/in/ricardosilva98/" },
    { label: "ricardomrbs1998@gmail.com", href: "mailto:ricardomrbs1998@gmail.com" },
  ],
  publication:
    "Introduction to Jasper Reports Server — Revista UIIPS, Jan 2021 (co-authored).",
};
