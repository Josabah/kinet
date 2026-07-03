import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[calc(100dvh-3.5rem)] flex items-center py-16 md:py-20"
    >
      <div className="container mx-auto px-6 relative z-10 w-full pt-8 md:pt-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="text-5xl md:text-7xl font-display font-bold text-heading leading-tight mb-6 text-balance"
          >
            Products Founders Rely On
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Design and engineering for founders who care about getting it right the first time.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="flex justify-center"
          >
            <Link
              to="/contact"
              className="btn-primary btn-shimmer inline-flex items-center justify-center min-w-[280px] px-10 py-3.5 text-base"
            >
              Discuss your product
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
      </div>
    </section>
  );
};
export default Hero;
