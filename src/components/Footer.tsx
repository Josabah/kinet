import { Github, Linkedin } from 'lucide-react';

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: XLogo, href: 'https://x.com/yosefbabay', label: 'X' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yoseph-abay', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/josabah', label: 'GitHub' },
  ];

  const footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  return (
    <footer className="py-12 bg-kinet-nav">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-display font-bold text-white">
              Kinet
            </span>
            <p className="text-sm text-white/60">
              © {currentYear} Kinet. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
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
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40 font-mono">
            Engineered by Kinet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
