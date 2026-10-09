# Figma ↔ code component reconciliation

Date: 2026-10-07 · Status: local identity mapping; publication and parity review incomplete.

## Outcome

Read the four pages in the connected Portfolio Website file and compared component names,
variant/property APIs, and affected code. The AST scan found 110 exported TSX entries, including
routes, prototypes and legacy duplicates—not 110 design-system components. The Figma scan found
123 component/set nodes, representing 22 families after excluding individual variants.

The current V2 page has 16 families: 11 sets and five standalone components. Only its Project Card
has an identified standalone shared React export. The other 15 are inline JSX/CSS recipes,
internal pieces, or unverified/legacy presentations. A page containing a specimen is not the
specimen's reusable component export.

Six qualified design names now have explicit local Figwright path overrides, covering four code
targets. Three Draft Button size sets share one `Button`; Draft Text Field, Draft compound Card,
and V2 Project Card each have their own target. These are identity correspondences, not approval of
their visual equivalence. The existing executable Draft registry was not promoted or rebound.

## Verified identities and gaps

| Figma identity | Code export | Mapping limits |
| --- | --- | --- |
| Draft Button Small / Medium / Large | Button | Label/variant/size translate to existing props; only disabled is a state prop. Small horizontal padding differs; no visual parity claim. |
| Draft Text Field | TextField | Label/value/description/error/disabled have counterparts. Browser focus and controlled-input behavior need separate review. |
| Draft Surface Card | Card + compound exports | Text maps to subcomponent children; media/footer are conditional composition. Width is not a Card prop. |
| V2 Project Card | ProjectCard | Shared by homepage and catalogue. Body title is nested; size is responsive CSS; real reveal behavior remains hover/focus/touch. Metadata color differs from the inspected Figma binding. |

The machine-readable snapshot lists all 22 families, prop definitions, node IDs, code owners,
explicit gaps, the broader code inventory, and nine direct-code hash baselines. It does not record
a resolved transitive token-value baseline or claim to detect live Figma changes offline.

## Unsafe automatic matches rejected

Figwright's fuzzy matcher proposed Draft `Button` for `V2/Action/Button` and Draft `Card` for
`V2/Card/Project Body` at high confidence. It proposed `AIContent` for `V2/Content/Tag` at low
confidence. None is a valid reuse relationship. Name similarity cannot establish matching APIs,
tokens or component boundaries. They remain unbound in the snapshot; future agents must not
accept these fuzzy candidates without review.

V2 Button's runtime inverse appearance has no equivalent Figma Appearance value. Project Body
and Tag exist inside ProjectCard rather than as independent exports. Gallery Card is inline
presentation, not GalleryControls. Section Heading has distinct homepage and case-study owners.
Evidence Card correspondence is not established, and Artifact Card is not used by the current
CandidatePage. Extracting these into shared components is a separate scoped implementation task.

Code-side candidates with no corresponding family in the scanned file include SiteFooter,
AIToolsSection, BookmarkNavigation, ServiceAccordion, LiveLaptopPreview, and Draft Disclosure.
This is not a claim that no equivalent could exist in a different Figma file.

## Publication limits

The owner supplied the file URL on 2026-10-07, confirming file key `RXVtk9IUr6z8nwfm1sq1MU`.
The active plugin file name and selected node corroborate that identity. Selected node `291:341`
is the `Wide / Inverse` variant of `V2/Card/Gallery`, parent set `291:346`. The snapshot now records
the confirmed file key for all inspected families; the plugin still does not return it independently.

The official Figma Code Connect read hit the account tool-call limit. The account plan response
did not establish Organization/Enterprise eligibility, and component library publication status
could not be verified. Following the Code Connect skill, no template was created or mapping
published, and no dependency or plan was changed. Before official publication, confirm
component/API matches, published-library status, and eligible access. These conditions apply to
official Code Connect, not to the existing local Figwright identity map. Unpublished local
components can be inspected and linked by node ID without official MCP calls. The published map
and a background two-way synchronization service are not prerequisites for local reconciliation.

## Future synchronization: proposed workflow, not enabled

[Code Connect](https://developers.figma.com/docs/code-connect/) supplies component identity,
property translations and code context. Its documented role should not be interpreted as a
real-time bidirectional file-overwrite service. This interpretation also follows the repository's
canonical design-system contract, which requires scoped, reviewed changes.

A project-specific bridge could implement this sequence after owner approval:

1. Re-read the mapped Figma node API, layout, bindings and code API from confirmed identities.
2. Compare each side against the last verified baseline and show the affected props/tokens/states.
3. If both sides changed, stop for conflict resolution. If one changed, prepare a scoped patch for
   the other; preserve unrelated code and design assets.
4. Obtain approval, apply the patch, then check types/tests and representative visual states.
5. Verify that an existing Figma component is reused, then update both baselines together.

Token values and explicit variants are better first targets than whole layouts. Runtime behavior,
accessibility, responsive rules and interaction choreography are not lossless Figma round-trips.
Do not run competing auto-writers or use a page screenshot as a component API. No background
watcher, automatic mutation, Figma generation, library publishing, or production adoption was
enabled by this audit.

## Verification and rollback

Run `node scripts/check-figma-component-map.mjs` for local path/export/table/hash checks. Its
`--figma=` and `--code=` selectors support read-only lookup in either direction. This is lookup
verification, not proof of code-driven Figma generation or pixel parity.

Results recorded in this run:

- Local checker passed: six identity rows, four code targets, 22 families and nine unchanged direct
  source hashes. Lookup by `288:333` and by ProjectCard/Button code paths passed.
- Unknown arguments and missing-node lookup correctly returned exit code 2.
- Figwright `component_map` on the real Draft Button instance `35:391` returned `source: map-file`,
  resolved set `27:268`, and selected the correct Button source. Its unmatched Label and State
  axes are accounted for explicitly in the property notes; this is not automatic prop parity.
- `npm run lint` passed with three existing warnings in unrelated files; the new script's focused
  lint check passed. `npx tsc --noEmit` passed.
- The existing Next preview listener on port 3001 belongs to this repository. The exact review
  route `/proto/portfolio-ai-case-study` returned HTTP 200 with the candidate marker and quality
  chapter. It was reused without restart.
- No production build was run: this task adds documentation/data and a read-only utility, with no
  imported application changes. A build was also not run concurrently with the active dev server.
- No new visual-parity or code-to-Figma generation test is claimed.

Task files are confined to the local map, dated audit/snapshot, and read-only check script. No
application component, visual style, token, Figma node or canonical rule was edited. Rollback is
limited to removing those four newly created files; existing repository work remains untouched.
