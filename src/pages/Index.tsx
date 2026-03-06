import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyKinet from '@/components/WhyKinet';
import Process from '@/components/Process';
import TechStack from '@/components/TechStack';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const PATH_TO_SECTION_ID: Record<string, string> = {
  '/services': 'services',
  '/process': 'process',
  '/tech': 'tech',
  '/why-kinet': 'why-kinet',
  '/contact': 'contact',
};

const Index = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = PATH_TO_SECTION_ID[pathname];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <Header />
      <main className="relative">
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
        <Services />
        <WhyKinet />
        <Process />
        <TechStack />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
