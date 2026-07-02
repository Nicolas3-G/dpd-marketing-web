"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type UseScrollScrubVideoOptions = {
  /** Fraction of the clip's full duration to scrub through (e.g. 0.5 plays through the first half). */
  durationMultiplier?: number;
  /** Seek to the video's current on-screen scroll progress once it loads, instead of starting at 0. */
  seekToScrollProgress?: boolean;
};

/**
 * Ties a <video>'s currentTime to scroll position via GSAP ScrollTrigger.
 *
 * Mobile browsers (iOS Safari in particular) hold a <video> at readyState 0
 * indefinitely if it's never actually played, regardless of preload="auto" —
 * so `loadedmetadata` never fires and the video stays blank forever. Priming
 * it with a muted play/pause forces the browser to start loading.
 */
export function useScrollScrubVideo<TriggerEl extends HTMLElement>({
  durationMultiplier = 0.5,
  seekToScrollProgress = true,
}: UseScrollScrubVideoOptions = {}) {
  const triggerRef = useRef<TriggerEl | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const video = videoRef.current;

    if (!trigger || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const ctx = gsap.context(() => {
      const setupScrub = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        video.pause();

        const scrubDuration = video.duration * durationMultiplier;

        if (seekToScrollProgress) {
          const rect = trigger.getBoundingClientRect();
          const vh = window.innerHeight;
          const progress = Math.max(
            0,
            Math.min(1, (vh - rect.top) / (trigger.offsetHeight + vh)),
          );
          video.currentTime = progress * scrubDuration;
        } else {
          video.currentTime = 0;
        }

        video.style.opacity = "1";

        if (reducedMotion.matches) return;

        const playback = { time: video.currentTime };

        gsap.to(playback, {
          time: scrubDuration,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            video.currentTime = playback.time;
          },
        });
      };

      // Mobile browsers (notably iOS Safari) never fetch a <video>'s data —
      // and never fire `loadedmetadata` — unless it's actually played at
      // least once. Prime it with a muted play/pause so it has data to scrub.
      video.play().then(() => video.pause()).catch(() => {});

      if (video.readyState >= 1) {
        setupScrub();
      } else {
        video.addEventListener("loadedmetadata", setupScrub, { once: true });
      }
    }, trigger);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [durationMultiplier, seekToScrollProgress]);

  return { triggerRef, videoRef };
}
