import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { parse as parseYaml } from 'yaml';
import { projects } from './src/data/projects';
import {
  INDEXING_ROBOTS,
  SITE_URL,
  absoluteUrl,
  assetUrl,
  brand,
  pageSeo,
  siteSeo,
} from './src/config/seo';
import {
  buildSitemapXml,
  buildRssXml,
  htmlPathForRoute,
  injectSeoIntoHtml,
  type SeoDocument,
} from './src/lib/seoHtml';
import {
  buildBlogJsonLd,
  buildBlogPostingJsonLd,
  buildHomeJsonLd,
  buildInnerPageJsonLd,
  buildProjectJsonLd,
  buildProjectsCollectionJsonLd,
  projectSeoDescription,
} from './src/lib/seoJsonLd';

type MarkdownPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  cover?: string;
  coverFile?: string;
  sourcePath: string;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function fileDate(filePath: string): string {
  try {
    return fs.statSync(filePath).mtime.toISOString().slice(0, 10);
  } catch {
    return today();
  }
}

function readPublishedPosts(root: string): MarkdownPost[] {
  const dir = path.join(root, 'content/blog');
  if (!fs.existsSync(dir)) return [];

  const posts: MarkdownPost[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name.toLowerCase() === 'readme.md') continue;

    if (entry.isFile() && entry.name.endsWith('.md')) {
      const sourcePath = path.join(dir, entry.name);
      const parsed = parsePostFile(sourcePath, entry.name.replace(/\.md$/, ''));
      if (parsed) posts.push(parsed);
      continue;
    }

    if (entry.isDirectory()) {
      const indexPath = path.join(dir, entry.name, 'index.md');
      if (!fs.existsSync(indexPath)) continue;
      const parsed = parsePostFile(indexPath, entry.name);
      if (parsed) posts.push(parsed);
    }
  }

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function parsePostFile(sourcePath: string, slug: string): MarkdownPost | null {
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const match = raw.match(FRONTMATTER);
  const parsed = match ? parseYaml(match[1]) : {};
  const data = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  const title = typeof data.title === 'string' ? data.title.trim() : '';
  const date = typeof data.date === 'string' ? data.date.slice(0, 10) : data.date instanceof Date ? data.date.toISOString().slice(0, 10) : '';
  if (!title || !date) return null;

  const coverSrc = typeof data.cover === 'string' ? data.cover.trim() : '';
  const coverFile = coverSrc ? resolveCoverFile(sourcePath, coverSrc) : undefined;

  return {
    slug,
    title,
    description: typeof data.description === 'string' ? data.description.trim() : '',
    date,
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
    draft: data.draft === true,
    cover: coverSrc,
    coverFile,
    sourcePath,
  };
}

function resolveCoverFile(sourcePath: string, coverSrc: string): string | undefined {
  if (!coverSrc || /^(https?:)?\/\//.test(coverSrc) || coverSrc.startsWith('/')) return undefined;
  const cleaned = coverSrc.replace(/^\.\//, '');
  const dir = path.dirname(sourcePath);
  const candidates = [
    path.join(dir, cleaned),
    path.join(dir, path.parse(sourcePath).name, cleaned),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function asBlogPost(post: MarkdownPost, publicCover?: string) {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    draft: post.draft,
    featured: false,
    cover: publicCover,
    content: '',
    readingMinutes: 1,
    sourcePath: post.sourcePath,
  };
}

function collectDocuments(root: string, outDir?: string): SeoDocument[] {
  const posts = readPublishedPosts(root);
  const lastmodHome = today();
  const documents: SeoDocument[] = [
    {
      path: '/',
      title: pageSeo.home.title,
      description: pageSeo.home.description,
      canonical: SITE_URL,
      keywords: pageSeo.home.keywords,
      jsonLd: buildHomeJsonLd(),
      lastmod: lastmodHome,
      changefreq: 'weekly',
      priority: 1,
    },
    {
      path: '/projects',
      title: pageSeo.projects.title,
      description: pageSeo.projects.description,
      canonical: absoluteUrl('/projects'),
      keywords: null,
      jsonLd: buildProjectsCollectionJsonLd(projects),
      lastmod: fileDate(path.join(root, 'src/data/projects.ts')),
      changefreq: 'monthly',
      priority: 0.9,
    },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      title: `${project.name} | Projects | ${brand.name}`,
      description: projectSeoDescription(project),
      canonical: absoluteUrl(`/projects/${project.slug}`),
      keywords: null,
      image: assetUrl(project.heroImage),
      imageAlt: `${project.name} — ${project.category}`,
      jsonLd: buildProjectJsonLd(project),
      lastmod: fileDate(path.join(root, 'src/data/projects.ts')),
      changefreq: 'yearly' as const,
      priority: 0.7,
    })),
    {
      path: '/blog',
      title: pageSeo.blog.title,
      description: pageSeo.blog.description,
      canonical: absoluteUrl('/blog'),
      keywords: null,
      jsonLd: buildBlogJsonLd(posts.map((post) => asBlogPost(post))),
      lastmod: posts[0]?.date ?? lastmodHome,
      changefreq: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => {
      const publicCover = copyCover(post, root, outDir);
      return {
        path: `/blog/${post.slug}`,
        title: `${post.title} | ${brand.name}`,
        description: post.description,
        canonical: absoluteUrl(`/blog/${post.slug}`),
        keywords: null,
        ogType: 'article' as const,
        image: publicCover ?? siteSeo.ogImage,
        imageAlt: post.title,
        publishedTime: post.date,
        jsonLd: buildBlogPostingJsonLd(asBlogPost(post, publicCover)),
        lastmod: post.date,
        changefreq: 'yearly' as const,
        priority: 0.7,
      };
    }),
    {
      path: '/privacy',
      title: pageSeo.privacy.title,
      description: pageSeo.privacy.description,
      canonical: absoluteUrl('/privacy'),
      keywords: null,
      jsonLd: buildInnerPageJsonLd({
        title: pageSeo.privacy.title,
        description: pageSeo.privacy.description,
        path: '/privacy',
        breadcrumbs: [
          { name: brand.name, path: '/' },
          { name: 'Privacy', path: '/privacy' },
        ],
      }),
      lastmod: fileDate(path.join(root, 'src/pages/Privacy.tsx')),
      changefreq: 'yearly',
      priority: 0.3,
    },
    {
      path: '/terms',
      title: pageSeo.terms.title,
      description: pageSeo.terms.description,
      canonical: absoluteUrl('/terms'),
      keywords: null,
      jsonLd: buildInnerPageJsonLd({
        title: pageSeo.terms.title,
        description: pageSeo.terms.description,
        path: '/terms',
        breadcrumbs: [
          { name: brand.name, path: '/' },
          { name: 'Terms', path: '/terms' },
        ],
      }),
      lastmod: fileDate(path.join(root, 'src/pages/Terms.tsx')),
      changefreq: 'yearly',
      priority: 0.3,
    },
    {
      path: '/story',
      title: pageSeo.story.title,
      description: pageSeo.story.description,
      canonical: absoluteUrl('/story'),
      robots: 'noindex, nofollow',
      keywords: null,
      sitemap: false,
    },
  ];

  return documents;
}

function copyCover(post: MarkdownPost, root: string, outDir?: string): string | undefined {
  if (!post.coverFile || !outDir) return undefined;
  const ext = path.extname(post.coverFile) || '.jpg';
  const destDir = path.join(outDir, 'blog', post.slug);
  fs.mkdirSync(destDir, { recursive: true });
  const destName = `cover${ext}`;
  fs.copyFileSync(post.coverFile, path.join(destDir, destName));
  return `${SITE_URL}/blog/${post.slug}/${destName}`;
}

function writeSeoDocuments(root: string, outDir: string) {
  const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
  const documents = collectDocuments(root, outDir);

  for (const document of documents) {
    const html = injectSeoIntoHtml(template, {
      ...document,
      robots: document.robots ?? INDEXING_ROBOTS,
    });
    const dest = path.join(outDir, htmlPathForRoute(document.path));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html);
  }

  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemapXml(documents));

  const posts = readPublishedPosts(root);
  fs.writeFileSync(
    path.join(outDir, 'feed.xml'),
    buildRssXml(
      posts.map((post) => ({
        title: post.title,
        description: post.description,
        url: absoluteUrl(`/blog/${post.slug}`),
        date: post.date,
      })),
    ),
  );
}

export function kinetSeoPlugin(): Plugin {
  let root = process.cwd();
  let outDir = path.join(root, 'dist');

  return {
    name: 'kinet-seo',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url === '/sitemap.xml') {
          const xml = buildSitemapXml(collectDocuments(root));
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(xml);
          return;
        }
        if (url === '/feed.xml') {
          const posts = readPublishedPosts(root);
          const xml = buildRssXml(
            posts.map((post) => ({
              title: post.title,
              description: post.description,
              url: absoluteUrl(`/blog/${post.slug}`),
              date: post.date,
            })),
          );
          res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
          res.end(xml);
          return;
        }
        next();
      });
    },
    closeBundle: {
      sequential: true,
      handler() {
        if (!fs.existsSync(path.join(outDir, 'index.html'))) return;
        writeSeoDocuments(root, outDir);
      },
    },
  };
}
