import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-white/20 bg-black/5 py-12 px-6 sm:px-10 lg:px-16 text-[#131C24]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-1.5 text-2xl font-black tracking-tight">
            <span>Oufellia</span>
            <span className="text-lg">✦</span>
          </div>
          <p className="text-xs text-[#131C24]/75 mt-1 font-medium">
            Curious books, mindful puzzles, and creative publishing.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-[#131C24]/85">
          <a className="hover:text-[#131C24] transition cursor-pointer" href="#hero">
            Home
          </a>
          <a className="hover:text-[#131C24] transition cursor-pointer" href="#story">
            Our Story
          </a>
          <a
            className="hover:text-[#131C24] transition cursor-pointer"
            href="#featured-books"
          >
            Books Catalog
          </a>
          <a
            className="hover:text-[#131C24] transition cursor-pointer"
            href="#puzzles"
          >
            Puzzle Formats
          </a>
          <a
            className="hover:text-[#131C24] transition cursor-pointer"
            href="#vision"
          >
            Quiet Club
          </a>
          <a className="hover:text-[#131C24] transition cursor-pointer" href="#story">
            Privacy &amp; Terms
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#131C24]/70 font-medium">
          © {currentYear} Oufellia Books. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
