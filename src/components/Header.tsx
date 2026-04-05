import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'Solutions', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'Tech Stack', href: '/#tech' },
    { label: 'FAQ', href: '/#faq' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const main = document.getElementById('main-content');
    main?.setAttribute('inert', '');

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute('inert');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen || !mobileNavRef.current) return;

    const node = mobileNavRef.current;
    const selector = 'a[href], button:not([disabled])';
    const focusables = () => Array.from(node.querySelectorAll<HTMLElement>(selector));

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const items = focusables();
    items[0]?.focus();

    node.addEventListener('keydown', handleTab);
    return () => {
      node.removeEventListener('keydown', handleTab);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 bg-kinet-nav py-[8px] z-50"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-display font-bold text-white tracking-tight min-h-[44px] min-w-[44px] flex items-center"
          >
            Kinet
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="/#why-kinet"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              Why Us
            </a>
            <a href="/#contact" className="btn-primary text-sm">
              Start Your Vision
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden text-white min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg z-50 -mr-2"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden /> : <Menu className="w-6 h-6" aria-hidden />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileNavRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[56px] bg-kinet-nav z-40 md:hidden flex flex-col"
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-6 pb-8" aria-label="Mobile primary">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-2xl font-display font-semibold text-white hover:text-primary transition-colors min-h-[44px] min-w-[min(100%,280px)] flex items-center justify-center px-4"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/#why-kinet"
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                className="text-2xl font-display font-semibold text-white hover:text-primary transition-colors min-h-[44px] min-w-[min(100%,280px)] flex items-center justify-center px-4"
              >
                Why Us
              </motion.a>
              <motion.a
                href="/#contact"
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (navLinks.length + 1) * 0.1 }}
                className="btn-primary text-lg mt-4 min-h-[48px] inline-flex items-center justify-center px-8"
              >
                Start Your Vision
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
