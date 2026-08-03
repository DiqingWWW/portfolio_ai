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

Configure machine-local absolute paths in the ignored `content-sync.local.json`, using
`content-sync.example.json` as the portable structure. After editing either Obsidian master,
run:

```bash
npm run content:text-expression
```

The command updates each repository `case-study.md`, copies its approved assets, records the
master hash in `source-manifest.json`, and regenerates interview pitch/appendix files inside
the corresponding Obsidian `generated/` folder. Generated files are not authoring sources.

This synchronization prepares content; it does not automatically register a project in the
current homepage manifest or publish it to a route.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
