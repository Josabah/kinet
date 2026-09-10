import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { scrollToPath } from "@/lib/sectionNavigation";

const Hero = () => {
  const { pathname } = useLocation();

  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-center min-h-dvh pt-24 pb-8"
    >
      <div className="hero-field" aria-hidden="true" />
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="relative flex min-h-[calc(100dvh-8rem)] items-start justify-center pt-8 -translate-y-0 md:items-center md:pt-0 md:-translate-y-6">
          <div className="hero-copy relative z-10 mx-auto max-w-2xl text-center">
            <motion.h1
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-h3 sm:text-h2 md:text-h1 font-display font-bold text-heading mb-4 md:mb-6"
            >
              Products
              <br />
              <span className="sm:whitespace-nowrap">Founders Rely On</span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-lead text-muted-foreground max-w-hero mx-auto mb-8 md:mb-12"
            >
              Design and engineering for founders building software products that matter.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
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
                className="btn-primary btn-shimmer w-full max-w-sm px-8 md:w-auto md:min-w-[280px]"
              >
                Discuss your product
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
