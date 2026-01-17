import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash.includes('service=')) {
      const service = hash.split('service=')[1];
      if (service) {
        setSelectedService(service);
      }
    }
  }, [location.hash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after 3 seconds for demo
    setTimeout(() => setSubmitted(false), 3000);
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

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  required
                  className="input-dark"
                />
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
                  required
                  className="input-dark"
                />
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
                required
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="input-dark appearance-none cursor-pointer"
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
                required
                className="input-dark resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitted}
              className={`btn-primary w-full flex items-center justify-center gap-2 ${
                submitted ? 'bg-green-600 border-green-600' : ''
              }`}
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Get a Quote
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
