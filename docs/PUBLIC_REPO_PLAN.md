# Plan: Making the Repo Public (Professional, No UI Changes)

This document outlines changes to make the codebase ready for a public GitHub repo while keeping the UI unchanged. The live site remains at **kinetsolutions.dev**.

---

## 1. Security & secrets (required)

| Item | Location | Action |
|------|----------|--------|
| **Private email in code** | `api/contact.ts` line 29 | Move `to: 'amareytesfa@gmail.com'` to an env var (e.g. `CONTACT_EMAIL_TO`). Use it in the handler and document in README. |
| **Env file safety** | `.gitignore` | Add `.env`, `.env.local`, `.env.*.local` so secrets are never committed. |
| **Setup guide** | New file | Add `.env.example` with placeholders: `RESEND_API_KEY=`, `CONTACT_EMAIL_TO=` (and optionally `CONTACT_EMAIL_FROM=` if you make the “from” configurable). |

---

## 2. Internal / staging URLs (recommended)

| Item | Location | Action |
|------|----------|--------|
| **Lovable staging URL** | `public/sitemap.xml` line 4 | Replace `https://kinet.lovable.app/` with `https://kinetsolutions.dev/`. |
| **Lovable staging URL** | `public/robots.txt` line 17 | Replace `https://kinet.lovable.app/sitemap.xml` with `https://kinetsolutions.dev/sitemap.xml`. |

Optional: make `api/contact.ts` `from: 'contact@kinetsolutions.dev'` configurable via env (e.g. `CONTACT_EMAIL_FROM`) so forks can use their own domain. Not required for professionalism.

---

## 3. Documentation (recommended)

| Item | Location | Action |
|------|----------|--------|
| **README** | `README.md` | Add an **Environment variables** section listing `RESEND_API_KEY`, `CONTACT_EMAIL_TO` (and any optional vars). Note that the contact form uses `/api/contact` (e.g. Vercel serverless) and requires Resend + these vars. |
| **License** | Repo root | Add a `LICENSE` file. Choose either: **proprietary** (e.g. “All Rights Reserved” / custom) to match “All rights reserved © Kinet”, or **open source** (e.g. MIT) and adjust README footer if needed. |

---

## 4. Optional polish

| Item | Location | Action |
|------|----------|--------|
| **Package name** | `package.json` | Consider renaming `"vite_react_shadcn_ts"` to e.g. `"kinet"` or `"kinet-website"` for a clearer public profile. |

---

## 5. What not to change

- **UI / design** – No visual or layout changes.
- **Footer links** – Personal email/social links in `Footer.tsx` are already public on the site; moving them to config is optional only if you want the default clone to be generic.
- **Comments** – No unprofessional or sensitive comments were found; no cleanup needed.

---

## Checklist (implementation order)

- [x] Update `.gitignore`: add `.env`, `.env.local`, `.env.*.local`
- [x] Add `.env.example` with `RESEND_API_KEY`, `CONTACT_EMAIL_TO` (and optional vars if used)
- [x] In `api/contact.ts`: read `to` (and optionally `from`) from env; remove hardcoded email
- [x] In `public/sitemap.xml`: replace Lovable URL with `https://kinetsolutions.dev/`
- [x] In `public/robots.txt`: replace Lovable sitemap URL with `https://kinetsolutions.dev/sitemap.xml`
- [x] Update `README.md`: add Environment variables section and contact API note
- [x] Add `LICENSE` file (proprietary or OSS)
- [x] (Optional) Rename package in `package.json` to `kinet` or `kinet-website`
- [ ] Ensure production (e.g. Vercel) has `RESEND_API_KEY` and `CONTACT_EMAIL_TO` set before/after going public

After these steps, the repo is ready to make public without changing the UI.
