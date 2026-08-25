# Media Performance Audit — V1.1

## Scope

- Audit date: 2026-08-19
- Scope: published portfolio raster and animated media only.
- Excluded: visual redesign, case-study composition, routing, deployment configuration, design-system work, HoverImage migration, and homepage client-boundary work.
- Ownership rule: original project media remains unchanged. New files are publication derivatives only.

## Largest source-owned assets

| Asset | Source size | Dimensions / duration | Public-route behavior |
|---|---:|---|---|
| Honda `responsive-theme-adaptation.gif` | 9.14 MiB | 1920×920, 915 frames, 30.5 s | Lazy-loaded on the Honda case study; previously used at full size on every viewport. |
| Rubik `rubikstudio_CN.png` | 8.54 MiB | 4320×12576 | Not used by the current English route; an optimized English WebP derivative is published. |
| Honda `vehicle-language-adaptation.gif` | 7.09 MiB | 1920×914, 456 frames, 15.2 s | Lazy-loaded on the Honda case study; previously used at full size on every viewport. |
| Honda `tokens-and-components_EN.jpg` | 4.10 MiB | 4320×5052 | Not requested by the route; 145 KiB display and 62 KiB mobile WebPs are used. |
| Honda `tokens-and-components_CN.jpg` | 3.86 MiB | 4320×4928 | Reserved for Chinese localization; current untracked Chinese module still references the source original and was not modified. |
| Honda `cover2.png` | 3.22 MiB | 2554×1432 | Not requested by public routes; 66 KiB display and 38 KiB mobile WebPs are used. |
| Honda `cover1.png` | 2.63 MiB | 2552×1432 | Not requested by public routes; 54 KiB display and 31 KiB mobile WebPs are used. |
| Lincoln `vehicle-empty.png` | 2.31 MiB | 1206×2622 | Not requested by the English route; 24 KiB display and 15 KiB mobile WebPs are used. |
| Honda `design-to-code_EN.jpg` | 2.07 MiB | 4320×2464 | Not requested by the route; 87 KiB display and 40 KiB mobile WebPs are used. |
| Lincoln `cover.png` | 1.61 MiB | 1448×1086 | Not requested by the route; 80 KiB display and 40 KiB mobile WebPs are used. |
| Rubik `rubikstudio_EN.png` | 1.53 MiB | 736×2138 | Not requested by the route; 165 KiB display and 139 KiB mobile WebPs are used. |

Other assets above 1 MiB are retained source originals or approved project evidence with existing publication derivatives. No current English route was found requesting those originals directly.

## Measured impact

- Initial Honda case-study media transfer is small: the only eager image is 54 KiB on desktop or 31 KiB on mobile.
- The two large animations are below the fold and already use native lazy loading, so they do not block initial LCP.
- Before this pass, a visitor who reached both animations transferred 16.43 MiB of Honda page media on mobile; 16.22 MiB came from the two GIFs.
- After this pass, the same complete mobile page transfers 11.16 MiB of media: a reduction of 5.27 MiB, or 32.1%.
- Desktop full-page transfer remains 16.65 MiB because desktop intentionally retains the original GIFs for exact fidelity.
- The build copied 78 media files. Publication media and retained originals occupy approximately 81.2 MiB in both the project media package and generated public assets. The new mobile derivatives add 10.96 MiB to the deployment artifact; this trades static storage for lower mobile network transfer without changing source ownership.

## Changes implemented

1. Added `responsive-theme-adaptation-mobile.webp` at 768×368 and `vehicle-language-adaptation-mobile.webp` at 768×366.
2. Preserved all animation frames and loop behavior. The source GIFs remain the desktop and compatibility fallback.
3. Updated the Honda figure implementation to select the mobile WebPs through `<picture>` below 768 px.
4. Added real intrinsic width and height metadata for every Honda figure, allowing browsers to reserve the correct layout aspect ratio before lazy media loads.

## Fidelity evidence

| Derivative | Frames | Source → derivative | Sampled PSNR |
|---|---:|---:|---:|
| Responsive theme adaptation | 915 | 9.14 → 6.62 MiB | 37.5 dB minimum, 38.1 dB average |
| Vehicle/language adaptation | 456 | 7.09 → 4.34 MiB | 36.8 dB minimum, 36.9 dB average |

Five evenly distributed frames from each animation were compared after resizing the source to the derivative dimensions. First-frame visual inspection confirmed composition, color, type, and aspect-ratio parity. Frame-rate reduction was deliberately rejected.

## Deliberately unchanged and residual risks

- No source original was overwritten, recompressed, renamed, or removed.
- No English factual or localized content record was changed.
- The untracked Chinese content modules were not touched. Honda Chinese still-image derivatives need a separate owner-reviewed localization pass.
- Static artifact size increased because the current asset pipeline copies originals and publication derivatives together. Selective-copy or manifest-driven publication would reduce deployment storage, but it is a broader pipeline change and was not started.
- Video conversion could reduce animation payload substantially more than animated WebP, but it changes rendering semantics, autoplay/reduced-motion behavior, and fallback requirements. It remains a separately reviewed optimization.

## Verification

- `npm run lint`: 0 errors; the two existing unrelated warnings remain.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; 78 assets copied and all public routes statically generated.
- Generated Honda HTML contains mobile WebP `<source>` elements with original GIF `<img>` fallbacks.
- Post-change frontend detector: no findings.
