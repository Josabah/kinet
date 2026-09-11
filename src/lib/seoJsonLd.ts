import type { BlogPost } from './blog';
import { BLOGS_PATH, blogPath } from './blogPaths';
import type { FaqItem } from '../data/faqs';
import type { Project } from '../data/projects';
import {
  SITE_URL,
  absoluteUrl,
  assetUrl,
  brand,
  offeredServices,
  pageSeo,
  siteSeo,
} from '../config/seo';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function stringifyJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function organizationRef() {
  return { '@id': ORGANIZATION_ID };
}

function websiteRef() {
  return { '@id': WEBSITE_ID };
}

export function buildOrganizationNode() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORGANIZATION_ID,
    name: brand.name,
    legalName: brand.legalName,
    alternateName: [...brand.alternateNames],
    brand: {
      '@type': 'Brand',
      name: brand.shortName,
      alternateName: brand.name,
    },
    url: SITE_URL,
    sameAs: [...brand.organizationSameAs],
    logo: {
      '@type': 'ImageObject',
      url: siteSeo.logo,
      width: siteSeo.logoWidth,
      height: siteSeo.logoHeight,
    },
    image: siteSeo.ogImage,
    description: siteSeo.organizationDescription,
    email: brand.email,
    telephone: brand.telephone,
    slogan: brand.slogan,
    areaServed: 'Worldwide',
    audience: {
      '@type': 'Audience',
      audienceType: 'Founders',
    },
    knowsAbout: [
      'Product design',
      'Product engineering',
      'Web applications',
      'Mobile products',
      'Backend infrastructure',
      'AI products',
      'Founder-led companies',
    ],
    founder: {
      '@type': 'Person',
      name: brand.founderName,
      jobTitle: 'Founder',
      sameAs: [...brand.founderSameAs],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: brand.email,
      telephone: brand.telephone,
      availableLanguage: ['English'],
      url: absoluteUrl('/contact'),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Kinet Solutions product studio',
      itemListElement: offeredServices.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: organizationRef(),
          audience: {
            '@type': 'Audience',
            audienceType: 'Founders',
          },
        },
      })),
    },
  };
}

export function buildWebSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: brand.name,
    alternateName: [...brand.alternateNames],
    url: SITE_URL,
    description: siteSeo.websiteDescription,
    inLanguage: siteSeo.language,
    publisher: organizationRef(),
  };
}

export function buildWebPageNode(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = absoluteUrl(input.path);
  const idBase = url === SITE_URL ? `${SITE_URL}/` : url;
  return {
    '@type': 'WebPage',
    '@id': `${idBase}#webpage`,
    url,
    name: input.title,
    description: input.description,
    inLanguage: siteSeo.language,
    isPartOf: websiteRef(),
    about: organizationRef(),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: assetUrl(input.image),
    },
    publisher: organizationRef(),
  };
}

export function buildBreadcrumbNode(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildGraph(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

export function buildHomeJsonLd() {
  return buildGraph([
    buildOrganizationNode(),
    buildWebSiteNode(),
    buildWebPageNode({
      title: pageSeo.home.title,
      description: pageSeo.home.description,
      path: pageSeo.home.path,
    }),
  ]);
}

export function buildFaqPageJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBlogJsonLd(posts: BlogPost[]) {
  return buildGraph([
    buildOrganizationNode(),
    buildWebSiteNode(),
    {
      '@type': 'Blog',
      '@id': `${absoluteUrl(BLOGS_PATH)}#blog`,
      name: 'Kinet Solutions Blogs',
      description: pageSeo.blog.description,
      url: absoluteUrl(BLOGS_PATH),
      inLanguage: siteSeo.language,
      publisher: organizationRef(),
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: absoluteUrl(blogPath(post.slug)),
      })),
    },
    buildBreadcrumbNode([
      { name: brand.name, path: '/' },
      { name: 'Blogs', path: BLOGS_PATH },
    ]),
  ]);
}

export function buildBlogPostingJsonLd(post: BlogPost) {
  const path = blogPath(post.slug);
  const url = absoluteUrl(path);
  return buildGraph([
    buildOrganizationNode(),
    buildWebSiteNode(),
    buildWebPageNode({
      title: `${post.title} | ${brand.name}`,
      description: post.description,
      path,
      image: post.cover,
    }),
    buildBreadcrumbNode([
      { name: brand.name, path: '/' },
      { name: 'Blogs', path: BLOGS_PATH },
      { name: post.title, path },
    ]),
    {
      '@type': 'BlogPosting',
      '@id': `${url}#post`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: siteSeo.language,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      image: assetUrl(post.cover),
      keywords: post.tags.join(', ') || undefined,
      author: organizationRef(),
      publisher: organizationRef(),
      url,
    },
  ]);
}

export function buildProjectsCollectionJsonLd(projects: Project[]) {
  const url = absoluteUrl('/projects');
  return buildGraph([
    buildOrganizationNode(),
    buildWebSiteNode(),
    {
      ...buildWebPageNode({
        title: pageSeo.projects.title,
        description: pageSeo.projects.description,
        path: '/projects',
      }),
      '@type': 'CollectionPage',
    },
    buildBreadcrumbNode([
      { name: brand.name, path: '/' },
      { name: 'Projects', path: '/projects' },
    ]),
    {
      '@type': 'ItemList',
      name: 'Kinet Solutions projects',
      url,
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/projects/${project.slug}`),
        name: project.name,
      })),
    },
  ]);
}

export function buildProjectJsonLd(project: Project) {
  const path = `/projects/${project.slug}`;
  const url = absoluteUrl(path);
  return buildGraph([
    buildOrganizationNode(),
    buildWebSiteNode(),
    buildWebPageNode({
      title: `${project.name} | Projects | ${brand.name}`,
      description: projectSeoDescription(project),
      path,
      image: project.heroImage,
    }),
    buildBreadcrumbNode([
      { name: brand.name, path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.name, path },
    ]),
    {
      '@type': 'CreativeWork',
      '@id': `${url}#work`,
      name: project.name,
      headline: project.name,
      description: projectSeoDescription(project),
      url,
      image: assetUrl(project.heroImage),
      creator: organizationRef(),
      publisher: organizationRef(),
      about: project.category,
      keywords: project.stack.join(', '),
    },
  ]);
}

export function projectSeoDescription(project: Project): string {
  const outcome = project.outcome.replace(/\s+/g, ' ').trim();
  const clipped = outcome.length > 120 ? `${outcome.slice(0, 117).trimEnd()}…` : outcome;
  const description = `${project.name}: ${project.category}. ${clipped}`;
  return description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description;
}

export function buildInnerPageJsonLd(input: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: { name: string; path: string }[];
  image?: string;
}) {
  return buildGraph([
    buildOrganizationNode(),
    buildWebSiteNode(),
    buildWebPageNode(input),
    buildBreadcrumbNode(input.breadcrumbs),
  ]);
}
