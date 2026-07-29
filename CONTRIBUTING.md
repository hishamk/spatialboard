# Contributing to SpatialBoard

Thanks for your interest in contributing.

## Development Setup

Requirements:

- Node.js 20+
- npm 10+

From `spatialboard/`:

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
```

## Project Layout

- `src/` - library source
- `examples/dev-app/` - local development playground
- `dist/` - build output
- `sbd-spec.md` - file format spec

## Pull Request Guidelines

1. Open an issue for major changes before starting large work.
2. Keep PRs focused and scoped.
3. Include rationale in the PR description.
4. Update docs when behavior or API changes.
5. Ensure `npm run build` succeeds before submitting.

## Commit Messages

Use clear, concise commit messages that explain intent and impact.

Examples:

- `feat: add frame snapping behavior`
- `fix: prevent duplicate node IDs in import flow`
- `docs: clarify custom node registration`

## Reporting Bugs

When filing bugs, include:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Browser/OS details
- Minimal repro if possible

## Code Style

- Keep TypeScript types explicit where meaningful.
- Prefer small, composable functions.
- Avoid broad refactors in feature PRs unless discussed first.

## Questions

If anything is unclear, open an issue and label it as a question/discussion.
