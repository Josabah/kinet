import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Loader2, Mail, MessageCircle, X } from 'lucide-react';
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

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

const inputClass = (hasError: boolean) =>
  cn(
    'w-full rounded-2xl border bg-white px-4 py-3.5 text-[15px] text-heading',
    'placeholder:text-muted-foreground/50',
    'transition-colors duration-150',
    'focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/15',
    hasError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/15' : 'border-border',
  );

const labelClass = 'mb-2 block text-sm font-medium text-heading';

const directChannels = [
  {
    icon: Mail,
    title: 'Email',
    description: CONTACT_DIRECT.email,
    href: `mailto:${CONTACT_DIRECT.email}`,
    external: false,
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Continue the conversation on WhatsApp.',
    href: CONTACT_DIRECT.whatsapp,
    external: true,
  },
  {
    icon: Calendar,
    title: 'Discovery Call',
    description: 'Schedule a 30-minute call.',
    href: CONTACT_DIRECT.calendar,
    external: true,
  },
] as const;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const service = new URLSearchParams(location.search).get('service');
    if (service) {
      setFormData((prev) => ({ ...prev, projectType: service }));
    }
  }, [location.search]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select an option';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Tell us a bit about your project';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please share a few more details';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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
    setTouched({});
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    setTouched({ name: true, email: true, projectType: true, message: true });

    if (!validateForm()) return;

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

  const DirectContactOptions = ({ className }: { className?: string }) => (
    <div className={className}>
      <p className="mb-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Or reach us directly
      </p>
      <div className="flex flex-col gap-3">
        {directChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.title}
              href={channel.href}
              {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={cn(
                'group flex flex-col rounded-2xl border border-border bg-white p-5',
                'transition-colors duration-150 hover:border-border hover:bg-muted/40',
              )}
            >
              <span className="mb-3 flex size-9 items-center justify-center rounded-xl border border-border bg-muted/30 text-heading">
                <Icon className="size-4" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-sm font-medium text-heading">{channel.title}</span>
              <span className="mt-1 text-sm leading-relaxed text-muted-foreground group-hover:text-muted-foreground">
                {channel.description}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="contact" className="relative border-t border-border bg-background py-24 md:py-32 lg:py-36">
      <div ref={ref} className="container mx-auto px-6">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-20 xl:gap-24">
            {/* Left — headline + form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-12 max-w-xl"
              >
                <h2 className="text-4xl font-display font-bold leading-[1.1] tracking-tight text-heading md:text-5xl">
                  Tell us what you&apos;re building.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  Whether it&apos;s a new product, an existing platform, or just an idea you&apos;re exploring,
                  we&apos;d love to hear about it.
                </p>
              </motion.div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xl rounded-2xl border border-border bg-white p-10"
                  aria-live="polite"
                  role="status"
                >
                  <h3 className="text-2xl font-display font-bold text-heading">Inquiry received</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Thanks for reaching out. We&apos;ll review your message and get back to you within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  onSubmit={handleSubmit}
                  className="max-w-xl space-y-7"
                >
                  {submissionError && (
                    <div
                      className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
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

                  <fieldset disabled={isSubmitting} className="m-0 min-w-0 space-y-7 border-0 p-0">
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

                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        className={inputClass(Boolean(touched.name && errors.name))}
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={inputClass(Boolean(touched.email && errors.email))}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="projectType" className={labelClass}>
                        What are you building?
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={(e) => handleChange('projectType', e.target.value)}
                        onBlur={() => handleBlur('projectType')}
                        className={cn(
                          inputClass(Boolean(touched.projectType && errors.projectType)),
                          'cursor-pointer appearance-none bg-white pr-10',
                        )}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2398A2B3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1rem',
                        }}
                      >
                        <option value="">Select an option</option>
                        {PROJECT_TYPE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {touched.projectType && errors.projectType && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.projectType}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Tell us about your project
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="What are you building? What problem are you solving? Share as much or as little as you'd like."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        className={cn(inputClass(Boolean(touched.message && errors.message)), 'resize-none leading-relaxed')}
                      />
                      {touched.message && errors.message && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="existingWebsite" className={labelClass}>
                        Existing website{' '}
                        <span className="font-normal text-muted-foreground">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        id="existingWebsite"
                        name="existingWebsite"
                        placeholder="https://"
                        value={formData.existingWebsite}
                        onChange={(e) => handleChange('existingWebsite', e.target.value)}
                        className={inputClass(false)}
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          'inline-flex items-center justify-center gap-2 rounded-2xl bg-[#111827] px-7 py-3.5',
                          'text-[15px] font-medium text-white transition-colors duration-150',
                          'hover:bg-[#1a2332] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/25',
                          isSubmitting && 'cursor-not-allowed opacity-70',
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="size-4 animate-spin" aria-hidden />
                            Sending…
                          </>
                        ) : (
                          'Send inquiry'
                        )}
                      </button>
                    </div>
                  </fieldset>
                </motion.form>
              )}

              {/* Mobile — direct contact below form */}
              <DirectContactOptions className="mt-20 lg:hidden" />
            </div>

            {/* Desktop — direct contact in right column */}
            <DirectContactOptions className="hidden lg:block lg:pt-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
