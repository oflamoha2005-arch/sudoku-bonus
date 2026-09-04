import { siteConfig } from '../config/siteConfig';
import { ArrowRight, SparkleIcon } from './icons';

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-24 sm:py-32 bg-cream paper-pattern">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ochre/15 border border-ochre/30 text-ochre-dark text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 shadow-2xs">
          <SparkleIcon className="w-3.5 h-3.5 text-ochre" />
          <span>Begin Your Journey</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cocoa tracking-tight leading-tight mb-6">
          Ready to Step Away From Screens and Into Wonder?
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-xl text-cocoa/80 leading-relaxed mb-10">
          Discover a slower, richer way to challenge your mind. Welcome to {siteConfig.brand.name} — where every page is a world waiting to be explored.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#books"
            className="inline-flex items-center justify-center gap-2 bg-ochre hover:bg-ochre-dark text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#story"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-cream text-cocoa border border-cocoa/15 font-semibold text-base px-7 py-3.5 rounded-full shadow-xs hover:border-cocoa/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Read Our Story</span>
          </a>
        </div>
      </div>
    </section>
  );
}
