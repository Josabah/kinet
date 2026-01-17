import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Branding & Marketing Sites',
    description: 'High-converting websites that establish your digital presence and drive results.',
    price: '$2,497',
    priceNote: 'starting at',
    popular: false,
    features: [
      'Custom design & branding',
      'Responsive landing pages',
      'SEO optimization',
      'Analytics integration',
      'CMS integration',
      '2-week delivery',
    ],
    stacks: ['Framer', 'Webflow', 'Figma', 'WordPress'],
  },
  {
    name: 'MVPs & Startups',
    description: 'Launch your product fast with a fully functional MVP built for growth.',
    price: '$5,997',
    priceNote: 'starting at',
    popular: true,
    features: [
      '3-4 core features',
      'User authentication',
      'Database integration',
      'Payment processing',
      'Admin dashboard',
      '3-4 week delivery',
    ],
    stacks: ['React', 'Next.js', 'Supabase', 'Stripe'],
  },
  {
    name: 'Full-Scale Applications',
    description: 'Enterprise-grade solutions built for scale, security, and long-term success.',
    price: 'Custom',
    priceNote: 'tailored pricing',
    popular: false,
    features: [
      'Custom architecture',
      'Advanced integrations',
      'Real-time features',
      'CI/CD pipelines',
      'Ongoing support',
      'Dedicated team',
    ],
    stacks: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
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
      {/* Subtle Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, hsl(var(--kinet-indigo) / 0.06), transparent)',
        }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Solutions That Scale
            <br />
            <span className="text-primary">With Your Ambition</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From stunning marketing sites to enterprise applications—choose the path 
            that matches your vision and budget.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.popular 
                  ? 'bg-kinet-nav text-white ring-2 ring-primary shadow-2xl shadow-primary/20 lg:scale-105' 
                  : 'bg-card border border-border'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className={`text-xl font-display font-semibold mb-2 ${
                  plan.popular ? 'text-white' : 'text-foreground'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  plan.popular ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-xs uppercase tracking-wider ${
                  plan.popular ? 'text-white/50' : 'text-muted-foreground'
                }`}>
                  {plan.priceNote}
                </span>
                <div className={`text-4xl font-display font-bold ${
                  plan.popular ? 'text-white' : 'text-foreground'
                }`}>
                  {plan.price}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      plan.popular ? 'text-primary' : 'text-primary'
                    }`} />
                    <span className={`text-sm ${
                      plan.popular ? 'text-white/90' : 'text-foreground'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className={`mb-6 pt-4 border-t ${
                plan.popular ? 'border-white/10' : 'border-border'
              }`}>
                <span className={`text-xs uppercase tracking-wider mb-3 block ${
                  plan.popular ? 'text-white/50' : 'text-muted-foreground'
                }`}>
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {plan.stacks.map((stack) => (
                    <span
                      key={stack}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        plan.popular 
                          ? 'bg-white/10 text-white/90' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={scrollToContact}
                className={`w-full group ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'bg-kinet-nav hover:bg-kinet-nav/90 text-white'
                }`}
                size="lg"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          All plans include dedicated project management and post-launch support.
        </motion.p>
      </div>
    </section>
  );
};

export default Services;
