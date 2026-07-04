import { Github, Linkedin, Mail } from 'lucide-react';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'w-5 h-5'} fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Mail, href: 'mailto:contact@kinetsolutions.dev', label: 'Email' },
    { icon: XLogo, href: 'https://x.com/yosefbabay', label: 'X' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/yoseph-abay', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/josabah', label: 'GitHub' },
  ];

  const footerLinks = [{ label: 'Contact us', href: '/contact' }];

  return (
    <footer className="py-16 bg-kinet-nav">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center gap-4">
            <a href="/" className="text-h5 font-display font-bold text-white min-h-12 inline-flex items-center hover:text-white/90 transition-colors">
              Kinet
            </a>
            <p className="text-body text-white/60">
              © {currentYear} Kinet. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-body text-white/60 hover:text-white transition-colors min-h-12 inline-flex items-center px-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Links */}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
