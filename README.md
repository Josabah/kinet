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
├── api/
│   └── contact.ts          # Vercel serverless handler (contact form)
├── public/                 # Static assets (sitemap, robots, favicon)
├── src/
│   ├── components/         # Feature components (Header, Hero, Services, etc.)
│   │   └── ui/             # shadcn/ui primitives
│   ├── pages/              # Route pages (Index, NotFound)
│   ├── hooks/              # React hooks (use-toast, use-mobile)
│   ├── lib/                # Utilities (e.g. cn)
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

The contact form uses a serverless API (e.g. Vercel) and [Resend](https://resend.com) to send emails. Set these in your deployment environment (and in a local `.env` file for development; `.env` is gitignored):

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key for sending email |
| `CONTACT_EMAIL_TO` | Yes | Email address that receives contact form submissions |
| `CONTACT_EMAIL_FROM` | No | Sender address (default: `contact@kinetsolutions.dev`) |

Copy `.env.example` to `.env` and fill in the values. Never commit `.env`.

To test the contact form locally, run `vercel dev` instead of `npm run dev` so the `/api/contact` serverless function is available. With `npm run dev` only, the form will show a connection error because the API is not running.

## Deployment

Build the project and deploy the `dist` folder to any static hosting service (e.g. Vercel). Ensure the environment variables above are set in your hosting provider so the contact form works.

```sh
npm run build
```

## License

All rights reserved © Kinet
