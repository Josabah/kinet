import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { scrollToPath } from "@/lib/sectionNavigation";

const Hero = () => {
  const { pathname } = useLocation();

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-center pt-24 pb-10 sm:pt-28 sm:pb-12 md:min-h-[calc(100dvh-4rem)] md:py-24"
    >
      <div className="container mx-auto px-6 relative z-10 w-full">
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
            className="text-h3 sm:text-h2 md:text-h1 font-display font-bold text-heading text-balance mb-4 md:mb-6"
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
            className="text-lead text-muted-foreground max-w-hero mx-auto mb-8 md:mb-12"
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
              onClick={() => {
                if (pathname === '/contact') {
                  scrollToPath('/contact');
                }
              }}
              className="btn-primary btn-shimmer min-w-[280px] px-8"
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
