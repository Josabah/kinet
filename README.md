# Kinet

Design and engineering for founders who care about getting it right the first time.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- shadcn/ui

## Getting Started

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── api/
│   └── contact.ts          # Vercel serverless handler (contact form)
├── public/                 # Static assets (sitemap, robots, favicon, OG image)
├── src/
│   ├── components/         # Feature components (Header, Hero, Services, etc.)
│   │   └── ui/             # shadcn/ui primitives
│   ├── pages/              # Route pages (Index, NotFound)
│   ├── data/               # Shared content (e.g. FAQs for SEO)
│   ├── hooks/              # React hooks (use-toast, use-mobile)
│   ├── lib/                # Utilities (e.g. cn, JSON-LD helpers)
│   ├── assets/             # Images and static assets
│   ├── test/               # Vitest setup
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Global styles
├── index.html
├── vercel.json             # SPA rewrites for client-side routing
└── .env.example            # Env var template (copy to .env)
```

## Environment Variables

The contact form uses a Vercel serverless API and [Resend](https://resend.com) to send emails. Set these in your deployment environment (and in a local `.env` when using `vercel dev`; `.env` is gitignored):

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key for sending email |
| `CONTACT_EMAIL_TO` | No | Inbox for submissions (default: `contact@kinetsolutions.dev`) |
| `CONTACT_EMAIL_FROM` | No | Sender address (default: `contact@kinetsolutions.dev`) |

Copy `.env.example` to `.env` and fill in the values. Never commit `.env`.

## Deployment (Vercel + GitHub)

This app is built with **Vite** and deployed on **Vercel** from the GitHub repository.

- **Build**: `npm run build` outputs to `dist` (Vercel detects Vite by default).
- **SPA routing**: [`vercel.json`](vercel.json) rewrites unknown paths to `index.html` so client routes (for example `/services`, `/contact`) work on refresh and deep links.
- **Contact API**: [`api/contact.ts`](api/contact.ts) is a Vercel serverless function. Set **`RESEND_API_KEY`** in Vercel; override **`CONTACT_EMAIL_TO`** / **`CONTACT_EMAIL_FROM`** if you need a custom inbox or sender. Ensure your Resend domain and sender address are verified.

To exercise the contact form **locally** with the API, use the Vercel CLI so `/api/contact` is available (plain `npm run dev` serves only the frontend):

```sh
npm run build   # optional sanity check
vercel dev
```

After pushing to GitHub, Vercel redeploys the connected branch automatically.

## License

All rights reserved © Kinet
