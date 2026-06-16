"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { forwardRef, useEffect, useRef, type MutableRefObject } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import type { FrameworkTestimonial } from "./framework-testimonials";
import { SLIDE_MS, useSlideCarousel } from "./use-slide-carousel";

gsap.registerPlugin(ScrollTrigger);

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const slideGridClass =
  "grid items-center justify-center lg:gap-16 xl:gap-20 lg:pl-52 xl:pl-72";

const VIDEO_SRC = "/videos/video-1.mp4";

function TestimonialSlideContent({
  testimonial,
  panelId,
}: {
  testimonial: FrameworkTestimonial;
  panelId?: string;
}) {
  return (
    <blockquote id={panelId} className="max-w-2xl">
      <p className="custom-md-title max-w-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="mt-4 sm:mt-5">
        <p className="custom-body-bold">
          {testimonial.name}
        </p>
        <p className="mt-1 custom-body text-white">
          {testimonial.role}
        </p>
      </footer>
    </blockquote>
  );
}

type FrameworkTestimonialSectionProps = {
  activeIndex: number;
  testimonials: FrameworkTestimonial[];
  panelId?: string;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

/** In-flow sizer: all slides share one grid cell so row height = tallest slide. */
function TestimonialHeightSizer({
  testimonials,
}: {
  testimonials: FrameworkTestimonial[];
}) {
  return (
    <div
      className="pointer-events-none grid select-none opacity-0"
      aria-hidden
      inert
    >
      {testimonials.map((testimonial, index) => (
        <div
          key={`sizer-${index}`}
          className={`${slideGridClass} col-start-1 row-start-1`}
        >
          <TestimonialSlideContent testimonial={testimonial} />
        </div>
      ))}
    </div>
  );
}

/** Framework testimonial carousel with in-section controls. */
export const FrameworkTestimonialSection = forwardRef<
  HTMLElement,
  FrameworkTestimonialSectionProps
>(function FrameworkTestimonialSection(
  {
    activeIndex,
    testimonials,
    panelId = "framework-testimonial-panel",
    onSelect,
    onPrev,
    onNext,
  },
  ref,
) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { displayIndex, isSliding, transition, enterX, exitX, animate } =
    useSlideCarousel(activeIndex, testimonials.length);

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
          time: video.duration / 2,
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
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as MutableRefObject<HTMLElement | null>).current = node;
        }
      }}
      className="relative overflow-hidden py-10 text-white sm:py-12 lg:py-14"
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
        className="pointer-events-none absolute inset-0 bg-custom-black/40"
        aria-hidden
      />

      <div className={`${pageInset} relative z-10`}>
        <div className="relative">
          <TestimonialHeightSizer testimonials={testimonials} />

          <div className="absolute inset-0 overflow-hidden">
            {isSliding && transition ? (
              <>
                <div
                  className={`absolute inset-0 ${slideGridClass} transition-transform ease-in-out motion-reduce:transition-none`}
                  style={{
                    transform: `translateX(${exitX}%)`,
                    transitionDuration: animate ? `${SLIDE_MS}ms` : "0ms",
                  }}
                  aria-hidden
                >
                  <TestimonialSlideContent
                    testimonial={testimonials[transition.from]}
                  />
                </div>

                <div
                  className={`absolute inset-0 ${slideGridClass} transition-transform ease-in-out motion-reduce:transition-none`}
                  style={{
                    transform: `translateX(${enterX}%)`,
                    transitionDuration: animate ? `${SLIDE_MS}ms` : "0ms",
                  }}
                >
                  <TestimonialSlideContent
                    testimonial={testimonials[displayIndex]}
                    panelId={panelId}
                  />
                </div>
              </>
            ) : (
              <div className={`h-full ${slideGridClass}`}>
                <TestimonialSlideContent
                  testimonial={testimonials[displayIndex]}
                  panelId={panelId}
                />
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-5 flex items-center justify-between gap-6 sm:mt-6">
          <div className="flex gap-5" role="tablist" aria-label="Testimonials">
            {Array.from({ length: testimonials.length }, (_, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  aria-label={`Testimonial ${index + 1}`}
                  onClick={() => onSelect(index)}
                  className={`size-4 rounded-full transition-colors ${
                    isActive ? "bg-white" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              );
            })}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous testimonial"
              className="grid size-14 place-items-center rounded-full border border-white text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-16"
            >
              <FaArrowLeft className="size-5 sm:size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next testimonial"
              className="grid size-14 place-items-center rounded-full border border-white text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-16"
            >
              <FaArrowRight className="size-5 sm:size-6" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
