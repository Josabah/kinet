/** Public HTTP collection. Markdown still lives in `content/blog/`. */
export const BLOGS_PATH = '/blogs' as const;

export function blogsPath(): typeof BLOGS_PATH {
  return BLOGS_PATH;
}

/** Member URL for a post. Empty slugs fall back to the collection. */
export function blogPath(slug: string): string {
  const id = slug.trim().replace(/^\/+|\/+$/g, '');
  if (!id) return BLOGS_PATH;
  return `${BLOGS_PATH}/${encodeURIComponent(id)}`;
}
