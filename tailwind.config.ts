import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Geist Sans"', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        body: ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],
        lead: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0' }],
        h6: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        h5: ['1.5625rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        h4: ['1.9375rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        h3: ['2.4375rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        h2: ['3.0625rem', { lineHeight: '1.1', letterSpacing: '-0.018em' }],
        h1: ['3.8125rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        hero: '38.75rem',
        prose: '42.5rem',
        'prose-sm': '37.5rem',
      },
      colors: {
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        heading: "rgb(var(--heading) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        "section-alt": "rgb(var(--section-alt) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        kinet: {
          deep: "rgb(var(--kinet-deep) / <alpha-value>)",
          midnight: "rgb(var(--kinet-midnight) / <alpha-value>)",
          indigo: "rgb(var(--kinet-indigo) / <alpha-value>)",
          text: "rgb(var(--kinet-text) / <alpha-value>)",
          nav: "rgb(var(--kinet-nav) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
