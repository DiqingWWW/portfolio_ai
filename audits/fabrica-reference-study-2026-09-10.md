# Fabrica reference study — completed implementation record

Status: Implementation complete; isolated Proposed route; owner adoption not recorded
Implementation snapshot: 2026-09-11
Verification completed: 2026-09-11
Base commit: `5b2441f` (`feat(brand): add v1.2 site icons`) plus uncommitted working-tree changes

## Decision state and scope

This record closes the implementation task; it does not record owner acceptance of the
reference study, promote its local visual values into the portfolio design language, or change
the accepted production homepage. The study remains available only at
`/proto/fabrica-study` and `/zh/proto/fabrica-study`. The existing
`/proto/curated-home-v2` route remains the comparison baseline and continues to render the
original lower `WorkSection`.

The owner-approved constraints and exceptions are preserved:

- The accepted hero is frozen. Its visuals, content, intro, smoke renderer, and pointer behavior
  are shared without a study-specific edit.
- Home, Work, Studies, Experiments, About Me, and Languages are available in the study navigation.
- The People/team section is removed. No team roster or unverified identity was introduced.
- Testimonial, metrics, and pricing structures remain explicit placeholders at the owner's
  request. They use dashes, `Content pending`, `Name and role pending`, and copy explaining that
  no verified quote, result, commercial offer, or price has been supplied.
- All study-specific colors, spacing, radii, type sizes, shadows, and motion values remain local
  Proposed scaffolding. They are not canonical tokens.

The hero freeze is recorded by SHA-1:

| Frozen source | SHA-1 |
|---|---|
| `src/app/proto/curated-home-v2/HeroExperience.tsx` | `8f2120f579b180bbcabf55b97eebee1087085848` |
| `src/app/proto/curated-home-v2/smoke-renderer.ts` | `97acba5af11763cc083d314913c97f46c8843be9` |

## Implemented composition

`CuratedHomepage` gates the post-hero composition with `referenceStudy`. The study branch
mounts `FabricaSections`; the baseline branch still mounts `WorkSection`. English and Chinese
route entries pass the same flag, with the Chinese route also passing `locale="zh"`.

The study composition is:

1. accepted hero in a study-only sticky foreground stage, with the discipline marquee at its lower edge;
2. four-project grid with unified cover-and-caption cards;
3. Studies chapter rendered as four factual project-study cards in a desktop two-column/mobile
   one-column grid;
4. capability accordion;
5. About Me process rail and selected-process media;
6. testimonial and metric placeholders plus approved profile statements;
7. featured Portfolio Operating System case-study panel;
8. pricing placeholder and selector;
9. FAQ;
10. experiments/project-insight links;
11. contact composer, direct contact path, and footer.

The navigation's Studies and About Me bookmarks target local study chapters. Its active state
progresses from Home to Work to Studies to About Me as those sections reach the header. All six
navigation titles use the same 14 px base size; hover and current-location states scale the label
to 110%, while the current-location state additionally uses 600 weight. Language switching
preserves the study route and the active chapter when no explicit hash is present.

## Content mapping

| Rendered material | Source and mapping |
|---|---|
| Accepted hero identity and statement | Existing profile/localized site content passed through the unchanged `HeroExperience` composition. |
| Study labels, explanatory copy, FAQ, contact labels, and all placeholder wording | `content/prototypes/fabrica-study.json`, with separate `en` and `zh` records. |
| Four project titles, years, descriptions, tokens, detail links, covers, hover media, galleries, and specs | Existing project records localized through `getLocalizedSiteContent`; Chinese `/work/...` links receive the `/zh` prefix. |
| Discipline marquee | Deduplicated tokens from the four localized project records, limited to eight labels and rendered in black at the hero's lower edge. |
| Capability accordion | First four approved profile skills, mapped to existing project descriptions, tokens, and media. The evidence mapping is Lincoln, Honda, Honda, and Portfolio Operating System. |
| Process rail | Four localized process labels paired in order with the four existing projects. |
| Selected-process media | Honda HMI animated gallery asset when available, otherwise its hover asset. |
| Featured case study | Portfolio Operating System project, with its current role/type, cover, first three specs, and existing detail route. |
| Profile philosophy and AI-thinking statements | Existing localized profile content; no new outcome claim is introduced. |
| Contact address and social links | Existing `content/navigation.json` landing-footer records. The form and direct-contact affordances resolve to the same configured email destination. |
| Experiments | Existing `/experiments` collection and two existing project records; no new experiment claim is created. |

Images continue through `ResponsiveProjectImage` and `resolveAsset`, preserving the current
project asset model and locale-aware selection behavior.

## Motion and interaction inventory

| Surface | Implemented behavior | Accessibility/reduced-motion behavior |
|---|---|---|
| Hero cover transition | A study-only 132 svh track holds the accepted hero still for the first 32 svh of page travel, then releases the sheet upward with scroll and hands the viewport to Work. | The wrapper never edits the hero renderer or its timing. Reduced motion removes the sticky track and renders the chapters in ordinary document flow. |
| Discipline marquee | Two copies of the discipline sequence form a continuous 26-second linear CSS loop at the hero's bottom edge, with black text and protected inset for the trailing copyright. | The duplicate loop group is hidden from assistive technology; reduced motion disables the animation. |
| Studies grid | Four existing localized projects supply each study card's progress mark, sequence, thumbnail, title, description, and route. The grid is two columns above 700 px and one column below. | Card links retain native keyboard behavior, visible focus, and factual content from the project records. |
| Masked title reveals | Section display titles translate upward from an overflow mask with the local expressive easing. | Titles remain fully present in the document; reduced motion removes the transform and transition. |
| Staggered entries | `IntersectionObserver` reveals marked blocks through opacity, vertical translation, and blur; repeated cards receive 70 ms index delays. | Content is visible before progressive enhancement, immediately revealed when observers are unavailable, and forced visible under reduced motion. |
| Scroll-linked media parallax | A request-animation-frame scroll/resize controller writes a clamped `--parallax` value to marked media. | The controller avoids React render loops; reduced motion removes the image transform and disconnects reveal observation when the preference changes. |
| Project hover/focus | Each project is one clipped card with the cover first and a flush white caption below. Fine-pointer hover scales the media, reveals the arrow, and expands the caption to reveal a one-line description. | Focus reveals the same detail; coarse-pointer devices show the description without requiring hover. Project number circles were removed. |
| Service accordion | One capability is open at a time. Fine-pointer entry or button activation selects it; Motion animates height and opacity. | Native buttons expose `aria-expanded` and `aria-controls`; decorative toggles and image fans are hidden from assistive technology; reduced motion suppresses the panel transition. |
| Process rail | Four cards form a desktop grid with staggered reveal and media parallax; mobile changes to a horizontal, touch-scrollable snap rail. | The mobile rail does not require hover or autoplay and remains ordinary scrollable content. |
| Pricing selector | Per-project/monthly buttons update the selected label and `aria-pressed` state while retaining an em dash instead of a fabricated price. | The control is a labeled button group and its body uses `aria-live="polite"`. |
| FAQ | Native `details`/`summary` disclosure opens each answer; the decorative plus rotates when open. | Keyboard and touch behavior remain native; the icon is `aria-hidden`. |
| Contact | Required name/email fields and native email validation feed a client-side `mailto:` composer; a direct configured email link remains available. | Labels are explicit, the submit control is a native button, no data is stored, and the visible note states the email-client behavior. |

## Verification evidence

### Static checks

- `npx tsc --noEmit`: passed on 2026-09-11 with exit code 0.
- `npm run lint`: passed on 2026-09-11 with 0 errors and 3 pre-existing warnings:
  unused generated `output/curated-view/content.js` content, the existing raw `<img>` in
  `HoverImage`, and the existing expression warning in the PDF capture helper.
- `npm run build`: passed on 2026-09-11 with exit code 0; compilation completed in 1449 ms,
  TypeScript completed in 2.1 s, and static generation completed for 24/24 pages, including
  `/proto/fabrica-study` and `/zh/proto/fabrica-study`. The build used the repository's
  existing `assets:prepare` prebuild and does not constitute a deployment.
- A final build retry after the last navigation/Studies refinements could not be started because
  the required network-escalation review was rejected when the Codex account reached its usage
  limit. Final source state still passed `npx tsc --noEmit`, full lint, focused lint, and
  `git diff --check`; this record does not claim a second post-refinement production build.

### Browser checks

- The English study route was manually reviewed at 657 x 834 at the top, during the hero handoff,
  at the Work anchor, and across the first two project cards.
- The hero remained the foreground layer during the transition and moved out without covering the
  Work heading at its final anchor position. The discipline track stayed on the hero's lower edge.
- Measured scroll positions confirmed the hero stayed at 60–808 px from scroll 0 through 150 px,
  began releasing after the 32 svh threshold, and moved to -93–655 px by scroll 420 px.
- The discipline text rendered black, and the copyright remained fully visible inside its protected
  right inset.
- The statement and Explore action rendered side-by-side, and the removed notice did not remain in
  the accessibility tree.
- All navigation controls measured 14 px. The active Work label measured a 1.1 transform and 600
  font weight; the document reported zero horizontal overflow.
- Project covers precede their flush caption surfaces, and no project-number marker remained.
- The Studies anchor was captured after a fresh reload: project-derived study cards rendered in a
  single column at the 657 px mobile breakpoint; source review confirmed the two-column rule above
  700 px. The active navigation state changed to Studies at the anchor.
- A project reveal was observed first mid-transition and then at its final visible state.
- The service accordion changed from the first item to the second item, and the FAQ opened with
  its answer visible.
- Document and body width matched the 657 px viewport, with no horizontal overflow.
- No completed image reported a failed load.
- People/team content was absent. The footer and the mobile-style horizontal process rail were
  both reached and inspected.
- The page contained 56 reveal nodes. A fast jump revealed only intersecting nodes, which is the
  controller's intended observer behavior rather than a failure.

These checks are bounded evidence, not a full visual-regression suite. A fresh runtime capture
was not available to the final independent source reviewer; reduced-motion behavior and the
remaining responsive/accessibility paths were reviewed in source rather than re-recorded in a
new browser session. Earlier headless desktop/mobile screenshots are not counted as a visual
pass because their deep-link hash placement was unreliable.

### Independent review

Independent review reported an About active-state gap, decorative capability disclosure icons,
inconsistent contact destinations, a registered-mark identity treatment, arbitrary capability
evidence mapping, duplicate service image keys, mobile long-title/footer overflow risk, and weak
small footer-label contrast. Those findings were fixed. The final independent pass confirmed
that the registered-mark treatment was removed; capability mappings matched the requested
projects; service image keys were unique; mobile project titles wrap; the footer identity stacks
without fixed horizontal overflow; footer-label contrast measured 6.10:1; and focused ESLint
passed. The reviewer treated the owner-approved testimonial/metrics/pricing placeholders as
non-blocking and returned disposition `pass`.

The final independent pass after the hero-threshold, ticker, Studies-grid, navigation-width, and
footer-hit-area changes returned `pass` with no actionable findings. It also reconfirmed the frozen
hero hashes and successful focused TypeScript, ESLint, and diff checks.

The earlier independent pass was source-level for responsive behavior because the local server had
stopped before its attempted browser re-verification. It therefore does not establish exact
pixel or animation fidelity to the external reference.

## Open review state

The implementation task is complete, but the route remains Proposed. Exact reference fidelity,
adopt/iterate/reject, and any promotion of the study into a production route require owner
review. No deployment or production smoke test was performed, and no owner acceptance is
claimed here.

`CURRENT_SYSTEM.md` remains unchanged because it records the accepted, deployed V1.2 product.
An isolated, unaccepted prototype route does not materially change that production description.

## Rollback

The accepted hero and lower baseline were retained. To withdraw the study, remove the English
and Chinese `fabrica-study` route entries and the study-only component/content/style files, then
remove the `referenceStudy` branches from `CuratedHomepage` and `BookmarkNavigation`. The
baseline `/proto/curated-home-v2` `WorkSection`, production homepage, project records, case-study
routes, and accepted hero remain available throughout rollback.
