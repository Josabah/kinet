import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
const Hero = () => {
  return (
    <section className="py-24 md:py-32 bg-muted relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--kinet-text)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--kinet-text)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--kinet-indigo) / 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--kinet-indigo) / 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Data Stream Lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: "-100%",
            }}
            animate={{
              opacity: [0, 0.3, 0],
              x: "200%",
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              width: "60%",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Product Studio</span>
          </motion.div>

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
            className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6"
          >
            Accelerate Innovation.
            <br />
            <span className="text-primary">Deliver Impeccable Software.</span>
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
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Kinet engineers transformative web applications and AI-powered solutions, propelling your vision from
            concept to market at unparalleled speed.
          </motion.p>

          {/* CTAs */}
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#services" className="btn-primary inline-flex items-center gap-2 group">
              Explore Our Capabilities
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#process" className="btn-outline">
              See Our Process
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
      </div>
    </section>
  );
};
export default Hero;
