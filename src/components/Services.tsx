import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Rocket, Gauge } from 'lucide-react';

const services = [
  {
    title: 'Custom Web & SaaS Development',
    description: 'From complex B2B platforms to engaging consumer applications. We architect and build scalable solutions that drive business growth.',
    icon: Code2,
  },
  {
    title: 'AI Integration & Automation',
    description: 'Embedding intelligent features and optimizing workflows with cutting-edge AI. Transform your operations with smart automation.',
    icon: Brain,
  },
  {
    title: 'MVP & Product Launch',
    description: 'Rapid development of market-ready Minimum Viable Products. Get your startup from idea to launch in record time.',
    icon: Rocket,
  },
  {
    title: 'Performance Optimization',
    description: 'Enhancing speed, security, and scalability for existing platforms. Make your application faster and more reliable.',
    icon: Gauge,
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 20% 80%, hsl(var(--kinet-indigo) / 0.04), transparent)',
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
            Transforming Ideas into
            <br />
            <span className="text-primary">Digital Realities</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive services tailored to accelerate your digital transformation 
            and deliver measurable business impact.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glass group relative overflow-hidden"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
