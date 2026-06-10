"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { booksCtaContent } from "./books-cta-data";

gsap.registerPlugin(ScrollTrigger);

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Full-width banner with purchase CTA — pattern from webinars closing banner. */
export function BooksCtaSection() {
  const { headingLines, cta } = booksCtaContent;
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
      id="books-cta"
      className="relative isolate flex min-h-0 items-center overflow-hidden py-12 text-white sm:py-14 lg:py-16"
    >
      <video
        ref={videoRef}
        src="/videos/orange-bottom.mp4"
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
        <h2 className="custom-sm-title max-w-3xl">
          {headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-11 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#c73b2e] via-brand-orange to-[#f0a020] px-8 custom-label-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-7 sm:h-12 sm:px-9"
        >
          {cta.label}
          <span aria-hidden="true" className="custom-label-bold leading-none">
            &#8250;
          </span>
        </a>
      </div>
    </section>
  );
}
