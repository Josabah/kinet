import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Branding & Marketing',
    price: '$2,497',
    priceNote: 'starting at',
    features: ['Custom design', 'Landing pages', 'SEO & Analytics', '2-week delivery'],
  },
  {
    name: 'MVPs & Startups',
    price: '$5,997',
    priceNote: 'starting at',
    popular: true,
    features: ['Core features', 'Auth & Database', 'Payments', '3-4 weeks'],
  },
  {
    name: 'Full-Scale Apps',
    price: 'Custom',
    priceNote: 'tailored',
    features: ['Custom architecture', 'Integrations', 'Ongoing support', 'Dedicated team'],
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-muted relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, hsl(var(--kinet-indigo) / 0.06), transparent)',
        }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Solutions That Scale
            <br />
            <span className="text-primary">With Your Ambition</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the path that matches your vision and budget.
          </p>
        </motion.div>

        {/* Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl p-5 flex flex-col ${
                plan.popular 
                  ? 'bg-kinet-nav text-white ring-2 ring-primary' 
                  : 'bg-card border border-border'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <h3 className={`text-base font-display font-semibold mb-1 ${
                plan.popular ? 'text-white' : 'text-foreground'
              }`}>
                {plan.name}
              </h3>

              <div className="mb-4">
                <span className={`text-[10px] uppercase tracking-wider ${
                  plan.popular ? 'text-white/50' : 'text-muted-foreground'
                }`}>
                  {plan.priceNote}
                </span>
                <div className={`text-2xl font-display font-bold ${
                  plan.popular ? 'text-white' : 'text-foreground'
                }`}>
                  {plan.price}
                </div>
              </div>

              <ul className="space-y-2 mb-4 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 text-primary" />
                    <span className={`text-xs ${
                      plan.popular ? 'text-white/90' : 'text-foreground'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                size="sm"
                className={`w-full group ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'bg-kinet-nav hover:bg-kinet-nav/90 text-white'
                }`}
              >
                Get Started
                <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
