import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "What services does Kinet offer?",
    answer: "We offer three core services: Branding & Marketing Sites for businesses needing a strong digital presence, MVPs & Startup Solutions for founders ready to validate their ideas quickly, and Full-Scale Applications for enterprises requiring robust, scalable platforms. Check out our Services section above for full details and pricing."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines depend on the service: Branding & Marketing Sites typically take about 1 week. MVPs & Startup projects range from 2-4 weeks depending on complexity and scope. Full-Scale Applications require a custom timeline based on project requirements. We'll provide a detailed schedule during our discovery phase."
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile methodology with four key phases: Discovery (understanding your goals), Design (creating wireframes and prototypes), Development (building your solution with regular check-ins), and Launch (deployment and ongoing support). You'll have visibility throughout the entire process."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Absolutely! We offer comprehensive maintenance and support packages to ensure your application stays up-to-date, secure, and performing optimally. This includes bug fixes, security updates, performance monitoring, and feature enhancements."
  },
  {
    question: "What technologies do you work with?",
    answer: "We work with modern, industry-leading technologies including React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, and cloud platforms like Vercel and Cloudflare. We also leverage AI-powered development tools to accelerate delivery and improve quality."
  },
  {
    question: "How do you handle project pricing?",
    answer: "The prices listed in our Services section reflect typical ranges for each tier. However, we understand every project is unique—pricing can go up or down based on your specific requirements, timeline, and scope. After our initial consultation, we'll provide a transparent proposal tailored to your needs."
  },
  {
    question: "Can you work with our existing team?",
    answer: "Yes! We frequently collaborate with in-house teams, whether it's augmenting your development capacity, providing specialized expertise, or handling specific project components. We adapt to your workflow and communication preferences."
  },
  {
    question: "What makes Kinet different from other agencies?",
    answer: "We combine technical excellence with AI-augmented workflows, enabling faster delivery without compromising quality. Our small, senior team means you work directly with experts who understand both technology and business strategy."
  }
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden bg-muted/30">
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Frequently Asked
            <br />
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers. Find everything you need to know about 
            working with Kinet.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="card-glass border-none px-6 rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 text-base md:text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
