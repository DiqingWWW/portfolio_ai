@AGENTS.md

# Diff Sync Principle

This project follows a strict separation of responsibilities:

* Google AI Studio = UI exploration and visual iteration.
* Claude Code = architecture, engineering, maintainability, and implementation.

## Rules

1. Keep the current project architecture as the source of truth.
2. Never replace the project structure with AI Studio output.
3. Treat AI Studio code as a visual reference, not an architectural reference.
4. All visual updates should be merged into the existing architecture.
5. Keep the project data-driven (`design_spec.json`, `nodes.json`).
6. Prefer semantic merge over file replacement.
7. Explain every modified file after each synchronization.
