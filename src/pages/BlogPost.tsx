import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageGridBackground from '@/components/PageGridBackground';
import MarkdownContent from '@/components/blog/MarkdownContent';
import SeoHead from '@/components/SeoHead';
import { formatPostDate, formatReadingTime, getPostBySlug } from '@/lib/blog';
import { buildBlogPostingJsonLd } from '@/lib/seoJsonLd';
import { brand } from '@/config/seo';
import './Blog.css';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById('blog-article');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total > 0 ? scrolled / total : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const canonicalPath = `/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <SeoHead
        title={`${post.title} | ${brand.name}`}
        description={post.description}
        path={canonicalPath}
        ogType="article"
        image={post.cover}
        imageAlt={post.coverAlt ?? post.title}
        publishedTime={post.date}
        jsonLd={buildBlogPostingJsonLd(post)}
      />
      <div
        className="blog-progress pointer-events-none fixed top-0 left-0 z-[60] h-0.5 w-full bg-heading origin-left transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
      <Header />
      <main id="main-content" className="relative pt-24 md:pt-28" tabIndex={-1}>
        <PageGridBackground />

        <article id="blog-article" className="container relative z-10 mx-auto px-6 pb-24 md:pb-32">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-heading mb-10 min-h-11"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All posts
          </Link>

          <header className="max-w-prose mb-10 md:mb-14">
            <p className="text-sm text-muted-foreground mb-5">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span className="mx-2 text-border">/</span>
              {formatReadingTime(post.readingMinutes)}
            </p>
            <h1 className="font-display text-h3 md:text-h2 font-bold text-heading text-balance">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-5 text-lead text-muted-foreground">{post.description}</p>
            )}
          </header>

          {post.cover && (
            <figure className="relative mb-12 md:mb-16 max-w-4xl">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                <img
                  src={post.cover}
                  alt={post.coverAlt ?? ''}
                  className="block w-full h-auto"
                  decoding="async"
                />
              </div>
              {post.coverCredit && (
                <figcaption className="absolute bottom-3 right-3 z-10 max-w-[min(calc(100%-1.5rem),20rem)] rounded-md bg-heading/85 px-2.5 py-1 text-right text-[11px] font-medium leading-snug tracking-wide text-white">
                  Photo:{' '}
                  {post.coverCreditUrl ? (
                    <a
                      href={post.coverCreditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/45 underline-offset-[0.18em] hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-heading rounded-sm"
                    >
                      {post.coverCredit}
                    </a>
                  ) : (
                    post.coverCredit
                  )}
                </figcaption>
              )}
            </figure>
          )}

          <MarkdownContent content={post.content} />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
