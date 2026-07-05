import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerNavLinks, legalNavLinks } from '@/config/navigation';
import { useSectionNav } from '@/hooks/useSectionNav';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'w-5 h-5'} fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const handleSectionNav = useSectionNav();

  const socialLinks = [
    { icon: Mail, href: 'mailto:contact@kinetsolutions.dev', label: 'Email' },
    { icon: XLogo, href: 'https://x.com/yosefbabay', label: 'X' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/yoseph-abay', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/josabah', label: 'GitHub' },
  ];

  return (
    <footer className="py-16 bg-kinet-nav">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/"
              onClick={() => handleSectionNav('/')}
              className="text-h5 font-display font-bold text-white min-h-12 inline-flex items-center hover:text-white/90 transition-colors"
            >
              Kinet
            </Link>
            <p className="text-body text-white/60">
              © {currentYear} Kinet. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {footerNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => handleSectionNav(link.to)}
                className="text-body text-white/60 hover:text-white transition-colors min-h-12 inline-flex items-center px-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="min-h-12 min-w-12 inline-flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <social.icon className="w-5 h-5" aria-hidden />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white/50">
            {legalNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-white/80 transition-colors min-h-10 inline-flex items-center px-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
