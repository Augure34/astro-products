---
name: maintain-product-list
description: >-
  Adds, updates, or deletes products for the astro-products site: JSON under
  products/{category}/, WebP assets under public/products/, image optimization
  to match existing site images, and optional manual (notice) URLs. Use when the
  user asks to add, update, remove, or maintain a product, product list, rental
  item, image, or catalogue entry.
---

# Maintain product list

## Prompter-provided inputs (verbatim)

The "notice" link, product informations, price and raw picture will be provided by the prompter. The rest is up to you to generate/suggest but you should look at existing products.

**Map to the codebase**

- **Notice link** → `manual` in JSON (must be a valid URL; shown as « Ma notice »).
- **Product informations** → `name`, `description`, and when applicable `manufacturer`, `model`, `batteryType` (and any other optional fields that match siblings).
- **Price** → `price.daily` and `price.weekly` (numbers in euros). If only one rate is given, infer the other from **existing products** (often `weekly ≈ 4 × daily`).
- **Raw picture** → optimize and save as WebP; reference with `image` (see below).

## Before editing

1. Read `src/content.config.ts` for the canonical Zod schema.
2. Open **two or three JSON files** in the same target category (and one from another category if needed) to match **tone, description length, and field usage** (French copy, similar structure).
3. Confirm **route id**: the content entry `id` is the JSON filename **without** `.json`. It must be **unique across all** `products/*/` folders (reservation pages use `/{id}`).

## Category → folder → collection

| UI label (section) | Folder under `products/` | Astro collection id |
|--------------------|---------------------------|----------------------|
| Divers             | `Divers/`                 | `divers`             |
| Jardinage          | `Jardinage/`              | `jardinage`          |
| Nettoyage          | `Nettoyage/`              | `nettoyage`          |
| Menuiserie         | `Menuiserie/`             | `menuiserie`         |
| Bricolage          | `Bricolage/`              | `bricolage`          |

New file path: `products/{Folder}/{slug}.json` where `{slug}` is the chosen id (e.g. kebab-case, ASCII).

## JSON shape (required fields)

Match validated fields only unless you intentionally extend `src/content.config.ts`:

- `name` (string)
- `description` (string)
- `price`: `{ "daily": number, "weekly": number }`
- `image` (string, optional in schema but **always set** for listings): public URL path, typically `"/products/{slug}.webp"`
- Optional: `manufacturer`, `model`, `batteryType`, `tags`, `manual`

Use double numbers for prices (e.g. `8.00`) when that matches neighbors. Omit `manual` only if there is no notice URL.

Some repo JSON files still contain extra keys (e.g. `Type`, `Caution`); they are **not** in the schema and are **not** used by `src/`. Do not add them unless the user asks to extend the schema and UI.

## Image optimization

**Display contract** (see `src/components/landing/Products.astro`): `<Image … width={400} height={300} class="… aspect-[4/3] object-cover" />` — assets should read well at **4:3**, cover crop, WebP.

**Storage**: `public/products/{basename}.webp` (repo may not ship binaries; create the folder if missing). **`image`** in JSON must be `"/products/{basename}.webp"` (leading slash, matches existing entries).

**Baseline from existing files** (when `public/products/*.webp` exists locally): inspect a few peers with the shell (file size, dimensions). Aim for similar **order of magnitude** file size and **max edge** length (typical web targets: long edge ~**800–1200px** at 4:3 unless peers suggest otherwise).

**If no peer WebP files are available**: export **WebP**, **4:3** (crop or pad to match `object-cover` behavior — prefer centered crop), long edge ~**1000px**, quality around **80–85**, sRGB.

**Tools** (pick what works in the environment; prefer repeatable CLI): `npx`/`sharp`, ImageMagick, `ffmpeg`, or another lossy WebP encoder. The raw asset may be deleted after a successful WebP is in `public/products/`.

**Cache busting**: `VersionHash` in `src/components/global/cacheBuster.ts` is an **application-wide** cache token (same query param on favicons, logos, product images, cookie banner image, etc. via `ToCacheBustable`). Bump it only when you intentionally ship a new app version and want clients to refresh cached static assets — **not** per product image.

## Operations

### Add product

- [ ] Choose category folder and unique `slug`.
- [ ] Write `products/{Folder}/{slug}.json` using prompter data + fields inferred from neighbors.
- [ ] Optimize raw picture → `public/products/{slug}.webp` (or align `image` path and filename with repo naming if a different basename is already chosen — stay consistent).
- [ ] Run `npm run build` (or `npx astro check`) and fix schema/type issues.

### Update product

- [ ] Edit the correct `products/{Folder}/{slug}.json`.
- [ ] If the picture changes: re-export WebP and replace the file (filename may stay the same; rely on app `VersionHash` bumps only when you release a new site version).
- [ ] If `slug` or folder changes: treat as remove + add (update all references; avoid breaking `/[item]` routes).

### Delete product

- [ ] Remove `products/{Folder}/{slug}.json`.
- [ ] Remove `public/products/{slug}.webp` when it is no longer referenced (grep `products/` for the filename).
- [ ] Rebuild to ensure no stale references.

## Quality checks

- Grep for the slug and image basename to avoid duplicates or orphans.
- Keep copy and formatting consistent with neighboring products.
- `manual` must satisfy `z.string().url()` when present.
