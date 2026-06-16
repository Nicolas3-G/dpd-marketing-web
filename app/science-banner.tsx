"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ScienceBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const ctx = gsap.context(() => {
      const setupScrub = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        video.pause();

        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (container.offsetHeight + vh)));
        video.currentTime = progress * (video.duration / 2);
        video.style.opacity = "1";

        if (reducedMotion.matches) return;

        const playback = { time: video.currentTime };

        gsap.to(playback, {
          time: video.duration / 2,
          ease: "none",
          scrollTrigger: {
            trigger: container,
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

      if (video.readyState >= 1) {
        setupScrub();
      } else {
        video.addEventListener("loadedmetadata", setupScrub, { once: true });
      }
    }, container);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mt-16 min-h-88 overflow-hidden bg-custom-black shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:min-h-112"
    >
      <video
        ref={videoRef}
        src="/videos/orange-paint.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
      <div className="absolute inset-x-0 inset-y-5 flex items-center justify-center">
        <div className="flex h-full w-full flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-white/25 bg-black/20 px-8 py-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:gap-x-14 sm:py-10 lg:gap-x-20">
          <p className="shrink-0 leading-[1.12] custom-sm-title text-white">
            Science that supports{" "}
            <span className="text-brand-orange">DPD.</span>
          </p>
          <p className="shrink-0 custom-sm-title text-white">
            <span className="text-brand-orange">
              Behavior coordination
            </span>{" "}
            that scales.
          </p>
        </div>
      </div>
    </div>
  );
}
