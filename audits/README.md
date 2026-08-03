# Engineering Audits

This directory stores version-specific engineering reviews of the portfolio repository.
These files are internal project documentation: they are not imported by the Next.js
application, copied into `public/`, or exposed as website routes.

## Naming convention

Use one Markdown file per audited snapshot:

```text
engineering-audit-v<version>-<YYYY-MM-DD>.md
```

Each audit should record the commit and whether the working tree contained additional
changes. This keeps an audit tied to the code that was actually reviewed, even when the
marketing version and `package.json` version are not synchronized.

## Audits

- [V0.2 working snapshot — 2026-08-01](./engineering-audit-v0.2-2026-08-01.md)
