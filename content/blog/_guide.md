# Adding a blog post

Drop a markdown file in this folder. The filename becomes the URL.

```text
content/blog/my-post.md          →  /blog/my-post
content/blog/my-post/index.md    →  /blog/my-post
```

Files that start with `_` (this guide included) are ignored.

## Frontmatter

```md
---
title: The title on the page and in the list
description: One or two sentences for the index, SEO, and social cards.
date: 2026-09-10
cover: ./cover.jpg
coverAlt: Describe the cover for screen readers.
tags:
  - process
draft: false
---
```

Set `draft: true` to keep a post off the production site. Drafts still render in local development.

## Images

**Colocate them with the post** — the usual path:

```text
content/blog/my-post.md
content/blog/my-post/cover.jpg
content/blog/my-post/diagram.png
```

Then reference them with a relative path. The title in quotes becomes the caption under the image:

```md
![Checkout after the rewrite](./diagram.png "The confirmation state, after we cut the extra steps.")
```

`cover` in frontmatter uses the same relative paths.

You can also put a whole post in one folder:

```text
content/blog/my-post/index.md
content/blog/my-post/cover.jpg
```

**Public folder** — use this when you want a stable URL (for example an Open Graph raster):

```text
public/blog/my-post/hero.png
```

```md
![Hero](/blog/my-post/hero.png)
```

Remote URLs work as well: `![Alt](https://…)`.

Prefer JPG, PNG, WebP, or AVIF for photographs and for social cards. SVG is fine for diagrams on the page; most social crawlers ignore it, so keep a PNG in `public/` if the cover needs to travel.
