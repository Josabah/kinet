import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      setFormData(prev => ({ ...prev, projectType: service }));
    }
  }, [location.search]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: '',
      message: '',
      website: '',
    });
    setTouched({});
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    // Mark all fields as touched
    setTouched({ name: true, email: true, projectType: true, message: true });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let result: { success?: boolean; message?: string } = {};
      try {
        result = await response.json();
      } catch {
        // Non-JSON response (e.g. gateway error page)
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
      // Network error (no response: fetch failed, CORS, or no API running e.g. local dev without vercel dev)
      console.error('Submission failed:', error);
      const message = "We couldn't send your message. Please check your connection and try again.";
      setSubmissionError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 50% 80% at 80% 20%, hsl(var(--kinet-indigo) / 0.06), transparent)',
        }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to Accelerate
            <br />
            <span className="text-primary">Your Vision?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Reach out to discuss your project. We're eager to partner with innovators.
          </p>
        </motion.div>

        {/* Contact Form / Thank-you view */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-border bg-card p-8 md:p-10 text-center"
                aria-live="polite"
                role="status"
              >
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                  Message received
                </h3>
                <p className="text-muted-foreground mb-8">
                  We've received your message and will get back to you within 24–48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {submissionError && (
                  <div
                    className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    role="alert"
                    aria-live="polite"
                  >
                    <p className="flex-1">{submissionError}</p>
                    <button
                      type="button"
                      onClick={() => setSubmissionError(null)}
                      className="shrink-0 p-1 rounded hover:bg-destructive/20 transition-colors"
                      aria-label="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <fieldset disabled={isSubmitting} className="space-y-5 border-0 p-0 m-0 min-w-0">
                  <input
                    type="text"
                    name="website"
                    style={{ display: 'none' }}
                    onChange={(e) => handleChange('website', e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`input-dark ${touched.name && errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`input-dark ${touched.email && errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                Company <span className="text-muted-foreground">(Optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="input-dark"
              />
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={(e) => handleChange('projectType', e.target.value)}
                onBlur={() => handleBlur('projectType')}
                className={`input-dark appearance-none cursor-pointer ${touched.projectType && errors.projectType ? 'border-red-500 focus:border-red-500' : ''}`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23efefee'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1rem',
                }}
              >
                <option value="">Select a service</option>
                <option value="branding-marketing">Branding & Marketing Sites</option>
                <option value="mvp-startup">MVPs & Startups</option>
                <option value="full-scale">Full-Scale Applications</option>
              </select>
              {touched.projectType && errors.projectType && (
                <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                className={`input-dark resize-none ${touched.message && errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {touched.message && errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </fieldset>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
