import { describe, expect, it } from 'vitest';
import {
  estimateReadingMinutes,
  formatReadingTime,
  getPublishedPosts,
  parseFrontmatter,
  resolveBlogAsset,
  rewriteMarkdownAssets,
  shouldSkipSource,
  slugFromSource,
  toBlogRelativePath,
} from './blog';

describe('blog source paths', () => {
  it('normalizes glob keys to content-relative paths', () => {
    expect(toBlogRelativePath('../../content/blog/hello.md')).toBe('content/blog/hello.md');
    expect(toBlogRelativePath('/Users/me/kinet/content/blog/hello/cover.svg')).toBe(
      'content/blog/hello/cover.svg',
    );
  });

  it('derives slugs from flat files and folder posts', () => {
    expect(slugFromSource('content/blog/classroom-walls-ethiopia.md')).toBe(
      'classroom-walls-ethiopia',
    );
    expect(slugFromSource('content/blog/classroom-walls-ethiopia/index.md')).toBe(
      'classroom-walls-ethiopia',
    );
    expect(slugFromSource('content/blog/nested/too-deep.md')).toBeNull();
  });

  it('skips guides and underscored files', () => {
    expect(shouldSkipSource('content/blog/_guide.md')).toBe(true);
    expect(shouldSkipSource('content/blog/README.md')).toBe(true);
    expect(shouldSkipSource('content/blog/classroom-walls-ethiopia.md')).toBe(false);
  });
});

describe('frontmatter and assets', () => {
  it('parses yaml frontmatter including dates and tags', () => {
    const raw = `---
title: Cut scope first
description: A short note.
date: 2026-09-10
cover: ./cover.svg
tags:
  - process
draft: false
---

Body copy with an image.
`;
    const { data, content } = parseFrontmatter(raw);
    expect(data.title).toBe('Cut scope first');
    expect(toIsoLike(data.date)).toBe('2026-09-10');
    expect(data.tags).toEqual(['process']);
    expect(content).toContain('Body copy');
  });

  it('resolves colocated images next to a flat markdown file', () => {
    const assets = {
      'content/blog/cut-scope-before-tools/cover.svg': '/assets/cover-hash.svg',
    };
    expect(resolveBlogAsset('./cover.svg', 'content/blog/cut-scope-before-tools.md', assets)).toBe(
      '/assets/cover-hash.svg',
    );
  });

  it('leaves public and remote image paths untouched', () => {
    expect(resolveBlogAsset('/blog/hero.png', 'content/blog/hello.md')).toBe('/blog/hero.png');
    expect(resolveBlogAsset('https://cdn.example/a.png', 'content/blog/hello.md')).toBe(
      'https://cdn.example/a.png',
    );
  });

  it('rewrites relative markdown images before render', () => {
    const assets = {
      'content/blog/hello/diagram.png': '/assets/diagram-hash.png',
    };
    const rewritten = rewriteMarkdownAssets(
      'See ![Flow](./diagram.png "The decision line")',
      'content/blog/hello.md',
      assets,
    );
    expect(rewritten).toBe('See ![Flow](/assets/diagram-hash.png "The decision line")');
  });

  it('estimates at least one minute of reading time', () => {
    expect(estimateReadingMinutes('Short.')).toBe(1);
  });

  it('pluralizes reading time', () => {
    expect(formatReadingTime(1)).toBe('1 min read');
    expect(formatReadingTime(4)).toBe('4 mins read');
  });

  it('loads published markdown posts from content/blog', () => {
    const slugs = getPublishedPosts().map((post) => post.slug);
    expect(slugs).toContain('classroom-walls-ethiopia');
    expect(slugs).not.toContain('the-exam-had-to-feel-real');
  });
});

function toIsoLike(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}
