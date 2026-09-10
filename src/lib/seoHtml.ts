import { SITE_URL, siteSeo } from '../config/seo';

export type SeoDocument = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  ogType?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  keywords?: string | null;
  publishedTime?: string;
  jsonLd?: unknown;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  sitemap?: boolean;
};

export function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function escapeXml(value: string): string {
  return escapeAttr(value).replace(/'/g, '&apos;');
}

function replaceTag(
  html: string,
  pattern: RegExp,
  replacement: string | null,
  insertAfterTitle = true,
): string {
  if (pattern.test(html)) {
    if (replacement === null) return html.replace(pattern, '');
    return html.replace(pattern, replacement);
  }
  if (replacement === null) return html;
  if (insertAfterTitle) {
    return html.replace('</title>', `</title>\n  ${replacement}`);
  }
  return html.replace('</head>', `  ${replacement}\n</head>`);
}

function namedMetaPattern(name: string) {
  return new RegExp(`<meta\\s[^>]*name="${name}"[^>]*>`, 'i');
}

function propertyMetaPattern(property: string) {
  return new RegExp(`<meta\\s[^>]*property="${property}"[^>]*>`, 'i');
}

function namedMeta(name: string, content: string) {
  return `<meta data-rh="true" name="${name}" content="${escapeAttr(content)}" />`;
}

function propertyMeta(property: string, content: string) {
  return `<meta data-rh="true" property="${property}" content="${escapeAttr(content)}" />`;
}

export function injectSeoIntoHtml(html: string, page: SeoDocument): string {
  const image = page.image ?? siteSeo.ogImage;
  const imageAlt = page.imageAlt ?? siteSeo.ogImageAlt;
  const ogType = page.ogType ?? 'website';
  const robots = page.robots ?? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const isDefaultImage = image === siteSeo.ogImage;

  let next = html.replace(/<title[^>]*>[^<]*<\/title>/, `<title data-rh="true">${escapeAttr(page.title)}</title>`);

  next = replaceTag(next, namedMetaPattern('description'), namedMeta('description', page.description));
  next = replaceTag(
    next,
    namedMetaPattern('keywords'),
    page.keywords ? namedMeta('keywords', page.keywords) : null,
  );
  next = replaceTag(next, namedMetaPattern('robots'), namedMeta('robots', robots));
  next = replaceTag(next, namedMetaPattern('author'), namedMeta('author', siteSeo.siteName));
  next = replaceTag(
    next,
    /<link\s[^>]*rel="canonical"[^>]*>/i,
    `<link data-rh="true" rel="canonical" href="${escapeAttr(page.canonical)}" />`,
  );

  next = replaceTag(next, propertyMetaPattern('og:type'), propertyMeta('og:type', ogType));
  next = replaceTag(next, propertyMetaPattern('og:url'), propertyMeta('og:url', page.canonical));
  next = replaceTag(next, propertyMetaPattern('og:title'), propertyMeta('og:title', page.title));
  next = replaceTag(next, propertyMetaPattern('og:description'), propertyMeta('og:description', page.description));
  next = replaceTag(next, propertyMetaPattern('og:image'), propertyMeta('og:image', image));
  next = replaceTag(next, propertyMetaPattern('og:image:alt'), propertyMeta('og:image:alt', imageAlt));
  next = replaceTag(next, propertyMetaPattern('og:site_name'), propertyMeta('og:site_name', siteSeo.siteName));

  if (isDefaultImage) {
    next = replaceTag(
      next,
      propertyMetaPattern('og:image:width'),
      propertyMeta('og:image:width', String(siteSeo.ogImageWidth)),
    );
    next = replaceTag(
      next,
      propertyMetaPattern('og:image:height'),
      propertyMeta('og:image:height', String(siteSeo.ogImageHeight)),
    );
  } else {
    next = replaceTag(next, propertyMetaPattern('og:image:width'), null);
    next = replaceTag(next, propertyMetaPattern('og:image:height'), null);
  }

  next = replaceTag(next, namedMetaPattern('twitter:card'), namedMeta('twitter:card', siteSeo.twitterCard));
  next = replaceTag(next, namedMetaPattern('twitter:url'), namedMeta('twitter:url', page.canonical));
  next = replaceTag(next, namedMetaPattern('twitter:title'), namedMeta('twitter:title', page.title));
  next = replaceTag(
    next,
    namedMetaPattern('twitter:description'),
    namedMeta('twitter:description', page.description),
  );
  next = replaceTag(next, namedMetaPattern('twitter:image'), namedMeta('twitter:image', image));
  next = replaceTag(next, namedMetaPattern('twitter:image:alt'), namedMeta('twitter:image:alt', imageAlt));

  next = replaceTag(
    next,
    propertyMetaPattern('article:published_time'),
    page.publishedTime ? propertyMeta('article:published_time', page.publishedTime) : null,
    false,
  );

  if (page.jsonLd !== undefined) {
    const encoded = JSON.stringify(page.jsonLd).replace(/</g, '\\u003c');
    const block = `<!--seo:jsonld-->\n  <script type="application/ld+json">${encoded}</script>\n  <!--/seo:jsonld-->`;
    if (/<!--seo:jsonld-->[\s\S]*?<!--\/seo:jsonld-->/.test(next)) {
      next = next.replace(/<!--seo:jsonld-->[\s\S]*?<!--\/seo:jsonld-->/, block);
    } else {
      next = next.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        block,
      );
    }
  }

  return next.replace(/\n{3,}/g, '\n\n');
}

export function buildSitemapXml(pages: Pick<SeoDocument, 'canonical' | 'lastmod' | 'changefreq' | 'priority' | 'sitemap'>[]) {
  const urls = pages
    .filter((page) => page.sitemap !== false)
    .map((page) => {
      const lastmod = page.lastmod ? `\n    <lastmod>${escapeXml(page.lastmod)}</lastmod>` : '';
      const changefreq = page.changefreq ? `\n    <changefreq>${page.changefreq}</changefreq>` : '';
      const priority =
        typeof page.priority === 'number' ? `\n    <priority>${page.priority.toFixed(1)}</priority>` : '';
      return `  <url>\n    <loc>${escapeXml(page.canonical)}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export type RssItem = {
  title: string;
  description: string;
  url: string;
  date: string;
};

export function buildRssXml(items: RssItem[]) {
  const latest = items[0]?.date ?? new Date().toISOString().slice(0, 10);
  const entries = items
    .map((item) => {
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid>${escapeXml(item.url)}</guid>
      <pubDate>${toRfc822(item.date)}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Kinet Solutions</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(siteSeo.websiteDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${toRfc822(latest)}</lastBuildDate>
${entries}
  </channel>
</rss>
`;
}

function toRfc822(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toUTCString();
}

export function htmlPathForRoute(routePath: string): string {
  if (!routePath || routePath === '/') return 'index.html';
  const trimmed = routePath.replace(/^\//, '').replace(/\/$/, '');
  return `${trimmed}/index.html`;
}
