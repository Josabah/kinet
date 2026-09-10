import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { brand, pageSeo } from '@/config/seo';
import { buildInnerPageJsonLd } from '@/lib/seoJsonLd';

const Terms = () => (
  <div className="min-h-screen bg-background text-foreground relative">
    <SeoHead
      title={pageSeo.terms.title}
      description={pageSeo.terms.description}
      path={pageSeo.terms.path}
      jsonLd={buildInnerPageJsonLd({
        title: pageSeo.terms.title,
        description: pageSeo.terms.description,
        path: pageSeo.terms.path,
        breadcrumbs: [
          { name: brand.name, path: '/' },
          { name: 'Terms', path: pageSeo.terms.path },
        ],
      })}
    />
    <Header />
    <main id="main-content" className="container mx-auto px-6 py-24 max-w-2xl" tabIndex={-1}>
      <h1 className="text-4xl font-display font-bold mb-6">Terms of use</h1>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        By using this website you agree not to misuse it or attempt to disrupt its operation. Content on this site is
        provided for general information about Kinet Solutions and may change without notice.
      </p>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        Project work is governed by separate statements of work or agreements between you and Kinet Solutions. Nothing on this
        page replaces those contracts.
      </p>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        For questions about these terms, contact{' '}
        <a className="text-heading underline-offset-4 hover:underline" href="mailto:contact@kinetsolutions.dev">
          contact@kinetsolutions.dev
        </a>
        .
      </p>
      <p className="text-sm text-muted-foreground/80 mb-8">
        Last updated: April 5, 2026
      </p>
      <Link to="/" className="text-heading font-medium hover:underline">
        ← Back to home
      </Link>
    </main>
    <Footer />
  </div>
);

export default Terms;
