export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'How much does a project typically cost?',
    answer:
      "Every product is different. After a discovery call, we'll give you a clear proposal with scope, timeline, and pricing—no surprises.",
  },
  {
    question: 'How long does a project take?',
    answer:
      "Most projects take between 6–16 weeks, depending on complexity. We'll define milestones before development begins.",
  },
  {
    question: 'Can you work with our existing team?',
    answer:
      'Yes. We often collaborate with founders, in-house teams, and external designers instead of replacing them.',
  },
  {
    question: 'Do you only work with startups?',
    answer:
      'No. We work with startups, growing businesses, and established companies that need reliable product engineering.',
  },
  {
    question: 'What happens after launch?',
    answer:
      "Launch is the beginning, not the end. We stay available for improvements, maintenance, and future iterations as your product evolves.",
  },
  {
    question: 'Can you work with our existing technology?',
    answer:
      "Usually, yes. We prefer modern technologies, but we're comfortable joining existing products when it makes sense.",
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      "Absolutely. If your project requires one, we're happy to sign before discussing the details.",
  },
  {
    question: 'How do we get started?',
    answer:
      "Book a discovery call. We'll understand your product, discuss goals, and recommend the best path forward.",
  },
];
