import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const comparisons = [
  {
    common: 'Build what\u2019s requested',
    kinet: 'Challenge ideas before writing code',
  },
  {
    common: 'Focus on shipping',
    kinet: 'Focus on building the right product',
  },
  {
    common: 'Deliver projects',
    kinet: 'Stay invested after launch',
  },
  {
    common: 'Optimize for deadlines',
    kinet: 'Optimize for long-term maintainability',
  },
  {
    common: 'Treat development as tasks',
    kinet: 'Take ownership of outcomes',
  },
  {
    common: 'Build to meet the requirements',
    kinet: 'Build to support the business behind them',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const WhyKinet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why-kinet" className="section-padding relative">
      <div ref={ref} className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.header
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-prose mx-auto text-center section-header"
        >
          <h2 className="section-title text-h3 sm:text-h2">
            A different way to build products.
          </h2>
          <p className="section-lead">
            Building software is straightforward. Building products people can rely on requires a different mindset.
          </p>
        </motion.header>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
          className="grid grid-cols-2 gap-4 mb-4 text-center"
        >
          <p className="text-body font-medium text-foreground/60">Typical approach</p>
          <p className="text-body font-semibold text-heading">The Kinet approach</p>
        </motion.div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.common}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + index * 0.05 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center justify-center rounded-xl md:rounded-2xl border border-border bg-muted/60 px-4 py-4 sm:px-6 sm:py-6 text-center">
                <p className="text-body text-foreground/75">{item.common}</p>
              </div>

              <div
                className={cn(
                  'flex items-center justify-center rounded-xl md:rounded-2xl border border-border bg-card px-4 py-4 sm:px-6 sm:py-6 text-center',
                  'border-l-2 border-l-primary/35',
                  'transition-colors duration-200 hover:bg-primary/[0.02]',
                )}
              >
                <p className="text-body text-heading font-semibold">
                  {item.kinet}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyKinet;
