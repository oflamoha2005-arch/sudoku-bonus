import React, { useState } from 'react';

interface HeaderProps {
  onExploreBooks?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onExploreBooks }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Books', href: '#featured-books' },
    { label: 'Categories', href: '#puzzles' },
    { label: 'About', href: '#story' },
    { label: 'Vision', href: '#vision' },
  ];

  return (
    <header className="w-full px-6 sm:px-10 lg:px-16 pt-8 pb-4 transition-all relative z-40">
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          className="flex items-center gap-1.5 text-2xl lg:text-3xl font-black tracking-tight text-[#131C24] group cursor-pointer"
          href="#hero"
        >
          <span>Oufellia</span>
          <span className="text-xl lg:text-2xl text-[#131C24] inline-block transition-transform duration-300 group-hover:rotate-45">
            ✦
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-3 font-semibold text-[15px]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className="px-4 py-2 rounded-full text-[#131C24]/80 hover:text-[#131C24] hover:bg-white/20 transition cursor-pointer"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Header Action Pill Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <a
            className="pill-press inline-flex items-center gap-2 bg-[#E39414] hover:bg-[#D5870B] text-[#131C24] font-bold px-5 sm:px-6 py-2.5 rounded-full text-sm lg:text-[15px] border border-white/40 shadow-pill cursor-pointer"
            href="#featured-books"
            onClick={onExploreBooks}
          >
            <span>Explore Books</span>
            <span className="text-base font-bold">→</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden p-2 text-[#131C24] focus:outline-none cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-[2.5px] w-full bg-[#131C24] rounded transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`h-[2.5px] w-full bg-[#131C24] rounded transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-[2.5px] w-full bg-[#131C24] rounded transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-6 glass-card rounded-3xl flex flex-col gap-4 shadow-glass animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className="text-lg font-bold text-[#131C24] hover:text-[#D95C14] transition py-1"
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
