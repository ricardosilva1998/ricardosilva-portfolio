# portfolio

```
> whoami
ricardo silva · full-stack engineer · oeiras, pt
```

Personal portfolio with terminal/CRT aesthetic, built with Next.js 16 + Tailwind v4.

## Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — home: hero, about, projects grid, contact
- `/linkedin` — LinkedIn profile rendered as `cat ~/profile.md`
- `/projects/[slug]` — deep-link to any project demo in full-page

## Editing content

All content lives in typed data files — no CMS.

- `src/data/projects.ts` — projects list, metadata, repo/live URLs
- `src/data/linkedin.ts` — LinkedIn profile (experience, education, certs)
- `src/data/bio.ts` — short about-me text shown on home

## Deployment

Deploys anywhere that runs Next.js 16 (Vercel is recommended).

```bash
npm run build
npm start
```
