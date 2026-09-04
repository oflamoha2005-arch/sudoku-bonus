import { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { useHeroVideoScrub } from '../hooks/useHeroVideoScrub';
import { useTypewriter } from '../hooks/useTypewriter';
import { SparkleIcon, ArrowRight, MouseIcon } from './icons';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { handleSeeked } = useHeroVideoScrub(videoRef);

  const { displayed, done } = useTypewriter(siteConfig.hero.heroTitle, {
    speed: 36,
    startDelay: 500,
  });

  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState(siteConfig.hero.heroVideo);

  useEffect(() => {
    // Reveal CTA buttons smoothly 450ms after page mount
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 450);

    // Preload video into in-memory Blob for instant zero-latency seeks
    let isMounted = true;
    let blobUrl = '';

    fetch(siteConfig.hero.heroVideo)
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.blob();
      })
      .then((blob) => {
        if (!isMounted) return;
        blobUrl = URL.createObjectURL(blob);
        setVideoSrc(blobUrl);
      })
      .catch(() => {
        // Silently fallback to direct URL if fetch/blob is not supported
      });

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      aria-label="Interactive Hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden flex items-center"
    >
      {/* 1. BACKGROUND VIDEO (Fixed / Full Screen, Mouse & Touch Controlled) */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={siteConfig.hero.heroPoster || undefined}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }}
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          objectPosition: '72% center',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* 3. HERO CONTENT (Strictly Left Side, max-w-xl) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-20 sm:pt-24 pb-12 flex flex-col justify-center">
        <div className="max-w-xl">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ochre/15 border border-ochre/30 text-ochre-dark text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 sm:mb-5 shadow-xs">
            <SparkleIcon className="w-4 h-4 text-ochre" />
            <span>{siteConfig.hero.heroEyebrow}</span>
          </div>

          {/* Typewriter Title */}
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold text-cocoa leading-[1.15] tracking-tight mb-4 sm:mb-5 min-h-[96px] sm:min-h-[128px]"
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[3px] h-[1em] bg-ochre align-middle ml-1 cursor-blink"
                aria-hidden="true"
              />
            )}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-cocoa/85 leading-relaxed mb-6 sm:mb-8 max-w-lg font-normal">
            {siteConfig.hero.heroDescription}
          </p>

          {/* Action CTAs (Smooth Entrance) */}
          <div
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7 transition-all duration-500 ease-out"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: buttonsVisible ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <a
              href={siteConfig.hero.heroCTA.primary.href}
              className="inline-flex items-center justify-center gap-2 bg-ochre hover:bg-ochre-dark text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>{siteConfig.hero.heroCTA.primary.label}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.hero.heroCTA.secondary.href}
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-cocoa/5 text-cocoa border border-cocoa/60 font-semibold text-sm sm:text-base px-6 sm:px-7 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>{siteConfig.hero.heroCTA.secondary.label}</span>
            </a>
          </div>

          {/* Category Quick Pills */}
          <div
            className="flex flex-wrap items-center gap-2 transition-all duration-500 delay-100 ease-out"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: buttonsVisible ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            <span className="text-xs font-semibold text-cocoa/60 mr-1 uppercase tracking-wider">
              Explore:
            </span>
            {siteConfig.hero.pillTags.map((tag) => (
              <a
                key={tag}
                href="#categories"
                className="inline-flex items-center text-xs font-medium text-cocoa/80 bg-white/80 hover:bg-white border border-cocoa/10 hover:border-ochre/50 px-3 py-1 rounded-full shadow-2xs transition-all hover:-translate-y-0.5"
              >
                <span>{tag}</span>
              </a>
            ))}
          </div>

          {/* Interactive Scrub Guide Hint */}
          <div className="mt-8 sm:mt-10 inline-flex items-center gap-2 text-xs font-medium text-cocoa/70 bg-white/70 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-cocoa/10">
            <MouseIcon className="w-4 h-4 text-ochre animate-pulse" />
            <span>Move cursor or swipe horizontally to scrub animation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
