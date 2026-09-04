import { useEffect, useRef } from 'react';

// Higher sensitivity so mouse movement feels agile, snappy and effortless
const SENSITIVITY = 2.2;
const MIN_SEEK_INTERVAL_MS = 20; // Up to 50 seeks/sec for ultra-fluid response

export function useHeroVideoScrub(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const prevMouseXRef = useRef<number | null>(null);
  const prevTouchXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const lastSeekTimestampRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const performSeek = (video: HTMLVideoElement, time: number) => {
    if (!video.duration || Number.isNaN(video.duration)) return;
    const clampedTime = Math.min(Math.max(time, 0), video.duration);

    if (Math.abs(video.currentTime - clampedTime) < 0.01) {
      return;
    }

    isSeekingRef.current = true;
    lastSeekTimestampRef.current = performance.now();

    // Use fastSeek when available for zero-latency keyframe navigation
    if (typeof (video as any).fastSeek === 'function') {
      try {
        (video as any).fastSeek(clampedTime);
      } catch {
        video.currentTime = clampedTime;
      }
    } else {
      video.currentTime = clampedTime;
    }
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // High-performance RAF loop: eliminates stutter and decouples mouse velocity from seek locks
    const tick = () => {
      const vid = videoRef.current;
      if (vid && vid.duration && !Number.isNaN(vid.duration)) {
        const now = performance.now();
        const timeSinceLastSeek = now - lastSeekTimestampRef.current;

        // Ready to seek if not currently seeking OR watchdog timeout (> 35ms) has elapsed
        const isReady = !vid.seeking && (!isSeekingRef.current || timeSinceLastSeek > 35);

        if (isReady && timeSinceLastSeek >= MIN_SEEK_INTERVAL_MS) {
          if (Math.abs(vid.currentTime - targetTimeRef.current) > 0.01) {
            performSeek(vid, targetTimeRef.current);
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    // Desktop Mouse Handler
    const handleMouseMove = (e: MouseEvent) => {
      const vid = videoRef.current;
      if (!vid || !vid.duration || Number.isNaN(vid.duration)) return;

      if (prevMouseXRef.current === null) {
        prevMouseXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevMouseXRef.current;
      prevMouseXRef.current = e.clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * vid.duration;
      const nextTarget = Math.min(Math.max(targetTimeRef.current + timeOffset, 0), vid.duration);
      targetTimeRef.current = nextTarget;
    };

    const handleMouseLeave = () => {
      prevMouseXRef.current = null;
    };

    // Mobile Touch Handler
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevTouchXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const vid = videoRef.current;
      if (!vid || !vid.duration || Number.isNaN(vid.duration)) return;

      if (e.touches.length > 0) {
        const touchX = e.touches[0].clientX;
        if (prevTouchXRef.current === null) {
          prevTouchXRef.current = touchX;
          return;
        }

        const delta = touchX - prevTouchXRef.current;
        prevTouchXRef.current = touchX;

        const timeOffset = (delta / window.innerWidth) * SENSITIVITY * vid.duration;
        const nextTarget = Math.min(Math.max(targetTimeRef.current + timeOffset, 0), vid.duration);
        targetTimeRef.current = nextTarget;
      }
    };

    const handleTouchEnd = () => {
      prevTouchXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [videoRef]);

  return { handleSeeked };
}
