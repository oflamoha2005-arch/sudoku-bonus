import React, { useState, useEffect, useRef } from 'react';
import { CHARACTER_VIDEO } from '../config/assets';

interface CharacterVideoProps {
  className?: string;
}

export const CharacterVideo: React.FC<CharacterVideoProps> = ({ className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scrubbing & Queued Seek Refs
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const hasUserScrubbedRef = useRef<boolean>(false);
  const isTouchDeviceRef = useRef<boolean>(false);

  // Check prefers-reduced-motion & touch device
  useEffect(() => {
    isTouchDeviceRef.current =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // Setup video metadata & playback behavior
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
      targetTimeRef.current = video.currentTime;

      // On mobile/touch devices, start autoplay loop
      if (isTouchDeviceRef.current) {
        video.loop = true;
        video.play().catch(() => {});
      } else {
        video.play().catch(() => {});
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    const handleSeeking = () => {
      isSeekingRef.current = true;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('seeking', handleSeeking);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('seeking', handleSeeking);
    };
  }, []);

  // Mouse scrubbing with RAF frame-pacing & direct DOM parallax (Zero Lag, 60fps fluid decode)
  useEffect(() => {
    if (isTouchDeviceRef.current || reducedMotion) return;

    let rafId: number;
    let targetParallaxX = 0;
    let currentParallaxX = 0;
    let currentParallaxRot = 0;

    const updateLoop = () => {
      // 1. Smooth lerp for parallax (no React re-renders, 60fps smooth)
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.12;
      currentParallaxRot = (currentParallaxX / 18) * 1.3;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentParallaxX.toFixed(2)}px, 0px, 0) rotate(${currentParallaxRot.toFixed(2)}deg)`;
      }

      // 2. Frame-paced seek: only seek when decoder is ready and delta is meaningful
      const video = videoRef.current;
      if (video && video.duration && !isSeekingRef.current) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.02) {
          isSeekingRef.current = true;
          video.currentTime = targetTimeRef.current;
        }
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video) return;

      const currentX = e.clientX;
      const innerW = window.innerWidth || 1440;

      // Initial interaction: pause native playback on first scrub
      if (!hasUserScrubbedRef.current) {
        hasUserScrubbedRef.current = true;
        targetTimeRef.current = video.currentTime;
        video.pause();
      }

      // Compute smooth delta
      if (prevXRef.current !== null) {
        const deltaX = currentX - prevXRef.current;
        const duration = video.duration || 5;
        const SENSITIVITY = 0.75;
        const timeOffset = (deltaX / innerW) * SENSITIVITY * duration;

        const newTarget = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
        targetTimeRef.current = newTarget;
      }

      prevXRef.current = currentX;

      // Update target parallax
      const normX = (currentX / innerW - 0.5) * 2;
      targetParallaxX = normX * 18;
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
      targetParallaxX = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex justify-center items-center select-none pointer-events-none ${className}`}
      style={{
        willChange: 'transform',
      }}
    >
      {/* Ambient background blend glow: seamlessly matches video's warm orange with hero background */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none -z-10 rounded-full blur-3xl opacity-90 scale-175"
        style={{
          background: 'radial-gradient(circle at center, #DE8A1D 28%, #E89E15 58%, transparent 76%)',
        }}
        aria-hidden="true"
      />

      {/* Main Character Video Container: Significantly Enlarged & Visually Dominant */}
      <div className="relative w-full max-w-[540px] sm:max-w-[620px] md:max-w-[700px] lg:max-w-[780px] xl:max-w-[880px] h-[380px] sm:h-[440px] md:h-[500px] lg:h-[580px] xl:h-[640px] flex items-center justify-center overflow-visible -mt-4 sm:mt-0 lg:translate-x-4 xl:translate-x-6">
        <video
          ref={videoRef}
          src={CHARACTER_VIDEO}
          muted
          playsInline
          preload="auto"
          controls={false}
          className={`w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl transition-opacity duration-700 ease-out transform origin-[50%_45%] lg:origin-center scale-[1.75] sm:scale-[1.95] md:scale-[2.15] lg:scale-[2.45] xl:scale-[2.65] ${
            isLoaded && hasEntered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            // Smooth circular feathered vignette mask: solid over the boy and cat, dissolving edges into the canvas
            WebkitMaskImage:
              'radial-gradient(circle at 50% 50%, black 36%, rgba(0,0,0,0.9) 50%, transparent 68%)',
            maskImage:
              'radial-gradient(circle at 50% 50%, black 36%, rgba(0,0,0,0.9) 50%, transparent 68%)',
            filter: 'contrast(1.02)',
          }}
        />
      </div>
    </div>
  );
};
