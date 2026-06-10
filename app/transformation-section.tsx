"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const transformationMetrics = [
  {
    direction: "up",
    value: "75",
    suffix: "%",
    label: "Improvement in team behavior coordination",
  },
  {
    direction: "down",
    value: "50",
    suffix: "%",
    label: "Reduction in decision latency",
  },
  {
    direction: "up",
    value: "60",
    suffix: "%",
    label: "Improvement in communication efficiency",
  },
  {
    direction: "up",
    value: "70",
    suffix: "%",
    label: "Improvement in team alignment",
  },
] as const;

export function TransformationSection() {
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
      id="transformation"
      className="relative overflow-hidden bg-custom-black text-white"
    >
      <video
        ref={videoRef}
        src="/videos/orange-lights.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
      <div className={`relative z-10 ${pageInset} py-18 sm:py-20`}>
        <h2 className="custom-xs-title text-white">
          What we deliver
        </h2>

        <div className="mt-6 grid border border-white/20 md:grid-cols-2">
          {transformationMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`grid min-h-44 gap-6 border-white/20 p-6 sm:grid-cols-[10rem_1fr] sm:items-start sm:p-8 lg:min-h-52 lg:grid-cols-[14rem_1fr] ${
                index > 0 ? "border-t md:border-t-0" : ""
              } ${index > 1 ? "md:border-t" : ""} ${
                index % 2 === 1 ? "md:border-l" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-3 text-3xl font-light text-brand-orange">
                  {metric.direction === "up" ? "↑" : "↓"}
                </span>
                <p className="flex items-start text-[clamp(4.5rem,10vw,7rem)] font-medium leading-none tracking-tighter">
                  {metric.value}
                  {metric.suffix ? (
                    <span className="ml-1 mt-3 text-3xl tracking-tight sm:text-4xl">
                      {metric.suffix}
                    </span>
                  ) : null}
                </p>
              </div>
              <p className="max-w-sm custom-body-bold text-white-light sm:pt-5">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 custom-label italic text-white-light">
          *Illustrative model of possibility. Results depend on adoption,
          leadership participation, and consistent DPDing.
        </p>
      </div>
    </section>
  );
}
