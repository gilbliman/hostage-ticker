## Quick context

This repo is a tiny Vite + TypeScript project that builds a self-contained "hostages ticker" widget
designed to be embedded on other sites. The widget is authored in `src/main.ts` as an IIFE that
injects and controls a single DOM element with id `bthn`.

Key files:

- `src/main.ts` — the entire widget (styles, strings, SVGs, injection logic, timer). Primary place to change visuals/behavior.
- `index.html` — local test harness and examples showing various classes/attributes (`bthn-banner`, `bthn-mako`, `lang`, `not-clickable`, `btnh-disable-on-mobile-param`).
- `package.json` — dev scripts: `npm run dev` (vite), `npm run build` (runs `tsc` then `vite build`), `npm run preview`.
- `readme.md` — integration guide: after `npm run build` upload `dist/assets/index-HASH.js` to your CDN.

## Architecture & why

- The widget is intentionally a single-file, immediately-invoked script (IIFE) so it can be copied/hosted on a CDN and dropped into arbitrary pages without module loaders.
- Build step runs `tsc` to catch TypeScript errors, then `vite build` to produce a distributable bundle (hashed asset placed under `dist/assets`).
- Locale and layout are controlled by the host element attributes/classes: `lang="he"` switches strings and some layout; RTL is handled by switching `left`/`right` in CSS in the injected styles.

## Project-specific patterns to preserve

- Keep the IIFE pattern in `src/main.ts` — it ensures the widget executes immediately in global pages.
- All DOM targets are under `#bthn`. Changing that id requires updating `index.html` examples and any external embed snippets.
- Copyable embed snippet in `index.html` demonstrates integrity and crossorigin attributes; keep those if changing the CDN output.
- Session persistence: the widget sets sessionStorage key `btnhSessionClosed` when user closes the widget — tests or changes that affect closing should respect this key.

## Useful knobs & examples (concrete)

- Local dev: run `npm run dev` and open the app (Vite defaults to http://localhost:5173). Use `index.html` to test variations.
- Build for CDN: `npm run build` → upload `dist/assets/index-HASH.js` to your CDN; `readme.md` documents this flow.
- Test Hebrew widget: add `<div id="bthn" lang="he"></div>` to `index.html` (already present).
- Make widget non-clickable: add attribute `not-clickable="true"` on `#bthn` (the code checks for this attribute).
- Disable on mobile: add class `btnh-disable-on-mobile-param` and use query param `?mobile=1` to force disable in dev.

## Important identifiers & constants

- `counterStart` (in `src/main.ts`) — epoch used to compute the ticker elapsed time. Changing this changes the timer.
- `#bthn`, `#bthnLink`, `#closeBthn`, `#bthnTimeBlocks` — DOM ids used throughout; keep names stable when refactoring.
- sessionStorage key: `btnhSessionClosed`.

## Tests / CI / debugging

- There are no unit tests or CI config in the repo. Use `npm run dev` to iterate locally and `npm run build` to test production bundling.
- For quick debugging, open the browser console while running the local dev server and inspect the injected `#bthn` element and the `tickerInterval` timer.

## When editing, be conservative

- Preserve the widget's external API (embedding via single script + `#bthn`) unless you also update README and the CDN embed snippet.
- Keep the visual strings and SVGs located in `src/main.ts` (they're inlined for portability). If extracting them, keep backwards-compatible output.

---

If anything here is unclear or you'd like more detail (for example, a recommended bundling change that outputs a UMD wrapper for older pages), tell me which area and I'll iterate.
