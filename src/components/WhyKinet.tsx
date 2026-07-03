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
    <section id="why-kinet" className="py-20 md:py-28 lg:py-36 relative">
      <div ref={ref} className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.header
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-center mb-10 md:mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-heading leading-[1.1] tracking-tight mb-5">
            A different way to build products.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Building software is straightforward. Building products people can rely on requires a different mindset.
          </p>
        </motion.header>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.06 }}
          className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4 text-center"
        >
          <p className="text-xs sm:text-sm font-medium text-foreground/60 tracking-wide">Typical approach</p>
          <p className="text-xs sm:text-sm font-semibold text-heading tracking-wide">The Kinet approach</p>
        </motion.div>

        <div className="space-y-2 md:space-y-2.5 max-w-4xl mx-auto">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.common}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + index * 0.05 }}
              className="grid grid-cols-2 gap-2 md:gap-3"
            >
              <div className="flex items-center justify-center rounded-xl md:rounded-2xl border border-border bg-muted/60 px-3.5 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 text-center">
                <p className="text-[13px] sm:text-sm md:text-base text-foreground/75 leading-snug">{item.common}</p>
              </div>

              <div
                className={cn(
                  'flex items-center justify-center rounded-xl md:rounded-2xl border border-border bg-card px-3.5 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5 text-center',
                  'border-l-2 border-l-primary/35',
                  'transition-colors duration-200 hover:bg-primary/[0.02]',
                )}
              >
                <p className="text-[13px] sm:text-sm md:text-base text-heading font-semibold leading-snug">
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
