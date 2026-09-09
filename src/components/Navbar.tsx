"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, ChevronDown } from "lucide-react";
import { categories, categoryGroups } from "@/data/books";
import { socialLinks } from "@/data/social";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-nav-bg border-b border-accent-purple/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center shadow-lg"
            >
              <BookOpen className="w-5 h-5 text-white" />
            </motion.div>
            <span
              className="text-2xl sm:text-3xl font-bold gradient-text"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Oufella
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/">Home</NavLink>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-accent-yellow/10 transition-all font-medium">
                Categories
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-accent-purple/10 p-3 space-y-1"
                  >
                    {categoryGroups.map((group) => (
                      <div key={group.id}>
                        <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider px-3 py-1">
                          {group.name}
                        </p>
                        {categories
                          .filter((c) => c.group === group.id)
                          .map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/categories/${cat.id}`}
                              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent-yellow/10 transition-colors group"
                            >
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: cat.color }}
                              />
                              <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                                {cat.name}
                              </span>
                            </Link>
                          ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/#about">About</NavLink>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social icons (small) */}
            <div className="flex items-center gap-1">
              <SocialIcon href={socialLinks.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={socialLinks.youtube} label="YouTube">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
            </div>

            <Link
              href="/sign-in"
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent-purple text-white rounded-full font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-accent-yellow/10 transition-colors"
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-accent-purple/10"
          >
            <div className="px-4 py-4 space-y-2">
              <MobileLink href="/" onClick={() => setIsMobileOpen(false)}>
                Home
              </MobileLink>

              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider px-4 pt-3">
                Puzzle Books
              </p>
              {categories
                .filter((c) => c.group === "puzzle-books")
                .map((cat) => (
                  <MobileLink
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block mr-2"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.name}
                  </MobileLink>
                ))}

              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider px-4 pt-3">
                Hidden Pictures
              </p>
              {categories
                .filter((c) => c.group === "hidden-pictures")
                .map((cat) => (
                  <MobileLink
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block mr-2"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.name}
                  </MobileLink>
                ))}

              <MobileLink href="/#about" onClick={() => setIsMobileOpen(false)}>
                About Us
              </MobileLink>

              <div className="pt-3 border-t border-accent-purple/10">
                <Link
                  href="/sign-in"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 bg-gradient-to-r from-primary to-accent-purple text-white rounded-2xl font-semibold shadow-lg"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-accent-yellow/10 transition-all font-medium"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2.5 rounded-xl text-foreground/70 hover:text-foreground hover:bg-accent-yellow/10 transition-all font-medium"
    >
      {children}
    </Link>
  );
}

function SocialIcon({
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
      className="p-2 rounded-lg text-foreground/40 hover:text-primary hover:bg-primary/10 transition-all"
    >
      {children}
    </a>
  );
}
