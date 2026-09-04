import { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { PinterestIcon, SparkleIcon, CheckCircleIcon, ArrowRight } from './icons';

export default function Community() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const pinterestLink = siteConfig.socialLinks.find(
    (s) => s.platform === 'Pinterest' && s.enabled
  );

  return (
    <section id="community" aria-labelledby="community-title" className="relative z-10 py-24 sm:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="bg-gradient-to-br from-cream-card via-white to-cream rounded-3xl p-8 sm:p-14 border border-cocoa/10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ochre/15 border border-ochre/30 text-ochre-dark text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-2xs">
                <SparkleIcon className="w-3.5 h-3.5 text-ochre" />
                <span>Join the Community</span>
              </div>
              <h2
                id="community-title"
                className="font-display text-3xl sm:text-4xl font-bold text-cocoa tracking-tight leading-tight"
              >
                Follow the World of Oufellia
              </h2>
              <p className="mt-4 text-base sm:text-lg text-cocoa/75 leading-relaxed">
                Be the first to receive free printable puzzle samples, behind-the-scenes layout sketches, and release notifications for our debut titles.
              </p>

              {/* Active Social Channel Card */}
              {pinterestLink && (
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-white border border-cocoa/10 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-[#E60023]/10 text-[#E60023] flex items-center justify-center flex-shrink-0">
                    <PinterestIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-cocoa">
                      Oufellia on Pinterest
                    </h3>
                    <p className="text-xs text-cocoa/65">
                      Visual mood boards, aesthetic inspirations, and puzzle art previews.
                    </p>
                  </div>
                  <a
                    href={pinterestLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#E60023] hover:bg-[#c0001d] text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-2xs transition-colors self-start sm:self-auto"
                  >
                    <span>Follow {pinterestLink.handle || 'Pinterest'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Right: Newsletter / Sample Pack Signup */}
            <div className="lg:col-span-5 bg-cocoa text-cream rounded-3xl p-8 sm:p-9 shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-ochre-light block mb-2">
                Free Printable Sampler
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Curious Minds Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-cream/70 leading-relaxed mb-6">
                Receive our curated PDF mini-puzzle sampler (Word Search & Sudoku) directly to your inbox.
              </p>

              {subscribed ? (
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
                  <CheckCircleIcon className="w-8 h-8 text-ochre-light mx-auto mb-2" />
                  <h4 className="font-display text-lg font-bold text-white">
                    You&apos;re on the early list!
                  </h4>
                  <p className="text-xs text-cream/80 mt-1">
                    Check your inbox soon for your welcome puzzle kit and debut news.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div>
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-cream/40 text-sm focus:outline-none focus:border-ochre-light focus:bg-white/15 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-ochre hover:bg-ochre-dark text-white font-semibold text-sm py-3 rounded-xl shadow transition-all duration-200 cursor-pointer"
                  >
                    <span>Send Me Printable Samples</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-cream/50 text-center mt-2">
                    No spam. Unsubscribe with one click anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
