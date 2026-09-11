import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { brand, offeredServices, pageSeo, siteSeo } from '@/config/seo';
import {
  buildHomeJsonLd,
  buildOrganizationNode,
  projectSeoDescription,
} from '@/lib/seoJsonLd';
import {
  buildRssXml,
  buildSitemapXml,
  htmlPathForRoute,
  injectSeoIntoHtml,
} from '@/lib/seoHtml';
import { projects } from '@/data/projects';

const seoCopy = [
  siteSeo.title,
  siteSeo.description,
  siteSeo.keywords,
  siteSeo.organizationDescription,
  siteSeo.websiteDescription,
  siteSeo.ogImageAlt,
  ...Object.values(pageSeo).flatMap((page) => [page.title, page.description]),
  ...offeredServices.map((service) => `${service.name} ${service.description}`),
].join('\n');

describe('brand SEO', () => {
  it('names the company Kinet Solutions and aliases Kinet', () => {
    expect(brand.name).toBe('Kinet Solutions');
    expect(brand.shortName).toBe('Kinet');
    expect(brand.alternateNames).toContain('Kinet');
    expect(siteSeo.title.startsWith('Kinet Solutions')).toBe(true);
    expect(siteSeo.description).toContain('Kinet');
    expect(siteSeo.description).toContain('Kinet Solutions');
    expect(siteSeo.keywords).toContain('Kinet');
    expect(siteSeo.keywords).toContain('Kinet Solutions');
  });

  it('keeps titles and descriptions in SERP range', () => {
    expect(siteSeo.title.length).toBeLessThanOrEqual(60);
    expect(siteSeo.description.length).toBeLessThanOrEqual(160);
    expect(pageSeo.projects.title.length).toBeLessThanOrEqual(60);
    expect(pageSeo.projects.description.length).toBeLessThanOrEqual(160);
    expect(pageSeo.blog.description.length).toBeLessThanOrEqual(160);
  });

  it('uses founder-positive studio language', () => {
    expect(seoCopy).toMatch(/founders/i);
    expect(seoCopy).toMatch(/product design and engineering/i);
    expect(seoCopy).toMatch(/digital product (studio|agency)/i);
    expect(seoCopy.toLowerCase()).not.toMatch(/\bnot for\b/);
    expect(seoCopy.toLowerCase()).not.toMatch(/\berp\b/);
    expect(seoCopy.toLowerCase()).not.toMatch(/\benterprise software\b/);
    expect(seoCopy.toLowerCase()).not.toMatch(/\bcustom software development\b/);
    expect(seoCopy.toLowerCase()).not.toMatch(/non-founders/);
    expect(seoCopy).not.toContain('\u2014');
  });
});

describe('organization graph', () => {
  it('identifies Kinet Solutions as the entity behind Kinet', () => {
    const organization = buildOrganizationNode();
    expect(organization.name).toBe('Kinet Solutions');
    expect(organization.alternateName).toContain('Kinet');
    expect(organization.brand).toEqual({
      '@type': 'Brand',
      name: 'Kinet',
      alternateName: 'Kinet Solutions',
    });
    expect(organization.audience).toEqual({
      '@type': 'Audience',
      audienceType: 'Founders',
    });
    expect(organization.sameAs).toContain('https://www.linkedin.com/company/kinet-solutions');
  });

  it('keeps index.html structured data in sync with the builder', () => {
    const html = readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
    const match = html.match(/<!--seo:jsonld-->\s*<script type="application\/ld\+json">([\s\S]*?)<\/script>\s*<!--\/seo:jsonld-->/);
    expect(match).toBeTruthy();
    expect(JSON.stringify(buildHomeJsonLd())).not.toContain('\u2014');
    expect(JSON.parse(match![1])).toEqual(buildHomeJsonLd());
  });
});

describe('html injection and sitemap', () => {
  const shell = `<html><head>
  <title>Old</title>
  <meta name="description" content="old" />
  <meta name="keywords" content="old" />
  <link rel="canonical" href="https://example.com" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://example.com" />
  <meta property="og:title" content="Old" />
  <meta property="og:description" content="old" />
  <meta property="og:image" content="https://example.com/old.png" />
  <meta property="og:image:width" content="1376" />
  <meta property="og:image:height" content="768" />
  <meta property="og:image:alt" content="old" />
  <meta property="og:site_name" content="Old" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:url" content="https://example.com" />
  <meta name="twitter:title" content="Old" />
  <meta name="twitter:description" content="old" />
  <meta name="twitter:image" content="https://example.com/old.png" />
  <meta name="twitter:image:alt" content="old" />
  <!--seo:jsonld-->
  <script type="application/ld+json">{"old":true}</script>
  <!--/seo:jsonld-->
</head></html>`;

  it('rewrites route metadata for crawlers that do not run JavaScript', () => {
    const html = injectSeoIntoHtml(shell, {
      path: '/projects',
      title: 'Projects | Kinet Solutions',
      description: 'Selected product work from Kinet Solutions.',
      canonical: 'https://kinetsolutions.dev/projects',
      keywords: null,
      jsonLd: { '@type': 'WebPage', name: 'Projects' },
    });

    expect(html).toContain('Projects | Kinet Solutions</title>');
    expect(html).toContain('content="Selected product work from Kinet Solutions."');
    expect(html).toContain('href="https://kinetsolutions.dev/projects"');
    expect(html).not.toContain('name="keywords"');
    expect(html).toContain('"@type":"WebPage"');
  });

  it('drops default OG image dimensions when a page supplies its own image', () => {
    const html = injectSeoIntoHtml(shell, {
      path: '/projects/uatmodel',
      title: 'UAT Model | Projects | Kinet Solutions',
      description: 'Exam platform.',
      canonical: 'https://kinetsolutions.dev/projects/uatmodel',
      image: 'https://kinetsolutions.dev/projects/uatmodel/hero.png',
    });

    expect(html).toContain('content="https://kinetsolutions.dev/projects/uatmodel/hero.png"');
    expect(html).not.toContain('og:image:width');
    expect(html).not.toContain('og:image:height');
  });

  it('builds a sitemap without social-only or duplicate section routes', () => {
    const xml = buildSitemapXml([
      { canonical: 'https://kinetsolutions.dev', priority: 1, sitemap: true },
      { canonical: 'https://kinetsolutions.dev/projects', priority: 0.9 },
      { canonical: 'https://kinetsolutions.dev/story', sitemap: false },
    ]);

    expect(xml).toContain('https://kinetsolutions.dev</loc>');
    expect(xml).toContain('/projects</loc>');
    expect(xml).not.toContain('/story');
    expect(xml).not.toContain('/services');
    expect(xml).not.toContain('/faq');
  });

  it('emits an RSS feed for published writing', () => {
    const xml = buildRssXml([
      {
        title: 'A note',
        description: 'On product.',
        url: 'https://kinetsolutions.dev/blogs/a-note',
        date: '2026-09-10',
      },
    ]);
    expect(xml).toContain('<title>Kinet Solutions</title>');
    expect(xml).toContain('https://kinetsolutions.dev/blogs/a-note');
  });

  it('maps routes to static html files', () => {
    expect(htmlPathForRoute('/')).toBe('index.html');
    expect(htmlPathForRoute('/projects/uatmodel')).toBe('projects/uatmodel/index.html');
  });

  it('keeps project descriptions inside a meta description budget', () => {
    for (const project of projects) {
      expect(projectSeoDescription(project).length).toBeLessThanOrEqual(160);
      expect(projectSeoDescription(project)).toContain(project.name);
    }
  });
});
