import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const navLinks = [
    { label: 'Process', to: '/process' },
    { label: 'Capabilities', to: '/capabilities' },
    { label: 'FAQ', to: '/faq' },
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
    if (isMobileMenuOpen) return;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      if (currentScrollY < 16) {
        setIsHeaderVisible(true);
      } else if (scrollingDown && currentScrollY > 72) {
        setIsHeaderVisible(false);
      } else if (!scrollingDown) {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: 1,
          y: isHeaderVisible || isMobileMenuOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border py-[8px] z-50"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-display font-bold text-heading tracking-tight min-h-[44px] min-w-[44px] flex items-center"
          >
            Kinet
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-heading transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-heading transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/why-kinet"
              className="text-sm font-medium text-muted-foreground hover:text-heading transition-colors duration-200"
            >
              Why Us
            </Link>
            <Link to="/contact" className="btn-primary text-sm">
              Start Your Vision
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden text-heading min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg z-50 -mr-2"
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
            className="fixed inset-0 top-[56px] bg-background z-40 md:hidden flex flex-col border-t border-border"
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-6 pb-8" aria-label="Mobile primary">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-2xl font-display font-semibold text-heading hover:text-primary transition-colors min-h-[44px] min-w-[min(100%,280px)] flex items-center justify-center px-4"
                >
                  <Link
                    to={link.to}
                    onClick={handleLinkClick}
                    className="text-2xl font-display font-semibold text-heading hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                className="text-2xl font-display font-semibold text-heading hover:text-primary transition-colors min-h-[44px] min-w-[min(100%,280px)] flex items-center justify-center px-4"
              >
                <Link
                  to="/why-kinet"
                  onClick={handleLinkClick}
                  className="text-2xl font-display font-semibold text-heading hover:text-primary transition-colors"
                >
                  Why Us
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (navLinks.length + 1) * 0.1 }}
                className="mt-4 min-h-[48px] inline-flex items-center justify-center px-8"
              >
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="btn-primary text-lg min-h-[48px] inline-flex items-center justify-center px-8"
                >
                  Start Your Vision
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
