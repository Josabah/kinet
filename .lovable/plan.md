
## Fix: Browser Tab Shows Lovable Logo & "Lovable App"

**The Problem**

Two things control what appears in the browser tab:
1. **Title** — `index.html` already says `Kinet | AI-Driven Product Studio` (correct)
2. **Favicon** — `public/favicon.ico` is still the Lovable heart icon (this is what you're seeing)

The "Lovable App" text you see in the tab is likely from a cached/preview version — once the favicon is fixed and the page is republished, the correct title will show too.

There is also a `lovable-logo.ico` file sitting in `src/assets/` which needs to be removed.

---

**What Will Be Done**

1. **Create a Kinet "K" favicon** — Design a clean SVG favicon with a bold letter "K" on a dark background matching the Kinet brand, saved as `public/favicon.svg`

2. **Update `index.html`** — Point the favicon links to the new `favicon.svg` instead of the old `favicon.ico`:
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
   ```

3. **Remove `src/assets/lovable-logo.ico`** — This file has no place in the Kinet codebase

**What the "K" favicon will look like:**
- Dark navy/black square background (matching Kinet's dark brand)
- Bold white "K" letter, clean and minimal
- SVG format (sharp at all sizes, supported by all modern browsers)

After this change, the browser tab will show a "K" icon and the title "Kinet | AI-Driven Product Studio".
