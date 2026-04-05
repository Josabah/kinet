# Kinet - AI-Driven Product Studio

An AI-driven product studio that builds MVPs, full-scale applications, and custom AI solutions.

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
src/
├── components/     # UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── assets/         # Static assets
└── index.css       # Global styles
```

## Deployment (Vercel + GitHub)

This app is built with **Vite** and deployed on **Vercel** from the GitHub repository.

- **Build**: `npm run build` outputs to `dist` (Vercel detects Vite by default).
- **SPA routing**: [`vercel.json`](vercel.json) rewrites unknown paths to `index.html` so client routes like `/privacy` and `/terms` work on refresh and deep links.
- **Contact API**: [`api/contact.ts`](api/contact.ts) is a Vercel serverless function. In the Vercel project settings, add **`RESEND_API_KEY`** (and ensure your Resend domain and sender address are verified).

To exercise the contact form **locally** with the API, use the Vercel CLI so `/api/contact` is available (plain `npm run dev` serves only the frontend):

```sh
npm run build   # optional sanity check
vercel dev
```

After pushing to GitHub, Vercel redeploys the connected branch automatically.

## License

All rights reserved © Kinet
