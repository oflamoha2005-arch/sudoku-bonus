import Link from "next/link";
import { categories } from "@/data/books";
import { socialLinks } from "@/data/social";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#2D1B4E] to-[#1a0e30] text-white overflow-hidden">
      {/* Wavy top */}
      <div className="absolute top-0 left-0 right-0 h-16 -translate-y-full">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 64H1440V32C1440 32 1320 0 1200 16C1080 32 960 48 840 48C720 48 600 16 480 8C360 0 240 16 120 32C60 40 0 32 0 32V64Z"
            fill="#2D1B4E"
          />
        </svg>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-8 left-[10%] w-3 h-3 rounded-full bg-accent-yellow/20 animate-float-slow" />
      <div className="absolute top-16 right-[15%] w-2 h-2 rounded-full bg-primary/20 animate-float" />
      <div className="absolute bottom-20 left-[20%] w-4 h-4 rounded-full bg-secondary/15 animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3
              className="text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              <span className="bg-gradient-to-r from-accent-yellow to-primary bg-clip-text text-transparent">
                Oufella
              </span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Making learning an adventure, one puzzle at a time! Colorful
              activity books that kids love and parents trust.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <SocialButton href={socialLinks.pinterest} label="Pinterest">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" />
                </svg>
              </SocialButton>
              <SocialButton href={socialLinks.youtube} label="YouTube">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialButton>
              <SocialButton href={socialLinks.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialButton>
              <SocialButton href={socialLinks.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialButton>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.id}`}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group"
                  >
                    <span
                      className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Teaser */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Stay in the Loop!
            </h4>
            <p className="text-white/50 text-sm mb-4">
              New books, special offers, and free printables — sign up to be the
              first to know!
            </p>
            <Link
              href="/sign-in"
              className="inline-block px-5 py-2.5 bg-gradient-to-r from-accent-yellow to-accent-orange text-[#2D1B4E] rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg"
            >
              Join Us ✨
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Oufella. All rights reserved. Made with
            ❤️ for curious kids everywhere.
          </p>
          <p className="text-white/20 text-xs">
            Activity books available on Amazon KDP
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 text-white/60 hover:text-white"
    >
      {children}
    </a>
  );
}
