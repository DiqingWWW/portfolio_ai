# Product and Delivery Plans

This directory contains time-bounded product plans, sprint plans, launch plans, and PRD-like
delivery documents.

## Document roles

| Document | Purpose | Update policy |
|---|---|---|
| `SPRINT_<release>_<goal>.md` | Short delivery sprint with dates, scope, tasks, and acceptance criteria | Update status in place during the sprint; preserve after completion |
| `MIGRATION_PLAN_<version>.md` | Temporary plan for a material architecture, data, or platform migration | Update in place until complete, then archive |
| `PRD_<feature>.md` | Product requirements for a substantial feature that needs its own discovery and acceptance criteria | Create only when feature complexity justifies it |

Do not create a new numbered file for every small edit. Create a new version when the goal,
scope, target release, or approved direction materially changes. Git history records normal
revisions within one plan.

## Active plans

- [V0.2 three-day launch sprint](./SPRINT_v0.2_launch.md)
