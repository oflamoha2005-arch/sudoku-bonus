import { siteConfig } from '../config/siteConfig';
import { PinterestIcon } from './icons';

export default function Footer() {
  const pinterestLink = siteConfig.socialLinks.find(
    (s) => s.platform === 'Pinterest' && s.enabled
  );

  return (
    <footer className="relative z-10 bg-cocoa text-cream/80 pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="font-display text-2xl font-bold text-white tracking-tight">
                {siteConfig.brand.name}
              </span>
              <span className="text-ochre-light text-lg select-none" aria-hidden="true">
                {siteConfig.brand.symbol}
              </span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed max-w-sm mb-6">
              {siteConfig.brand.description}
            </p>

            {pinterestLink && (
              <div className="flex items-center gap-3">
                <a
                  href={pinterestLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Oufellia on Pinterest"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E60023] text-white flex items-center justify-center transition-colors"
                >
                  <PinterestIcon className="w-5 h-5" />
                </a>
                <span className="text-xs text-cream/60">
                  Follow on Pinterest for puzzle mood boards
                </span>
              </div>
            )}
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Explore Oufellia
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-ochre-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Puzzle Categories */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Puzzle Collections
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.categories
                .filter((c) => c.id !== 'all')
                .map((cat) => (
                  <li key={cat.id}>
                    <a
                      href="#categories"
                      className="hover:text-ochre-light transition-colors flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-cream/40">
                        {cat.shortDesc}
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accessibility */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>
            &copy; {siteConfig.brand.copyrightYear} {siteConfig.brand.name}. All rights reserved. Creative Publishing Brand.
          </p>

          <div className="flex items-center gap-6">
            <span>Designed with care for curious minds</span>
            <a
              href="#hero"
              className="text-ochre-light hover:underline underline-offset-4"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
