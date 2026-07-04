import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyKinet from '@/components/WhyKinet';
import Process from '@/components/Process';
import Capabilities from '@/components/Capabilities';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SeoJsonLd from '@/components/SeoJsonLd';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Helmet>
        <title>Kinet | MVP &amp; Custom AI Development Studio</title>
        <meta
          name="description"
          content="Ship MVPs, marketing sites, and enterprise web apps in weeks. AI-augmented product studio with fixed pricing and a senior team, from discovery to launch."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://kinetsolutions.dev" />
      </Helmet>
      <SeoJsonLd />
      <Header />
      <main id="main-content" className="relative" tabIndex={-1}>
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.008) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.008) 1px, transparent 1px)
          `,
            backgroundSize: '32px 32px'
          }}
        />
        <Hero />
        <Process />
        <Capabilities />
        <WhyKinet />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
