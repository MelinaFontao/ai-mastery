# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

AI Mastery is a gamified educational PWA (Progressive Web App) about AI topics. It is a **zero-build, pure HTML/CSS/JS** project — no npm, no framework, no bundler. Files are served directly as static assets, deployed via GitHub Pages.

## Development

**Serve locally:**
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Service Worker registration requires HTTP (not `file://`), so use a local server rather than opening `index.html` directly. The SW caches all module files on first visit for offline use.

**Deploy:** push to GitHub, enable GitHub Pages from the `main` branch root.

**Update the SW cache:** bump the `CACHE` constant in `sw.js` (e.g. `ai-mastery-v1` → `ai-mastery-v2`) whenever new module files are added, so clients pick up the change.

## Architecture

### Hub (`index.html`)
Single-page app with two views (`#view-hub` / `#view-mod`) toggled via CSS classes. The hub reads all module progress from `localStorage` and renders module cards, XP totals, and the level progress bar. Modules open inside a full-screen `<iframe>` — this is intentional so each module is fully isolated.

Progress polling: `renderHub()` is called on load and every 15 seconds so XP updates automatically when returning from a module.

### Modules (`modules/*.html`)
Each module is a self-contained HTML file with five screens (implemented as CSS-toggled `.scr` divs):
- `s-home` — game list with level progress
- `s-theory` — theory card shown before each level
- `s-game` — active mini-game
- `s-win` / `s-fail` — result screens

Each module persists state to `localStorage` under a key like `aim_m1a`, `aim_m2a`, etc. The stored object shape is:
```js
{ xp: number, progress: { [gameId]: { [levelNum]: "done" | "inprog" } } }
```

The hub reads this same `localStorage` to compute total XP and completion status.

### Game types
Modules contain five game types rendered in `s-game`: **Quiz** (multiple choice), **Fill** (fill-in-the-blank with word bank), **Order** (drag-and-drop ordering), **VF** (true/false), **Build** (construct a concept). All game logic is inline JS within each module file — there is no shared game library.

### localStorage key convention
- Hub/global state: no key (computed on the fly from module keys)
- Per-module: `aim_<module_id>` (e.g. `aim_m1a`, `aim_m2a`, `aim_claude_mod`)
- Install banner dismissed flag: `sessionStorage` key `install-dismissed`

### CSS variables (color system)
Defined per-file in `:root`. The accent color (`--ac`) changes per module to give each a distinct visual identity. The index.html hub uses purple (`#7F77DD`) as its accent.

## Adding a new module

1. Create `modules/mXy.html` following the structure of an existing module (copy `m1a.html` as a template).
2. Add the new file path to the `FILES` array in `sw.js`.
3. Add the module entry to the `MODS` array in `index.html`, including `key`, `file`, `maxLv`, and `maxXp` for each part.
4. Add the module id to the relevant section in the `SECTIONS` array in `index.html`.
5. Bump the SW cache version in `sw.js`.
