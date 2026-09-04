import React, { useState } from 'react';

const NAV_LINKS = [
  { label: 'Labs', href: '#labs' },
  { label: 'Studio', href: '#studio' },
  { label: 'Openings', href: '#openings' },
  { label: 'Shop', href: '#shop' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo (left) */}
        <a
          href="#"
          className="flex flex-row items-center gap-3 select-none"
          aria-label="Mainframe Home"
        >
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white font-medium"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none leading-none inline-block"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          className="hidden md:flex flex-row items-center text-[23px] text-white font-normal"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link, idx) => (
            <React.Fragment key={link.label}>
              <a
                href={link.href}
                className="hover:opacity-60 transition-opacity cursor-pointer"
              >
                {link.label}
              </a>
              {idx < NAV_LINKS.length - 1 && <span>,&nbsp;</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none z-20 cursor-pointer"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              isOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              isOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col justify-center px-8 gap-8 z-[9] md:hidden transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-70 transition-opacity mt-4"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </>
  );
};
