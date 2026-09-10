import { parse as parseYaml } from 'yaml';

export { BLOGS_PATH, blogPath, blogsPath } from './blogPaths';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  featured: boolean;
  cover?: string;
  coverAlt?: string;
  coverCredit?: string;
  coverCreditUrl?: string;
  content: string;
  readingMinutes: number;
  sourcePath: string;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const MARKDOWN_IMAGE = /!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+["'(]([^"')]+)["')])?\s*\)/g;

const markdownFiles = import.meta.glob('../../content/blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const imageFiles = import.meta.glob('../../content/blog/**/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const imageMap = Object.fromEntries(
  Object.entries(imageFiles).map(([key, url]) => [toBlogRelativePath(key), url]),
);

export function toBlogRelativePath(globKey: string): string {
  const normalized = globKey.replace(/\\/g, '/');
  const marker = '/content/blog/';
  const index = normalized.lastIndexOf(marker);
  if (index === -1) return normalized.replace(/^\.\.\//, '');
  return `content/blog/${normalized.slice(index + marker.length)}`;
}

export function slugFromSource(sourcePath: string): string | null {
  const nested = sourcePath.match(/^content\/blog\/([^/]+)\/index\.md$/);
  if (nested) return nested[1];
  const flat = sourcePath.match(/^content\/blog\/([^/]+)\.md$/);
  if (flat) return flat[1];
  return null;
}

function filenameOf(sourcePath: string): string {
  return sourcePath.split('/').pop() ?? sourcePath;
}

export function shouldSkipSource(sourcePath: string): boolean {
  const filename = filenameOf(sourcePath);
  return filename.startsWith('_') || filename.toLowerCase() === 'readme.md';
}

export function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(FRONTMATTER);
  if (!match) return { data: {}, content: raw.trim() };

  const parsed = parseYaml(match[1]);
  const data = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
  return { data, content: match[2].trim() };
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string' && value.trim()) {
    const trimmed = value.trim();
    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) return trimmed.slice(0, 10);
  }
  return '';
}

function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string' && value.trim()) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function toOptionalString(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim();
  return undefined;
}

export function estimateReadingMinutes(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/[#>*_`~\-\[\]()]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function resolveBlogAsset(
  src: string,
  sourcePath: string,
  assets: Record<string, string> = imageMap,
): string {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:') || src.startsWith('/')) {
    return src;
  }

  const cleaned = src.replace(/^\.\//, '');
  const dir = sourcePath.replace(/\/[^/]+$/, '');
  const candidates = [`${dir}/${cleaned}`];

  const flatMatch = sourcePath.match(/^content\/blog\/([^/]+)\.md$/);
  if (flatMatch) {
    candidates.push(`content/blog/${flatMatch[1]}/${cleaned}`);
  }

  for (const candidate of candidates) {
    if (assets[candidate]) return assets[candidate];
  }

  return src;
}

export function rewriteMarkdownAssets(
  markdown: string,
  sourcePath: string,
  assets: Record<string, string> = imageMap,
): string {
  return markdown.replace(MARKDOWN_IMAGE, (_full, alt: string, src: string, title?: string) => {
    const resolved = resolveBlogAsset(src, sourcePath, assets);
    return title ? `![${alt}](${resolved} "${title}")` : `![${alt}](${resolved})`;
  });
}

function parsePost(globKey: string, raw: string): BlogPost | null {
  const sourcePath = toBlogRelativePath(globKey);
  if (shouldSkipSource(sourcePath)) return null;

  const slug = slugFromSource(sourcePath);
  if (!slug) return null;

  const { data, content } = parseFrontmatter(raw);
  const title = toOptionalString(data.title);
  const description = toOptionalString(data.description) ?? '';
  const date = toIsoDate(data.date);

  if (!title || !date) return null;

  const coverSrc = toOptionalString(data.cover);
  const cover = coverSrc ? resolveBlogAsset(coverSrc, sourcePath) : undefined;

  return {
    slug,
    title,
    description,
    date,
    tags: toStringList(data.tags),
    draft: data.draft === true,
    featured: data.featured === true,
    cover,
    coverAlt: toOptionalString(data.coverAlt) ?? (cover ? title : undefined),
    coverCredit: toOptionalString(data.coverCredit),
    coverCreditUrl: toOptionalString(data.coverCreditUrl),
    content: rewriteMarkdownAssets(content, sourcePath),
    readingMinutes: estimateReadingMinutes(content),
    sourcePath,
  };
}

const allPosts = Object.entries(markdownFiles)
  .map(([key, raw]) => parsePost(key, raw))
  .filter((post): post is BlogPost => post !== null)
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.title.localeCompare(b.title);
  });

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPublishedPosts(): BlogPost[] {
  if (import.meta.env.DEV) {
    return allPosts;
  }
  return allPosts.filter((post) => !post.draft);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function formatReadingTime(minutes: number): string {
  return minutes === 1 ? '1 min read' : `${minutes} mins read`;
}

export function formatPostDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}
