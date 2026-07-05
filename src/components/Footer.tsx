import { Link } from 'react-router-dom';
import { footerNavLinks } from '@/config/navigation';
import { useSectionNav } from '@/hooks/useSectionNav';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const handleSectionNav = useSectionNav();

  return (
    <footer className="py-12 bg-kinet-nav">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 text-center">
          <Link
            to="/"
            onClick={() => handleSectionNav('/')}
            className="text-h5 font-display font-bold text-white min-h-12 inline-flex items-center hover:text-white/90 transition-colors"
          >
            Kinet
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 md:gap-x-8">
            {footerNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => handleSectionNav(link.to)}
                className="text-sm sm:text-body text-white/60 hover:text-white transition-colors min-h-10 sm:min-h-12 inline-flex items-center px-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-sm text-white/50">
            © {currentYear} Kinet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
