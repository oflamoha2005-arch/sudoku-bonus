import { siteConfig } from '../config/siteConfig';
import { SparkleIcon, CheckCircleIcon } from './icons';

export default function About() {
  const { about } = siteConfig;

  return (
    <section id="about" aria-labelledby="about-title" className="relative z-10 py-24 sm:py-32 bg-cream-card/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision intro */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta/15 border border-terracotta/30 text-terracotta-dark text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-2xs">
              <SparkleIcon className="w-3.5 h-3.5 text-terracotta" />
              <span>{about.eyebrow}</span>
            </div>
            <h2
              id="about-title"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight leading-tight"
            >
              {about.title}
            </h2>
            <p className="mt-6 text-base sm:text-lg text-cocoa/80 leading-relaxed">
              {about.description}
            </p>

            {/* Audience Badges */}
            <div className="mt-8 pt-6 border-t border-cocoa/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cocoa/60 mb-3">
                Created For All Curious Minds:
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Kids & Young Learners',
                  'Teens & Students',
                  'Adults & Seniors',
                  'Puzzle Enthusiasts',
                  'Families & Classrooms',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-cocoa/85 border border-cocoa/10 shadow-2xs"
                  >
                    <CheckCircleIcon className="w-3.5 h-3.5 text-ochre" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillars */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {about.pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-cocoa/10 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ochre/15 text-ochre font-display font-bold text-sm flex items-center justify-center">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cocoa">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-cocoa/70 leading-relaxed">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
