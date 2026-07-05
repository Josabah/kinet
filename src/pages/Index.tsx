import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import WhyKinet from '@/components/WhyKinet';
import Process from '@/components/Process';
import Services from '@/components/Services';
import HomeProjects from '@/components/HomeProjects';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageGridBackground from '@/components/PageGridBackground';
import SeoJsonLd from '@/components/SeoJsonLd';
import { siteSeo, SITE_URL } from '@/config/seo';
import { scrollToPath } from '@/lib/sectionNavigation';

const Index = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToPath(pathname, 'smooth');
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Helmet>
        <title>{siteSeo.title}</title>
        <meta name="description" content={siteSeo.description} />
        <meta name="keywords" content={siteSeo.keywords} />
        <meta property="og:title" content={siteSeo.title} />
        <meta property="og:description" content={siteSeo.description} />
        <meta property="og:image:alt" content={siteSeo.ogImageAlt} />
        <meta name="twitter:title" content={siteSeo.title} />
        <meta name="twitter:description" content={siteSeo.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
      </Helmet>
      <SeoJsonLd />
      <Header />
      <main id="main-content" className="relative" tabIndex={-1}>
        <PageGridBackground />
        <Hero />
        <FeaturedWork />
        <Services />
        <Process />
        <WhyKinet />
        <HomeProjects />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
