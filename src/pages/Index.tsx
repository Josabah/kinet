import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyKinet from '@/components/WhyKinet';
import Process from '@/components/Process';
import TechStack from '@/components/TechStack';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Subtle grid background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      <Header />
      <main>
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
