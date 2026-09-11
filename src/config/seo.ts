import { BLOGS_PATH } from '../lib/blogPaths';

export const SITE_URL = 'https://kinetsolutions.dev';

export const INDEXING_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export const brand = {
  name: 'Kinet Solutions',
  shortName: 'Kinet',
  legalName: 'Kinet Solutions',
  alternateNames: ['Kinet', 'Kinet Solutions', 'kinetsolutions', 'Kinet Solutions Studio'],
  slogan: 'Products Founders Rely On',
  email: 'contact@kinetsolutions.dev',
  telephone: '+251994819513',
  founderName: 'Yosef Abay',
  founderSameAs: [
    'https://www.linkedin.com/in/yoseph-abay',
    'https://github.com/josabah',
    'https://x.com/yosefbabay',
  ],
  organizationSameAs: ['https://www.linkedin.com/company/kinet-solutions'],
} as const;

export const siteSeo = {
  siteName: brand.name,
  title: 'Kinet Solutions | Products Founders Rely On',
  description:
    'Kinet (Kinet Solutions) designs and builds software products for driven founders. Web, mobile, backend, and AI, built to last.',
  keywords: [
    'Kinet',
    'Kinet Solutions',
    'product studio for founders',
    'product design and engineering',
    'digital product studio',
    'digital product agency',
    'product engineering studio',
    'web application development',
    'mobile app development',
    'AI product development',
    'startup product studio',
    'technical partner for founders',
    'MVP development',
    'React',
    'Next.js',
  ].join(', '),
  ogImage: `${SITE_URL}/og.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Kinet Solutions. Design and engineering for founders',
  logo: `${SITE_URL}/kinet-icon.png`,
  logoWidth: 512,
  logoHeight: 512,
  twitterCard: 'summary_large_image' as const,
  locale: 'en_US',
  language: 'en-US',
  organizationDescription:
    'Kinet Solutions designs and builds software products. We work with founders building a technology company around a problem they believe software can solve, and with founders who want an existing business delivered through a product.',
  websiteDescription:
    'Kinet Solutions designs and builds software products: product design and engineering for driven founders.',
} as const;

export const pageSeo = {
  home: {
    path: '/',
    title: siteSeo.title,
    description: siteSeo.description,
    keywords: siteSeo.keywords,
  },
  projects: {
    path: '/projects',
    title: 'Projects | Kinet Solutions',
    description:
      'Selected product work from Kinet Solutions. Exam platforms, marketplaces, and production systems designed and engineered with founders.',
  },
  blog: {
    path: BLOGS_PATH,
    title: 'Blogs | Kinet Solutions',
    description:
      'Writing from Kinet Solutions on product, engineering, and the work of getting software right for founder-led companies.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy | Kinet Solutions',
    description: 'How Kinet Solutions collects and uses information when you visit kinetsolutions.dev or contact us.',
  },
  terms: {
    path: '/terms',
    title: 'Terms | Kinet Solutions',
    description: 'Terms of use for the Kinet Solutions website and engagement with our studio.',
  },
  story: {
    path: '/story',
    title: 'Kinet Solutions',
    description:
      'Kinet Solutions. Design and engineering for ambitious founders who care about getting it right the first time.',
    noindex: true,
  },
  notFound: {
    path: '',
    title: 'Page not found | Kinet Solutions',
    description: 'This page is not available on Kinet Solutions.',
    noindex: true,
  },
} as const;

export const offeredServices = [
  {
    name: 'Web application design and engineering',
    description:
      'Product-grade web applications for founders building the core of a technology company.',
  },
  {
    name: 'Mobile product development',
    description: 'iOS and Android products designed and engineered with the same care as the web.',
  },
  {
    name: 'Backend infrastructure',
    description: 'Systems a growing product company can depend on after launch.',
  },
  {
    name: 'AI product development',
    description: 'Useful AI inside real products: model-backed workflows, RAG, and automation.',
  },
  {
    name: 'Product design',
    description: 'Product design that starts before development: UX, prototypes, and design systems.',
  },
] as const;

export function absoluteUrl(path: string): string {
  if (!path || path === '/') return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function assetUrl(path: string | undefined, fallback = siteSeo.ogImage): string {
  if (!path) return fallback;
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path;
  if (path.startsWith('/')) return `${SITE_URL}${path}`;
  return `${SITE_URL}/${path}`;
}

export function withBrandTitle(pageTitle: string): string {
  if (pageTitle.includes(brand.name) || pageTitle.includes(brand.shortName)) return pageTitle;
  return `${pageTitle} | ${brand.name}`;
}
