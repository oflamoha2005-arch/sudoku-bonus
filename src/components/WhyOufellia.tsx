import { siteConfig } from '../config/siteConfig';
import { DesignIcon, BrainIcon, SparkleIcon, LibraryIcon } from './icons';

export default function WhyOufellia() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'design':
        return <DesignIcon className="w-6 h-6 text-ochre" />;
      case 'brain':
        return <BrainIcon className="w-6 h-6 text-sage-dark" />;
      case 'sparkle':
        return <SparkleIcon className="w-6 h-6 text-terracotta" />;
      case 'library':
        return <LibraryIcon className="w-6 h-6 text-ochre-dark" />;
      default:
        return <SparkleIcon className="w-6 h-6 text-ochre" />;
    }
  };

  return (
    <section id="why-oufellia" aria-labelledby="why-title" className="relative z-10 py-24 sm:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ochre/15 border border-ochre/30 text-ochre-dark text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-2xs">
            <SparkleIcon className="w-3.5 h-3.5 text-ochre" />
            <span>Why Oufellia</span>
          </div>
          <h2
            id="why-title"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight leading-tight"
          >
            Crafted for Meaningful Moments
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cocoa/75 leading-relaxed">
            Four commitments that distinguish our publishing universe from ordinary puzzle books.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group bg-white rounded-3xl p-7 border border-cocoa/10 shadow-sm hover:shadow-xl hover:border-ochre/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-cream-card group-hover:bg-ochre/10 flex items-center justify-center mb-6 transition-colors duration-200">
                {getIcon(benefit.icon)}
              </div>
              <h3 className="font-display text-xl font-bold text-cocoa group-hover:text-ochre transition-colors mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm text-cocoa/75 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
