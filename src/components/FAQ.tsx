import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/data/faqs';

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto w-full max-w-xl"
        >
          <div className="section-header text-center">
            <h2 className="section-title text-h3 sm:text-h2">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="w-full border-none bg-border-dashed"
              >
                <AccordionTrigger className="w-full text-left text-foreground hover:text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-left text-base leading-6 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
