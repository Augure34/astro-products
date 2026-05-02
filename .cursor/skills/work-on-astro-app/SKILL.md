---
name: work-on-astro-app
description: >-
  Session workflow for the astro-products Astro site: asks for a new
  cache-bust VersionHash, runs npm update, and verifies build plus lint
  (astro check). Use when implementing features, fixing bugs, refactoring,
  editing site code, or any substantive work on this repository’s app.
---

# Work on astro-products app

Apply this skill **at the start** of a work session whenever you are changing this codebase in a meaningful way (not for trivial one-line typo fixes unless the user asks).

## 1. Cache-bust keyword

Ask the user verbatim:

> What **keyword** should we use for **`VersionHash`** in cache busting (`src/components/global/cacheBuster.ts`)? (Short string, e.g. release name or date.)

- If they give a value: set `VersionHash` in `src/components/global/cacheBuster.ts` to that string (same quoting style as the file).
- If they say to **skip**, **keep**, or **leave unchanged**: do **not** edit `cacheBuster.ts`.

## 2. Dependencies

From the repository root, run:

```bash
npm update
```

## 3. Build

Run:

```bash
npm run build
```

Fix any errors until the build succeeds.

## 4. Lint / static check

Run:

```bash
npm run lint
```

(`astro check` — TypeScript and Astro diagnostics.)

Address reported errors. For warnings, fix when reasonable for the touched code; note any intentional suppressions or follow-ups for the user.

## Order

Follow steps **1 → 4** in order unless the user explicitly narrows scope (e.g. “only fix the build”).
