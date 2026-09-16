# Curated hero motion and pointer review — 2026-09-09

Status: Proposed / iterate, awaiting owner visual acceptance. Local prototype only; no production adoption or deployment.

## Scope and behavior

- `/proto/curated-home-v2`: independently wandering left/right light-field endpoints, smoothly joined by a cubic B-spline path. Replaces the fixed 12-second, then 6-second pendulum cycle; the final version is non-periodic.
- Hero pointer: expanded 340–560px lens, 32px backdrop blur, dark-field response and soft white light. Only enabled after the opening.
- Outside the hero: 160–220px blue glow with 24px backdrop blur; an 18px solid blue square replaces it over interactive controls.
- Keyboard, editable fields, touch, and reduced-motion retain the native cursor. Pointer layers do not intercept clicks. Ambient rendering pauses offscreen/when hidden.
- Opening choreography, production homepage, project content, and WorkSection layout are unchanged.

## Color audit

All new light colors use the existing prototype's OKLCH mechanism. Linear sRGB checks were calculated from their OKLCH values.

| File / declaration | Before | After | Reason |
| --- | --- | --- | --- |
| smoke-renderer.ts / whiteLight | None | `palette(.985,.008,235.)` | Requested near-white illumination, with a restrained cool tint that blends into the existing blue field. Within sRGB. |
| page.module.css / --pointer-blue | None; first draft `.67 .17 245` | `oklch(.67 .16 245)` | Draft had a negative linear red channel; reduced chroma while retaining hue/lightness to fit sRGB. |
| page.module.css / outsideGlow center | None; first draft `.67 .17 245 / .68` | `oklch(.67 .16 245 / .68)` at 0% | Same gamut correction as square, translucent for the glow. |
| page.module.css / outsideGlow middle | None | `oklch(.73 .14 240 / .4)` at 25% | Softer blue transition; within sRGB. |
| page.module.css / outsideGlow edge | None | `oklch(.8 .1 235 / .12)` at 48%, transparent at 70% | Lower chroma/opacity feathering without a hard circular edge; within sRGB. |

Existing ink/blue/sky/mist palette values were not changed in this iteration. No fixed black readability masks were added.

## Verification

- TypeScript: `npx tsc --noEmit` passed.
- ESLint: no errors; three existing warnings in unrelated files.
- Production build: passed, all routes generated. Existing multiple-lockfile warning remains.
- Browser: verified WebGL rendering, white illumination inside the dark region, blue outside glow with computed 24px blur, square hover with 18px size, and Tab restoring native cursor.
- 390px viewport: document width 390px, no horizontal overflow. Temporary viewport override reset.
- Browser error/warning log: empty at final check.
- Reduced-motion/touch behavior: inspected capability guards and CSS; not separately emulated in the browser during this iteration. No formal GPU/FPS benchmark performed.

## Rollback and follow-up

Changes are local to HeroExperience.tsx, smoke-renderer.ts, page.module.css, OutsideHeroPointer.tsx, and its CuratedHomepage.tsx mounting point. Remove the outside-pointer mount/component to undo the new external cursor independently. The `/previous` study remains untouched for comparison; it is not a pixel-identical snapshot of the preceding glow iteration. Do not reset or remove unrelated untracked work.

Owner to review speed/naturalness and cursor intensity. Current white text can cross light background regions; this pre-existing contrast tradeoff remains because the owner requested white typography and removal of fixed dark masks.

## Same-day follow-up — smaller hover glow and more transparent white light

This update supersedes the solid-square hover behavior recorded above. Owner explicitly rejected that square.

| Before | After |
| --- | --- |
| 18px solid square on interactive hover | Existing blue glow scales smoothly to 40% (64–88px), retaining its backdrop blur; square markup/styles and unused square color token removed. |
| White-light core/rim contribution `.76` / `.10` | `.52` / `.07`, about 31% less white contribution; underlying blue colors and blur footprint unchanged. |

The existing 160ms transform transition makes hover changes reversible without a layout change. Touch/reduced-motion/keyboard guards are unchanged. Browser verified `data-mode="hover"`, 88px rendered diameter at desktop size, retained `blur(24px)`, zero square elements, and the more transparent hero white light. TypeScript and production build passed again; ESLint still has only the same three unrelated warnings. Changed source files: OutsideHeroPointer.tsx, page.module.css, smoke-renderer.ts. Rollback for this follow-up is limited to these hover/white-contribution values; no production content or routes changed.

## Follow-up through 2026-09-10 — bookmark navigation and final pointer state

The owner's latest directions supersede the preceding cursor sizes and any intermediate transparent/crisp-edge cursor experiment:

- Outside the hero: feathered blue glow, 24px blur declaration. Full-size diameter is now 80–110px (half the preceding 160–220px); default scales to `.4` (32–44px), hover to `1` (80–110px). No square, transparent-only lens, or outline remains.
- Inside the hero: white-light shader contributions remain `.52` / `.07`, with the original 340–560px footprint and 32px blur declaration. A separate masked wrapper around the backdrop surface avoids the hard rectangular/circular boundary observed in this browser; the light color, strength, and ambient motion were not retuned.
- Header: sticky at top, 64px desktop / 60px narrow screens; background `#f2edde`. Text scales to 110% on fine-pointer hover without underline. The 320px layout tightens tab spacing and keeps the contact action as an accessible 44px icon link.
- Home's white-label bookmark and the hero show continuous portions of the same WebGL frame. The shader render extends above the hero; a tiny 2D canvas copies the corresponding region into Home. No independently colored gradient or second simulation is used. Rendering remains capped and pauses offscreen.
- Home's blue bookmark background is visible only in the Home section. On reaching Work it is hidden, retaining the plain Home navigation label. The short-lived always-visible Home experiment was explicitly reversed by the owner.
- Work's selected bookmark uses `4px 4px 10px rgb(0 0 0 / .1)` shadow. Outside Home, the header's bottom 8px uses the actual Work surface token, `--color-workspace-bg` (`#faf7f2`). Native section links and `aria-current="location"` are retained.
- Labels/URLs for this prototype header now reside in `content/prototypes/curated-home.json`. Formal homepage, project content, Work cards, and `/previous` are unchanged.

### Evidence and limits

- TypeScript and lint passed; lint still reports the same three unrelated warnings. Production builds passed during the final implementation sequence.
- Browser confirmed header top `0`, height `64`, hover text matrix `1.1`, no underline, requested header RGB `(242,237,222)`, exact Work shadow, and bottom-strip height `8px` / Work background RGB `(250,247,242)`.
- At the desktop test width, the final external pointer measured 44px default and 110px hover. Blue fill and 24px child blur were inspected. Inside the hero the external pointer was hidden and the white light remained active; final screenshot showed soft illumination without the earlier hard lens boundary.
- 320px review: document scroll width 320px, header 60px, all five navigation actions fit and retain at least 44px height. Home and hero meet at y=60 with aligned left edges. On scrolling, active section became Work, Home canvas visibility became hidden, and its label reverted to dark text. Temporary viewport override reset.
- Native browser annotations interfered with early checks; an isolated `?review=bookmark` URL was used for the final checks. No user annotation was removed. Reduced-motion and touch guards were source-reviewed, not independently media-emulated; no formal GPU/FPS benchmark was performed.
- Impeccable's detector was run once: advisory local color/type differences from DESIGN.md, not mechanical failures. User-specified prototype colors/sizes remain local, not global design tokens. DESIGN.md's sidecar was already stale and was not regenerated; no PRODUCT.md was added.

Rollback is scoped to BookmarkNavigation.tsx, its mounting point, the prototype navigation JSON, the Home crop additions in HeroExperience.tsx, and the corresponding local CSS/pointer wrapper. Do not delete or reset the unrelated untracked prototype work. Status remains Proposed / owner visual review; no commit or deployment.

## Navigation surface follow-up — 2026-09-10

Owner requested removal of the bottom 8px strip, reversing the Work shadow's vertical offset, and a slightly translucent/blurred navigation background. Removed the header `::after` strip; Work's selected shadow is now `4px -4px 10px rgb(0 0 0 / .1)`. The existing warm header color is now `rgb(242 237 222 / .85)` with 16px backdrop blur. Blur applies to the background, not the navigation text or Home's canvas. Changes are limited to page.module.css and the header's inline cross-browser backdrop declarations in BookmarkNavigation.tsx; heights, scroll switching, focus, hero, and pointer behavior are untouched.

TypeScript, lint (same three unrelated warnings), and production build passed. Browser computed styles confirmed the exact shadow, 85% background, 16px blur, and `::after` content `none`. Desktop header remains 64px; 390px mobile remains 60px, with document width 390px and no horizontal overflow. Desktop/mobile screenshots reviewed in one batch and viewport override reset. Rollback for this follow-up: restore the previous solid background, shadow Y=4, and optional 8px pseudo-element only. No production deployment or design-token migration.

### Slightly stronger navigation translucency

Owner clarified that only the navigation should become more transparent and blurred. Updated its background alpha from `.85` to `.75` and backdrop blur from 16px to 20px; no hero or pointer values changed. Browser confirmed `rgba(242,237,222,.75)`, `blur(20px)`, navigation text filter `none`, and unchanged 64px sticky header at top 0. TypeScript, lint (same three unrelated warnings), and build passed. This is a local two-value refinement; rollback is alpha `.85` / blur 16px in the same two files.

## Grouped bilingual navigation and scrolling entrances — 2026-09-10

Owner requested six navigation/surface annotations plus reveal animations for the current page. Scope remains the curated prototype, not production or the previous study. The existing hero opening, shared Home canvas, shadow, header translucency, and both pointer effects were preserved.

- Navigation content now reads Home / Work / Experiments / About Me as one left group. Languages sits separately at the right; its old mail action and diagonal arrow were replaced by the requested menu. About Me retains its existing destination; Experiments remains the existing shared English-only collection.
- Language menu exposes English and 中文 with a checkmark and Current / Switch to labels (localized in Chinese). Menu radio semantics, inert closed state, outside dismissal, direction keys, Enter, Escape, and focus restoration are implemented. Current language cannot be reselected. Native locale navigation preserves query/hash and uses a top/work hash when absent to avoid replaying the opening during a language switch.
- Added `/zh/proto/curated-home-v2` using the same server composition and existing localization dictionary, including localized project media and four Chinese case-study destinations. Root document language is set by the existing locale proxy; no production locale behavior was changed. New prototype-specific public labels live in the prototype JSON.
- Proposed responsive choice: <=560px uses a 104px two-row header. Languages is upper-right, and the full four-link bookmark group occupies the lower row so Home still meets the hero. Existing heights remain 64px above 700px and 60px for 561–700px. No label is hidden or truncated.
- Added a fixed 72px bottom viewport blur (+safe-area inset), progressively masked with 4/8/16px backdrop layers. The upper boundary diffuses naturally; the decoration is aria-hidden and pointer-events:none. Explicit standard/WebKit inline filter declarations avoid the CSS compilation issue observed in this browser.
- Work heading, introduction, four project cards, and final collection link gain one-time entrances. The only shared WorkSection change is optional data hooks behind `scrollEntrances=false` by default; production and previous renders retain their original behavior. Local IntersectionObserver enhancement marks only initially offscreen pieces, reveals and unobserves them, and cleans up on unmount. Motion uses 320ms opacity / 400ms eased short translation, with slightly more travel for project cards. Keyboard intent, focus, and reduced motion show content immediately; no new scrolling or React-per-frame loop was added. Default SSR/no-JS content remains visible.

### Verification and review status

- TypeScript, full lint, focused lint after the final Escape-handler change, and final production build passed (22 generated entries). Full lint retains the same three unrelated warnings; build retains the existing multiple-lockfile warning.
- Browser inspected desktop 1280px, 748px, and narrow 320px states. Final 320px document width is 320px; header is 104px and English tab widths are 64 / 44.18 / 88.26 / 71.65px with 52px height. Languages has a 44px touch height. Temporary viewport overrides were reset.
- English → Chinese → English was exercised, including direction-key selection and Enter. Query `?review=navigation` and `#work` survived; document language changed between en and zh-CN. All four Chinese project links were checked. Escape returned focus to Languages with aria-expanded=false and menu aria-hidden=true.
- Scrolling transitioned later project entries from pending to visible while later entries remained pending; already shown content did not get re-hidden. Bottom filters computed as blur(4px), blur(8px), blur(16px); screenshot confirmed feathered defocus at the lower screen edge. Reduced-motion/no-JS paths were source-reviewed, not separately emulated; no GPU benchmark or new test framework was introduced.
- Changed files: prototype JSON, BookmarkNavigation.tsx, CuratedHomepage.tsx, page.module.css, new ScrollEntrances.tsx, new Chinese prototype route, opt-in hooks in WorkSection.tsx, and this audit. No dependency, factual master, production homepage composition, commit, or deployment changed.

Status: Proposed visual tuning / awaiting owner review. Rollback is limited to this entry's language menu, Chinese prototype route, optional entrance hooks/controller, and bottom blur; restore the prior prototype JSON and header grouping without reverting earlier hero/pointer work. The canonical architecture and CURRENT_SYSTEM.md remain unchanged because this is still an isolated prototype.
