import { siteConfig } from '../config/siteConfig';
import { SparkleIcon } from './icons';

export default function FutureCollection() {
  const { futureCollections } = siteConfig;

  return (
    <section className="relative z-10 py-24 sm:py-32 bg-cream-card/70 border-t border-b border-cocoa/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta/15 border border-terracotta/30 text-terracotta-dark text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-2xs">
            <SparkleIcon className="w-3.5 h-3.5 text-terracotta" />
            <span>Expanding Horizons</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight leading-tight">
            Forthcoming Formats & Creative Frontiers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cocoa/75 leading-relaxed">
            Our creative pipeline reaches beyond conventional books into versatile tactile and interactive media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futureCollections.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-8 border border-cocoa/10 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center font-display text-xl text-ochre font-bold shadow-2xs select-none">
                    {item.symbol}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cream-card text-cocoa/70 border border-cocoa/10">
                    {item.availability}
                  </span>
                </div>

                <span className="text-xs font-semibold text-ochre-dark uppercase tracking-wider block mb-1">
                  {item.format}
                </span>

                <h3 className="font-display text-xl font-bold text-cocoa mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-cocoa/70 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-cocoa/10 flex items-center justify-between text-xs text-cocoa/60 font-medium">
                <span>In Editorial Development</span>
                <span className="text-ochre">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
