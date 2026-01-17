import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Shield, Cpu, Layers, Database, Globe, Cloud, Sparkles, Code } from 'lucide-react';

const technologies = [
  {
    name: 'React',
    description: 'Component-based architecture for scalable UIs',
    icon: Layers,
  },
  {
    name: 'Next.js',
    description: 'Full-stack React framework with SSR & SSG',
    icon: Zap,
  },
  {
    name: 'TypeScript',
    description: 'Type-safe development at enterprise scale',
    icon: Shield,
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first styling for rapid development',
    icon: Code,
  },
  {
    name: 'Supabase',
    description: 'Open-source Firebase alternative with PostgreSQL',
    icon: Database,
  },
  {
    name: 'Vercel',
    description: 'Edge deployment for optimal performance',
    icon: Globe,
  },
  {
    name: 'Cloudflare',
    description: 'Global CDN & DDoS protection',
    icon: Cloud,
  },
];

const aiTools = [
  {
    name: 'Cursor AI',
    description: 'Intelligent code generation & refactoring for accelerated development workflows',
    icon: Cpu,
  },
  {
    name: 'Lovable',
    description: 'Lightning-fast UI prototyping & iteration for rapid design-to-code pipelines',
    icon: Sparkles,
  },
];

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="tech" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, hsl(var(--kinet-indigo) / 0.05), transparent)',
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
            Engineered for Performance.
            <br />
            <span className="text-primary">Built for Tomorrow.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our meticulously curated technology stack and AI-augmented workflows ensure your 
            product is scalable, secure, and future-proof.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glass group"
            >
              <tech.icon className="w-8 h-8 text-primary mb-4 transition-transform group-hover:scale-110" />
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {tech.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* AI Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-center text-sm font-semibold text-primary uppercase tracking-wider mb-8">
            Powered by Advanced AI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="card-glass relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <tool.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-semibold text-foreground mb-2">
                      {tool.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
