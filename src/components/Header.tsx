import { motion } from 'framer-motion';
const Header = () => {
  const navLinks = [{
    label: 'Solutions',
    href: '#services'
  }, {
    label: 'Process',
    href: '#process'
  }, {
    label: 'Tech Stack',
    href: '#tech'
  }];
  return <motion.header initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.6,
    ease: 'easeOut'
  }} className="relative bg-kinet-nav py-[8px]">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-display font-bold text-white tracking-tight">
          Kinet
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <a key={link.label} href={link.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </a>)}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#why-kinet" className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200">
            Why Us
          </a>
          <a href="#contact" className="btn-primary text-sm">
            Start Your Vision
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.header>;
};
export default Header;