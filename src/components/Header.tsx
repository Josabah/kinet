import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { CONTACT_DIRECT } from '@/config/contact';
import { primaryNavLinks } from '@/config/navigation';
import { useSectionNav } from '@/hooks/useSectionNav';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const navLinks = primaryNavLinks;

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSectionNav = useSectionNav(handleLinkClick);

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
        className="fixed top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-sm border-b border-border z-50"
      >
        <div className="container mx-auto px-6 h-full">
          <div className="grid h-full grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Group 1 — logo */}
            <Link
              to="/"
              onClick={() => handleSectionNav('/')}
              className="justify-self-start text-h5 font-display font-bold text-heading min-h-12 min-w-12 flex items-center shrink-0"
            >
              Kinet
            </Link>

            {/* Group 2 — navigation cluster */}
            <nav
              className="hidden md:flex items-center justify-center gap-5 lg:gap-7 justify-self-center"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => handleSectionNav(link.to)}
                  className="text-body font-medium text-muted-foreground hover:text-heading transition-colors duration-200 relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-heading transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Group 3 — book a meeting */}
            <div className="justify-self-end flex items-center shrink-0 md:col-start-3">
              <a
                href={CONTACT_DIRECT.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hidden md:inline-flex text-sm min-h-10 px-4 whitespace-nowrap"
              >
                Book A Meeting
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                className="md:hidden text-heading min-h-12 min-w-12 inline-flex items-center justify-center rounded-lg"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden /> : <Menu className="w-6 h-6" aria-hidden />}
              </button>
            </div>
          </div>
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
            className="fixed inset-0 top-16 bg-background z-40 md:hidden flex flex-col border-t border-border"
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-4 px-6 pb-8" aria-label="Mobile primary">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-h4 font-display font-semibold text-heading hover:text-heading/70 transition-colors min-h-12 min-w-[min(100%,280px)] flex items-center justify-center px-4"
                >
                  <Link
                    to={link.to}
                    onClick={() => handleSectionNav(link.to)}
                    className="text-h4 font-display font-semibold text-heading hover:text-heading/70 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                className="mt-8 min-h-12 inline-flex items-center justify-center px-8"
              >
                <a
                  href={CONTACT_DIRECT.calendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="btn-primary text-body px-8"
                >
                  Book A Meeting
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
