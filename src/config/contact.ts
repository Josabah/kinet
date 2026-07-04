/** Direct contact channels — update URLs as needed */
export const CONTACT_DIRECT = {
  email: 'contact@kinetsolutions.dev',
  phone: '+251994819513',
  whatsapp:
    import.meta.env.VITE_WHATSAPP_URL ??
    "https://wa.me/251994819513?text=Hi%20Kinet%2C%20I'd%20like%20to%20discuss%20a%20project.",
  calendar: import.meta.env.VITE_CALENDAR_URL ?? 'https://cal.com/kinet/discovery',
} as const;

export const PROJECT_TYPE_OPTIONS = [
  { value: 'web-application', label: 'Web application' },
  { value: 'mobile-app', label: 'Mobile app' },
  { value: 'ai-product', label: 'AI product' },
  { value: 'internal-tool', label: 'Internal tool' },
  { value: 'mvp', label: 'MVP' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export const PROJECT_TYPE_LABELS = Object.fromEntries(
  PROJECT_TYPE_OPTIONS.map((o) => [o.value, o.label]),
) as Record<string, string>;
