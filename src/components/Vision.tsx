import { siteConfig } from '../config/siteConfig';
import { SparkleIcon } from './icons';

export default function Vision() {
  const { vision } = siteConfig;

  return (
    <section id="vision" aria-labelledby="vision-title" className="relative z-10 py-24 sm:py-32 bg-cocoa text-cream overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-ochre/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-terracotta/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-ochre-light text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-2xs">
            <SparkleIcon className="w-3.5 h-3.5 text-ochre-light" />
            <span>{vision.eyebrow}</span>
          </div>
          <h2
            id="vision-title"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            {vision.title}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-cream/80 leading-relaxed font-normal">
            {vision.description}
          </p>
        </div>

        {/* 4 Core Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vision.coreValues.map((val) => (
            <div
              key={val.title}
              className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 shadow-lg flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-ochre/20 text-ochre-light font-display text-2xl flex items-center justify-center mb-5 select-none">
                {val.symbol}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2.5">
                {val.title}
              </h3>
              <p className="text-sm text-cream/70 leading-relaxed mt-auto">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
