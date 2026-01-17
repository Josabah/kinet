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
    <section id="services" className="py-16 md:py-20 relative overflow-hidden">
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
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
              className={`relative rounded-2xl p-8 flex flex-col transition-shadow duration-300 cursor-pointer ${
                plan.popular 
                  ? 'bg-kinet-nav text-white ring-2 ring-primary shadow-2xl shadow-primary/20 lg:scale-105 hover:shadow-primary/40 hover:ring-primary/80' 
                  : 'bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.3, type: "spring" }}
                >
                  <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </motion.div>
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
                <motion.div 
                  className={`text-4xl font-display font-bold ${
                    plan.popular ? 'text-white' : 'text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {plan.price}
                </motion.div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={feature} 
                    className="flex items-start gap-3 group/feature"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.15 + featureIndex * 0.05 + 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-primary' : 'text-primary'
                      }`} />
                    </motion.div>
                    <span className={`text-sm transition-colors duration-200 ${
                      plan.popular ? 'text-white/90 group-hover/feature:text-white' : 'text-foreground group-hover/feature:text-primary'
                    }`}>
                      {feature}
                    </span>
                  </motion.li>
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
                  {plan.stacks.map((stack, stackIndex) => (
                    <motion.span
                      key={stack}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.15 + stackIndex * 0.05 + 0.5 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium cursor-default transition-colors duration-200 ${
                        plan.popular 
                          ? 'bg-white/10 text-white/90 hover:bg-white/20' 
                          : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {stack}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={scrollToContact}
                  className={`w-full group overflow-hidden relative ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'bg-kinet-nav hover:bg-kinet-nav/90 text-white'
                  }`}
                  size="lg"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.div>
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
