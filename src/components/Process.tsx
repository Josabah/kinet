import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Cpu, RefreshCw, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Strategize & Blueprint',
    description: 'Deep dive into requirements, architectural design, and UI/UX wireframing to establish a solid foundation.',
    icon: Lightbulb,
  },
  {
    number: '02',
    title: 'AI-Augmented Development',
    description: 'Rapid prototyping with Lovable, smart code generation and optimization with Cursor AI for accelerated delivery.',
    icon: Cpu,
  },
  {
    number: '03',
    title: 'Iterate & Refine',
    description: 'Agile sprints, rigorous testing, and client feedback integration to achieve perfection in every detail.',
    icon: RefreshCw,
  },
  {
    number: '04',
    title: 'Launch & Scale',
    description: 'Seamless deployment to global edge networks, ensuring peak performance and infinite scalability.',
    icon: Rocket,
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(hsl(var(--kinet-text)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Our Streamlined Path to
            <br />
            <span className="text-primary">Digital Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Precision & pace combined to deliver exceptional results, every time.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${index !== 0 ? 'md:mt-16' : ''}`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="card-glass inline-block max-w-md">
                    <div className={`flex items-center gap-4 mb-4 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-mono text-primary font-medium">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30 relative z-10" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
