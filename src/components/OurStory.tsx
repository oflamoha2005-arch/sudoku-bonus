import { siteConfig } from '../config/siteConfig';
import { SparkleIcon, BookIcon } from './icons';

export default function OurStory() {
  const { story } = siteConfig;

  return (
    <section id="story" aria-labelledby="story-title" className="relative z-10 py-24 sm:py-32 bg-cream paper-pattern">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/15 border border-sage/30 text-sage-dark text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-2xs">
            <SparkleIcon className="w-3.5 h-3.5 text-sage-dark" />
            <span>{story.eyebrow}</span>
          </div>
          <h2
            id="story-title"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight leading-tight"
          >
            {story.title}
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-cocoa/80 leading-relaxed font-normal">
            {story.lead}
          </p>
        </div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Story Content Left */}
          <div className="lg:col-span-7 bg-cream-card/90 rounded-3xl p-8 sm:p-12 border border-cocoa/10 shadow-md">
            <div className="space-y-6 text-cocoa/85 text-base sm:text-lg leading-relaxed">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Blockquote */}
            <div className="mt-8 pt-8 border-t border-cocoa/10">
              <blockquote className="font-display text-lg sm:text-xl italic text-ochre-dark font-medium leading-snug">
                {story.quote}
              </blockquote>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cocoa/60">
                <span>The Oufellia Philosophy</span>
                <span>•</span>
                <span>Mindful Publishing</span>
              </div>
            </div>
          </div>

          {/* Artistic Feature Card Right */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-ochre/10 border border-ochre/25 rounded-3xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-ochre/20 text-ochre flex items-center justify-center mb-5">
                <BookIcon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-cocoa mb-2">
                Crafted As Tactile Sanctuaries
              </h3>
              <p className="text-sm text-cocoa/75 leading-relaxed">
                We believe the feel of high-opacity cream paper, the glide of a pen, and the peaceful hush of an afternoon puzzle offer rare, restorative presence.
              </p>
            </div>

            <div className="bg-sage/10 border border-sage/25 rounded-3xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-sage/20 text-sage-dark flex items-center justify-center mb-5">
                <SparkleIcon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-cocoa mb-2">
                An Invitation to Curiosity
              </h3>
              <p className="text-sm text-cocoa/75 leading-relaxed">
                Whether deciphering word labyrinths or filling in numbers, our collections rekindle that spark of quiet wonder in solvers of every generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
