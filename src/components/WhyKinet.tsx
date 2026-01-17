import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, Check } from 'lucide-react';

const comparisons = [
  {
    traditional: "6-12 months of development time",
    kinet: "MVP ready in 2-4 weeks"
  },
  {
    traditional: "£50,000+ for a basic MVP",
    kinet: "Fixed pricing starting at £950"
  },
  {
    traditional: "Hiring 3-5 developers at £100k+/year each",
    kinet: "Senior experts handle everything"
  },
  {
    traditional: "Endless meetings and slow progress",
    kinet: "48-hour updates and rapid iterations"
  },
  {
    traditional: "Outdated tech and technical debt",
    kinet: "AI-augmented workflows, future-proof stack"
  },
  {
    traditional: "Devs who don't understand business goals",
    kinet: "Experts in both technology and business strategy"
  }
];

const WhyKinet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-kinet" className="py-20 md:py-28 relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-4">
            MVPs are expensive (it's not your fault)
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Why <span className="text-primary">Kinet</span>?
          </h2>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Traditional Approach
              </h3>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary">
                With Kinet
              </h3>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-6">
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12"
              >
                {/* Traditional */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg">
                    {item.traditional}
                  </p>
                </div>

                {/* Kinet */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border border-accent/20">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <p className="text-foreground font-medium text-base md:text-lg">
                    {item.kinet}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyKinet;
