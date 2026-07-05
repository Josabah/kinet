export const primaryNavLinks = [
  { label: 'Projects', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'Process', to: '/process' },
  { label: 'Why Us', to: '/why-kinet' },
  { label: 'FAQ', to: '/faq' },
] as const;

export const footerNavLinks = [...primaryNavLinks] as const;

export const legalNavLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
] as const;
