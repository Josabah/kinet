import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => (
  <div className="min-h-screen bg-background text-foreground relative">
    <Helmet>
      <title>Privacy | Kinet</title>
      <meta
        name="description"
        content="How Kinet collects and uses information when you visit kinetsolutions.dev or contact us."
      />
      <link rel="canonical" href="https://kinetsolutions.dev/privacy" />
    </Helmet>
    <Header />
    <main id="main-content" className="container mx-auto px-6 py-24 max-w-2xl" tabIndex={-1}>
      <h1 className="text-4xl font-display font-bold mb-6">Privacy</h1>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        This page describes how we handle information you share when you use this site or reach out through our contact
        form. We collect only what is needed to respond to inquiries and operate the service, and we do not sell personal
        data.
      </p>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        If you have questions about privacy or want to request access or deletion of your data, email us at{' '}
        <a className="text-primary underline-offset-4 hover:underline" href="mailto:yosefabay03@gmail.com">
          yosefabay03@gmail.com
        </a>
        .
      </p>
      <p className="text-sm text-muted-foreground/80 mb-8">
        Last updated: April 5, 2026
      </p>
      <Link to="/" className="text-primary font-medium hover:underline">
        ← Back to home
      </Link>
    </main>
    <Footer />
  </div>
);

export default Privacy;
