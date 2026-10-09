# Deethin System V2 — review record

Status: Proposed; owner visual acceptance pending. Date: 2026-09-26.

Update: v0.2.1 changes light-background MONO labels to #0087FB and replaces the generic system-object JSON download with a Figma variable manifest. Variable names use lowercase slash-separated paths; CSS custom-property names appear only in WEB code syntax. The manifest performs a runtime audit for invalid or duplicate names, missing mode values, and broken aliases before enabling download.

## Scope and rollback

New isolated route: `/proto/design-system-directions/deethin-system-v2`.
The five original files in `deethin-system` were compared byte-for-byte with the pre-edit snapshot and remain unchanged. No production route, shared component, Figma document, factual project content, dependency, or governance rule was changed. To reject the experiment, keep using V1; removing only this V2 directory removes the experiment.

## Owner feedback coverage

- Color: white / ink / sky identity composition; retain semantic surface and text roles; system state colors excluded from showcase, retained internally pending Figma review. Dark card #1D1D1D verified in homepage source. Accessible darker accent for light-background MONO labels.
- Hero: WebGL palette and separate static CSS fallback both shown and explicitly distinguished.
- Spacing: seven individual thumbnails plus existing live responsive grid and real button anatomy.
- Surfaces: light/inverse nested samples; radius用途说明; elevation versus stacking explanation and working native modal.
- Components: icon buttons, animated quiet underline, lighter visible keyboard focus, enlarged 4:3 project covers, cover-bottom white tags and arrow, no “Read case study” CTA. Default and revealed samples; no-image and long-content examples retained in stress area.
- Motion: icon feedback, underline, cover reveal, masked title and stagger demos, original narrative replay, reduced-motion switch and OS media query.
- Architecture: Primitive/Semantic/Component aliases, Styles recipes, separate context and viewport modes, source measurements for Hero/Section Heading/Project Card, staged migration and acceptance criteria. No Figma write or claim of Figma parity.

## Verification

- TypeScript `npx tsc --noEmit`: pass, including final edits.
- Scoped V2 ESLint: pass, no warnings.
- Repository `npm run lint`: zero errors; three existing warnings in `output/curated-view/content.js`, `src/components/Hover/HoverImage.tsx`, and `tmp/pdfs/portfolio-showcase/capture-web-pages.mjs`.
- Browser: desktop at 1280/1440; final 320px DOM width equals scroll width; seven spacing thumbnails and eleven sections present. No broken loaded images or captured console errors.
- Keyboard: project focus reveals tags/arrow and a 2px outline. Modal Escape closes and restores focus to its trigger.
- Reduced motion: page switch produces animation-name none and transform none for title replay, with overlay information visible. OS media-query branch is implemented but was not independently emulated.
- 200% text: local component stress fixture at 320px viewport reflows without horizontal page overflow. This is not a full-browser text-only zoom conformance claim.
- Homepage actual computed styles sampled at 1440px and 390px. Section heading tracking is -.055em after global override, not the local declaration -.06em. Source revision and file hashes are in architecture.ts and the exported JSON.
- Build: attempted `npx next build` without the asset-clearing prebuild step, using existing verified assets. Failed at network fetching Inter and JetBrains Mono from fonts.googleapis.com. No production build pass claimed; fonts/dependencies were not changed to bypass this.
- Online deethin.site browser request timed out. Reference inspection used the local production homepage and its source; deployed parity is unverified.
- Not tested: physical touch hardware, screen-reader combinations, full-browser 400% zoom, Figma rendering. CSS coarse-pointer fallback is implemented; actual hardware validation remains.

## Files

page.tsx routes the independent page. SystemPage.tsx preserves the original catalogue structure with scoped changes. Explainers.tsx renders the new specimens. content.ts and architecture.ts hold documentation and evidence. tokens.ts contains the local color alias graph and exports. system.module.css is entirely isolated from V1.
