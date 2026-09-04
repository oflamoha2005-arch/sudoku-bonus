import { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { BrandSymbol, ArrowRight } from './icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-md shadow-sm border-b border-cocoa/10 py-3 sm:py-4'
            : 'bg-cream/60 backdrop-blur-sm py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo (Left) */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-cocoa focus:outline-none"
            aria-label={`${siteConfig.brand.name} homepage`}
          >
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-cocoa group-hover:text-ochre transition-colors">
              {siteConfig.brand.name}
            </span>
            <span
              className="text-ochre text-lg sm:text-xl transform group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300 select-none"
              aria-hidden="true"
            >
              {siteConfig.brand.symbol}
            </span>
          </a>

          {/* Desktop Nav Links (Center) */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9 text-[15px] font-medium text-cocoa/85"
            aria-label="Primary Navigation"
          >
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-ochre transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-ochre hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA (Right) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#books"
              className="inline-flex items-center gap-2 bg-ochre hover:bg-ochre-dark text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Explore Books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-lg hover:bg-cocoa/5 focus:outline-none z-50"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            <span
              className={`w-5 h-[2px] bg-cocoa transition-all duration-300 transform ${
                isOpen ? 'rotate-45 translate-y-[8px]' : ''
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-cocoa transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-cocoa transition-all duration-300 transform ${
                isOpen ? '-rotate-45 -translate-y-[8px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer / Overlay */}
      <div
        className={`fixed inset-0 bg-cream/95 backdrop-blur-lg z-30 flex flex-col justify-center px-8 md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 text-left" aria-label="Mobile Navigation">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-cocoa/10">
            <BrandSymbol className="w-6 h-6 text-ochre" />
            <span className="font-display text-2xl font-bold text-cocoa">
              {siteConfig.brand.name}
            </span>
          </div>

          {siteConfig.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="font-display text-2xl font-semibold text-cocoa hover:text-ochre transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-6 pt-6 border-t border-cocoa/10">
            <a
              href="#books"
              onClick={closeMenu}
              className="inline-flex items-center justify-center gap-2 w-full bg-ochre hover:bg-ochre-dark text-white font-medium text-base py-3.5 rounded-full shadow transition-colors"
            >
              <span>Explore Books</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
