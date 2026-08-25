# V1.2 bilingual content parity checklist

Status: Complete — local parity, owner review, and production release checks passed

This checklist verifies the publishing chain without treating localized modules as factual masters:

```text
factual master → selection record → case-study.zh.ts → case-study.en.ts → project TSX
```

## Honda HMI Design System

| Check | Status | Evidence / next action |
|---|---|---|
| Current master synchronized to selection | Pass | `source-manifest.json` hash matches `content-parity.lock.json`. |
| Selection IDs mapped to Chinese TS | Pass | Automated check confirms every reference exists. |
| Chinese and English source-ID sequence | Pass | Both modules contain the same 59 ordered references. |
| Mindmap source | Pass | Both modules use synchronized `unit-031`. |
| Evidence wording | Pass | Owner reviewed the final local Chinese and English pages. |
| Locale images | Pass | Chinese module has no `_EN` references; English module has no `_CN` references. |
| Public TODO markers | Pass | No `TODO` marker remains in either localized module. |
| Chinese route and metadata | Pass | `/zh/work/honda-hmi-design-system`, document language, canonical and alternates verified locally. |
| Mobile and desktop presentation | Pass | Recorded issues were addressed and the owner completed final page review. |
| Owner visual acceptance | Pass | Owner confirmed completion of all current webpage checks. |

Run:

```text
npm run content:check -- honda-hmi-design-system
```

If `content:sync` changes the master hash, this check intentionally fails until the new selection,
both localized modules, and the TSX composition are reconciled. Do not update the lock merely to
silence the failure.

## Lincoln Text Expression

Status: Pass in production. Chinese and English narratives render through one project composition;
source-linked content, evidence boundaries, compact phone imagery, locale metadata, and `/zh` route
were reviewed by the owner.

## Portfolio Operating System

Status: Pass in production. Both locales use the accepted three-act composition. Internal `truthStatus`
values remain in structured content but are no longer rendered as public caption prefixes.

## Rubik Studio

Status: Pass in production. Rubik remains visual-only; English uses `_EN`, Chinese uses `_CN`, both have
direct routes, metadata alternates, and no invented narrative content.

## Global release checks

- [x] Every published Chinese route has a matching English alternate.
- [x] Switching language preserves the current project when the localized route exists.
- [x] No localized page mixes paired `_CN` and `_EN` assets.
- [x] No public page exposes `TODO`, internal truth status, provenance, or asset-management notes.
- [x] Chinese and English metadata, alt text, captions, table labels, diagram labels, and ARIA text match the page locale.
- [x] Mobile and desktop owner review is complete.
- [x] Lint, type check, and production build pass after local integration.
- [x] Production smoke tests pass after an authorized deployment. Eleven public routes and
  representative localized assets returned HTTP 200 at `https://www.deethin.site` for release
  commit `be534f5` on 2026-08-25.
