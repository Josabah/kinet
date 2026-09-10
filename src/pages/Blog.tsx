import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageGridBackground from '@/components/PageGridBackground';
import SeoHead from '@/components/SeoHead';
import { formatPostDate, formatReadingTime, getPublishedPosts } from '@/lib/blog';
import { buildBlogJsonLd } from '@/lib/seoJsonLd';
import { pageSeo } from '@/config/seo';
import './Blog.css';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const Blog = () => {
  const posts = getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <SeoHead
        title={pageSeo.blog.title}
        description={pageSeo.blog.description}
        path={pageSeo.blog.path}
        jsonLd={buildBlogJsonLd(posts)}
      />
      <Header />
      <main id="main-content" className="relative pt-24 md:pt-28" tabIndex={-1}>
        <PageGridBackground />

        <div className="container relative z-10 mx-auto px-6 pb-24 md:pb-32">
          <motion.header
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="section-header mx-auto max-w-prose text-center"
          >
            <h1 className="section-title text-h2 md:text-h1">Blogs</h1>
            <p className="section-lead">
              Practical notes on product, engineering, and the work of getting software right.
            </p>
          </motion.header>

          {posts.length === 0 ? (
            <p className="mx-auto max-w-prose text-center text-body text-muted-foreground">
              No posts published yet. Add a markdown file to <code className="font-mono text-heading">content/blog</code>.
            </p>
          ) : (
            <div className="mx-auto max-w-5xl">
              {featured && (
                <motion.article
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="blog-entry"
                >
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="blog-entry-featured group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    <div className="min-w-0 py-2">
                      <p className="text-sm text-muted-foreground mb-4">
                        <time dateTime={featured.date}>{formatPostDate(featured.date)}</time>
                        <span className="mx-2 text-border">/</span>
                        {formatReadingTime(featured.readingMinutes)}
                      </p>
                      <h2 className="font-display text-h4 md:text-h3 font-bold text-heading text-balance mb-3 group-hover:text-heading/70 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-body text-muted-foreground max-w-prose">{featured.description}</p>
                    </div>
                    {featured.cover && (
                      <figure className="blog-entry-cover mt-6 overflow-hidden border border-border bg-muted/30">
                        <img
                          src={featured.cover}
                          alt={featured.coverAlt ?? ''}
                          className="block w-full aspect-[4/3] object-cover"
                          decoding="async"
                        />
                      </figure>
                    )}
                  </Link>
                </motion.article>
              )}

              {rest.length > 0 && (
                <ol className="mt-6 md:mt-8 border-t border-border">
                  {rest.map((post, index) => (
                    <motion.li
                      key={post.slug}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      transition={{ duration: 0.45, delay: 0.12 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-border"
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className={`group grid gap-4 py-8 sm:gap-8 md:py-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 ${
                          post.cover
                            ? 'sm:grid-cols-[8.5rem_minmax(0,1fr)_minmax(9rem,13rem)]'
                            : 'sm:grid-cols-[8.5rem_minmax(0,1fr)]'
                        }`}
                      >
                        <p className="text-sm text-muted-foreground pt-1">
                          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        </p>
                        <div className="min-w-0">
                          <h2 className="font-display text-h5 md:text-h4 font-bold text-heading text-balance mb-2 group-hover:text-heading/70 transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-body text-muted-foreground max-w-prose">{post.description}</p>
                        </div>
                        {post.cover && (
                          <figure className="order-first overflow-hidden border border-border bg-muted/30 sm:order-none">
                            <img
                              src={post.cover}
                              alt={post.coverAlt ?? ''}
                              className="block w-full aspect-[4/3] object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </figure>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
