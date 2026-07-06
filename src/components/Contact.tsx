import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Loader2, Mail, X } from 'lucide-react';
import { siWhatsapp } from 'simple-icons';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CONTACT_DIRECT, PROJECT_TYPE_OPTIONS } from '@/config/contact';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
  existingWebsite: string;
  _hp: string;
}

type StepField = 'name' | 'email' | 'projectType' | 'message' | 'existingWebsite';

type FormStep = {
  field: StepField;
  question: string;
  required: boolean;
};

const FORM_STEPS: FormStep[] = [
  {
    field: 'projectType',
    question: 'What type of product do you need?',
    required: true,
  },
  {
    field: 'name',
    question: "What's your name?",
    required: true,
  },
  {
    field: 'email',
    question: "What's your email?",
    required: true,
  },
  {
    field: 'message',
    question: 'Tell us about your project',
    required: true,
  },
  {
    field: 'existingWebsite',
    question: 'Do you have an existing website?',
    required: false,
  },
];

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

const inputClass = (hasError: boolean) =>
  cn(
    'w-full rounded-xl border bg-white px-4 py-4 text-body text-heading',
    'placeholder:text-muted-foreground/50',
    'transition-colors duration-150',
    'focus:outline-none focus:border-heading focus:ring-[3px] focus:ring-heading/10',
    hasError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/15' : 'border-border',
  );

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d={siWhatsapp.path} />
  </svg>
);

const directChannels = [
  {
    icon: Mail,
    tooltip: `Email: ${CONTACT_DIRECT.email}`,
    href: `mailto:${CONTACT_DIRECT.email}`,
    external: false,
  },
  {
    icon: WhatsAppIcon,
    tooltip: `WhatsApp: ${CONTACT_DIRECT.phone}`,
    href: CONTACT_DIRECT.whatsapp,
    external: true,
  },
  {
    icon: Calendar,
    tooltip: 'Book a discovery call',
    href: CONTACT_DIRECT.calendar,
    external: true,
  },
] as const;

const stepMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

const Contact = () => {
  const ref = useRef(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    message: '',
    existingWebsite: '',
    _hp: '',
  });
  const [stepError, setStepError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const location = useLocation();

  const currentStep = FORM_STEPS[stepIndex];
  const isLastStep = stepIndex === FORM_STEPS.length - 1;
  const showProgress = formData.projectType.trim().length > 0;
  const progress = ((stepIndex + 1) / FORM_STEPS.length) * 100;

  useEffect(() => {
    const service = new URLSearchParams(location.search).get('service');
    if (service) {
      setFormData((prev) => ({ ...prev, projectType: service }));
    }
  }, [location.search]);

  useEffect(() => {
    if (location.pathname !== '/contact') return;

    const focusable = stepRef.current?.querySelector<HTMLElement>(
      'input:not([type="hidden"]), textarea, button[data-choice]',
    );
    focusable?.focus({ preventScroll: true });
  }, [stepIndex, location.pathname]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateStep = useCallback(
    (field: StepField): string | null => {
      const value = formData[field].trim();

      switch (field) {
        case 'name':
          if (!value) return 'Name is required';
          if (value.length < 2) return 'Name must be at least 2 characters';
          return null;
        case 'email':
          if (!value) return 'Email is required';
          if (!validateEmail(value)) return 'Please enter a valid email';
          return null;
        case 'projectType':
          if (!value) return 'Please select a service to continue';
          return null;
        case 'message':
          if (!value) return 'Tell us a bit about your project';
          if (countWords(value) < 10) return 'Please write at least 10 words about your project';
          return null;
        case 'existingWebsite':
          return null;
        default:
          return null;
      }
    },
    [formData],
  );

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (stepError) setStepError(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      projectType: '',
      message: '',
      existingWebsite: '',
      _hp: '',
    });
    setStepIndex(0);
    setStepError(null);
    setSubmissionError(null);
  };

  const goNext = () => {
    if (stepIndex < FORM_STEPS.length - 1) {
      setStepIndex((i) => i + 1);
      setStepError(null);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      setStepError(null);
    }
  };

  const handleContinue = () => {
    const error = validateStep(currentStep.field);
    if (error) {
      setStepError(error);
      return;
    }
    goNext();
  };

  const handleSubmit = async () => {
    setSubmissionError(null);

    for (const step of FORM_STEPS) {
      if (!step.required) continue;
      const error = validateStep(step.field);
      if (error) {
        setStepIndex(FORM_STEPS.indexOf(step));
        setStepError(error);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let result: { success?: boolean; message?: string } = {};
      try {
        result = await response.json();
      } catch {
        result = { success: false, message: 'Something went wrong on our end. Please try again later.' };
      }

      if (!response.ok || !result?.success) {
        const serverMessage =
          typeof result?.message === 'string' && result.message.trim()
            ? result.message.trim()
            : 'Something went wrong on our end. Please try again later.';
        setSubmissionError(serverMessage);
        toast.error(serverMessage);
        return;
      }

      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error('Submission failed:', error);
      const message = "We couldn't send your message. Please check your connection and try again.";
      setSubmissionError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepKeyDown = (e: React.KeyboardEvent) => {
    if (currentStep.field === 'message') {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleContinue();
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (isLastStep) {
        void handleSubmit();
      } else {
        handleContinue();
      }
    }
  };

  const renderStepField = () => {
    const field = currentStep.field;
    const hasError = Boolean(stepError);

    switch (field) {
      case 'name':
        return (
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onKeyDown={handleStepKeyDown}
            className={inputClass(hasError)}
            autoComplete="name"
          />
        );
      case 'email':
        return (
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jane@company.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onKeyDown={handleStepKeyDown}
            className={inputClass(hasError)}
            autoComplete="email"
          />
        );
      case 'projectType':
        return (
          <div className="flex flex-col gap-2" role="listbox" aria-label="What type of product do you need?">
            {PROJECT_TYPE_OPTIONS.map((option) => {
              const selected = formData.projectType === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  data-choice
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    handleChange('projectType', option.value);
                    setStepError(null);
                  }}
                  className={cn(
                    'w-full rounded-xl border px-4 py-4 text-left text-body transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-heading/10',
                    selected
                      ? 'border-heading bg-muted font-medium text-heading'
                      : 'border-border bg-white text-heading hover:border-heading/25 hover:bg-muted/30',
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        );
      case 'message':
        return (
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="What are you building? What problem are you solving? A few sentences helps us prepare."
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onKeyDown={handleStepKeyDown}
            className={cn(inputClass(hasError), 'resize-none leading-relaxed')}
          />
        );
      case 'existingWebsite':
        return (
          <input
            type="url"
            id="existingWebsite"
            name="existingWebsite"
            placeholder="https://"
            value={formData.existingWebsite}
            onChange={(e) => handleChange('existingWebsite', e.target.value)}
            onKeyDown={handleStepKeyDown}
            className={inputClass(false)}
          />
        );
      default:
        return null;
    }
  };

  const DirectContactIcons = ({ className }: { className?: string }) => (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Or reach us via
      </p>
      <ul className="flex items-center justify-center gap-3">
        {directChannels.map((channel) => {
          return (
            <li
              key={channel.tooltip}
              className="relative overflow-visible [&:hover_[data-contact-label]]:opacity-100 [&:focus-within_[data-contact-label]]:opacity-100"
            >
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={channel.tooltip}
                className={cn(
                  'inline-flex size-12 items-center justify-center rounded-xl border border-border bg-white',
                  'text-heading transition-colors duration-150 hover:border-heading/25 hover:bg-muted/40',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading/15 focus-visible:ring-offset-2',
                )}
              >
                {channel.icon === WhatsAppIcon ? (
                  <WhatsAppIcon className="size-5" />
                ) : (
                  (() => {
                    const LucideIcon = channel.icon as typeof Mail;
                    return <LucideIcon className="size-5" strokeWidth={1.75} aria-hidden />;
                  })()
                )}
              </a>
              <span
                data-contact-label
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-[calc(100%+6px)] z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#101828] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150"
              >
                {channel.tooltip}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <section id="contact" className="relative bg-background section-padding">
      <div ref={ref} className="container mx-auto px-6">
        <div className="mx-auto max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-header"
          >
            <h2 className="section-title text-h3 sm:text-h2">
              {stepIndex === 0 ? 'What type of product do you need?' : 'Get in touch'}
            </h2>
            <p className="section-lead mt-4">
              {stepIndex === 0
                ? 'Choose the option that best matches what you have in mind.'
                : 'A few more details and we’ll take it from here.'}
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-white p-8 md:p-12 text-left"
              aria-live="polite"
              role="status"
            >
              <h3 className="text-h4 font-display font-bold text-heading">Inquiry received</h3>
              <p className="mt-4 text-body text-muted-foreground">
                Thanks for reaching out. We&apos;ll review your message and get back to you within one business day.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 text-body font-medium text-heading transition-colors hover:text-heading/70"
              >
                Send another inquiry
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-left"
            >
                  {showProgress && (
                    <div className="mb-8">
                      <div className="mb-2 flex items-center justify-between text-body text-muted-foreground">
                        <span>
                          Step {stepIndex + 1} of {FORM_STEPS.length}
                        </span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-border">
                        <motion.div
                          className="h-full rounded-full bg-heading"
                          initial={false}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  )}

                  {submissionError && (
                    <div
                      className="mb-8 flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-body text-red-700"
                      role="alert"
                      aria-live="polite"
                    >
                      <p className="flex-1">{submissionError}</p>
                      <button
                        type="button"
                        onClick={() => setSubmissionError(null)}
                        className="shrink-0 rounded p-1 hover:bg-red-100"
                        aria-label="Dismiss"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  )}

                  <input
                    type="text"
                    name="_hp"
                    value={formData._hp}
                    onChange={(e) => handleChange('_hp', e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />

                  <div className="min-h-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep.field}
                        ref={stepRef}
                        {...stepMotion}
                        className="space-y-4"
                      >
                        <div>
                          {stepIndex > 0 && (
                            <h3 className="font-sans text-lead font-semibold text-heading">
                              {currentStep.question}
                              {!currentStep.required && (
                                <span className="ml-2 text-body font-normal text-muted-foreground/60">
                                  (optional)
                                </span>
                              )}
                            </h3>
                          )}
                        </div>

                        <div>{renderStepField()}</div>

                        {stepError && (
                          <p className="text-body text-red-500" role="alert">
                            {stepError}
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                    {stepIndex > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        disabled={isSubmitting}
                        className={cn(
                          'inline-flex items-center gap-2 min-h-12 rounded-xl border border-border bg-white px-6',
                          'text-body font-medium text-heading transition-colors hover:bg-muted/40',
                          'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-heading/10',
                          isSubmitting && 'pointer-events-none opacity-50',
                        )}
                      >
                        <ArrowLeft className="size-4" aria-hidden />
                        Back
                      </button>
                    )}

                    <div className="flex flex-wrap items-center gap-4 sm:ml-auto">
                      <button
                        type="button"
                        onClick={isLastStep ? () => void handleSubmit() : handleContinue}
                        disabled={isSubmitting}
                        className={cn(
                          'btn-primary gap-2 px-8',
                          isSubmitting && 'cursor-not-allowed opacity-70',
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" aria-hidden />
                            Sending…
                          </>
                        ) : isLastStep ? (
                          'Send inquiry'
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="size-4" aria-hidden />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

          <DirectContactIcons className="mt-16" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
