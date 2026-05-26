"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const VIDEO_SRC = "/videos/video-1.mp4";

/** Test page hero — video scrubs as the section scrolls through the viewport. */
export function TestHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const ctx = gsap.context(() => {
      const setupScrub = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) {
          return;
        }

        video.pause();
        video.currentTime = 0;

        if (reducedMotion.matches) {
          return;
        }

        const playback = { time: 0 };

        gsap.to(playback, {
          time: video.duration,
          ease: "none",
          scrollTrigger: {
            trigger: section,
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
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="test"
      className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden text-white"
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-custom-black/50"
        aria-hidden
      />
      <div
        className={`relative z-10 ${pageInset} flex flex-col items-center justify-center py-20 pt-24 text-center sm:py-24 sm:pt-28 lg:py-28 lg:pt-32`}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
          Platform
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          Test
        </h1>
        <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-white/85 sm:text-lg">
          test
        </p>
      </div>
    </section>
  );
}
