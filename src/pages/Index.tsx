import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import Process from '@/components/Process';
import Services from '@/components/Services';
import HomeProjects from '@/components/HomeProjects';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PageGridBackground from '@/components/PageGridBackground';
import SeoHead from '@/components/SeoHead';
import SeoJsonLd from '@/components/SeoJsonLd';
import { pageSeo } from '@/config/seo';
import { buildHomeJsonLd } from '@/lib/seoJsonLd';

const Index = () => (
  <div className="min-h-screen bg-background text-foreground relative">
    <SeoHead
      title={pageSeo.home.title}
      description={pageSeo.home.description}
      path={pageSeo.home.path}
      keywords={pageSeo.home.keywords}
      jsonLd={buildHomeJsonLd()}
    />
    <SeoJsonLd />
    <Header />
    <main id="main-content" className="relative" tabIndex={-1}>
      <PageGridBackground />
      <Hero />
      <FeaturedWork />
      <Services />
      <Process />
      <HomeProjects />
      <FAQ />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
