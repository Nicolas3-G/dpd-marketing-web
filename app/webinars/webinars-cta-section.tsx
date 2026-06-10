"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { webinarsCtaContent } from "./webinars-cta-data";

gsap.registerPlugin(ScrollTrigger);

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Full-width photo banner with overlay, heading, and CTA — closing section on the webinars page. */
export function WebinarsCtaSection() {
  const { headingLines, cta } = webinarsCtaContent;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const ctx = gsap.context(() => {
      const setupScrub = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        video.pause();

        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (section.offsetHeight + vh)));
        video.currentTime = progress * video.duration;
        video.style.opacity = "1";

        if (reducedMotion.matches) return;

        const playback = { time: video.currentTime };

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
      id="webinars-cta"
      className="relative isolate flex min-h-0 items-center overflow-hidden py-9 text-white sm:py-10 lg:py-11"
    >
      <video
        ref={videoRef}
        src="/videos/people-talking.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-custom-black/65"
        aria-hidden
      />

      <div className={`relative z-10 ${pageInset}`}>
        <h2 className="custom-sm-title">
          {headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <a
          href={cta.href}
          className="mt-5 inline-flex h-10 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#c73b2e] via-brand-orange to-[#f0a020] px-7 custom-label-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-5 sm:h-11 sm:px-8"
        >
          {cta.label}
          <span aria-hidden="true" className="text-lg leading-none">
            &#8250;
          </span>
        </a>
      </div>
    </section>
  );
}
