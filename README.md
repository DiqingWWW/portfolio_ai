This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Portfolio content synchronization

The Obsidian project folders are the authoring sources for case-study narratives and source
assets. This repository keeps only generated website copy and approved publication assets.

Current synchronized projects:

- `字数` → `content/projects/lincoln-text-expression/`
- `hondasystem` → `content/projects/honda-hmi-design-system/`
- `Portfolio Websites` → `content/projects/portfolio-operating-system/`

Configure machine-local absolute paths in the ignored `content-sync.local.json`, using
`content-sync.example.json` as the portable structure. After editing either Obsidian master,
run:

```bash
npm run content:sync
```

`npm run content:text-expression` remains as a backward-compatible alias.

The command copies approved assets, records the master hash in `source-manifest.json`, and
regenerates interview pitch/appendix files inside the corresponding Obsidian `generated/`
folder. Generated files are not authoring sources.

Repository output depends on the project's configured authoring format:

- `curation-tags` projects generate `case-study.selection.json`. Localized
  `case-study.en.ts` / `case-study.zh.ts` modules curate and translate those approved source
  units for the website; no duplicate repository narrative Markdown is generated.

All currently published text-led projects use this curation-tag workflow.

This synchronization prepares content; it does not automatically register a project in the
current homepage manifest or publish it to a route.

The homepage implementation lives in `src/app/page.tsx`. Project case studies use their own
localized content modules and page components under `src/components/case-study/`.

This project uses [`next/font`](https://nextjs.org/docs/app/getting-started/fonts) to load Inter
and JetBrains Mono.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

V1.1 deploys through Vercel. Its intended production domain is `www.deethin.site`, registered and
managed through Alibaba Cloud DNS.

1. Add `deethin.site` and `www.deethin.site` to the Vercel project's **Settings → Domains**.
2. In Alibaba Cloud DNS, create the exact apex A record and `www` CNAME Vercel displays for
   this project. Do not substitute generic values if Vercel provides project-specific records.
3. Set the Vercel Production environment variable
   `NEXT_PUBLIC_SITE_URL=https://www.deethin.site`, then redeploy after verification succeeds.
4. Confirm `/robots.txt`, `/sitemap.xml`, canonical metadata, Open Graph previews, desktop and
   mobile project routes on the deployed domain.

`https://www.deethin.site` is also the code fallback so metadata remains coherent before the
environment variable is configured. `https://deethin.site` redirects to this canonical host.
The Vercel deployment URL remains useful for preview and rollback verification, but is not the
preferred public URL.
