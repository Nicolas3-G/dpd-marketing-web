"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const featureSteps = [
  {
    step: 1,
    title: "Complete the Survey",
    description:
      "Be yourself and answer honestly to discover your current behavioral posture.",
  },
  {
    step: 2,
    title: "View Detailed Results",
    description:
      "Learn how your persona profile influences collaboration, communication, and execution.",
  },
  {
    step: 3,
    title: "Unlock Team Alignment",
    description:
      "Get practical guidance for teams, coaches, and leaders—aligned to how you actually show up.",
  },
] as const;

export function SurveyStepsBand() {
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
    <section className="relative left-1/2 w-screen -translate-x-1/2">
      <div ref={containerRef} className="relative isolate overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/survey-section-1.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
        />
        <div className="absolute inset-0 bg-[#071423]/55" aria-hidden />

        <div className="relative w-full py-12 sm:py-16 lg:py-20">
          <div className="grid overflow-hidden border-y border-white/25 md:grid-cols-3">
            {featureSteps.map(({ step, title, description }) => (
              <article
                key={step}
                className="bg-white/5 px-12 py-12 text-white backdrop-blur-xl md:min-h-[280px] md:border-l md:border-white/25 md:px-20 md:py-16 first:md:border-l-0"
              >
                <p className="custom-body tracking-[-0.01em] text-white">
                  Step {step}
                </p>
                <h2 className="mt-2 max-w-[18ch] custom-sm-title text-white">
                  {title}
                </h2>
                <p className="mt-5 max-w-[32ch] custom-body tracking-[-0.01em] text-white">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
