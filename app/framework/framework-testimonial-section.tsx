"use client";

import { forwardRef } from "react";

import type { FrameworkTestimonial } from "./framework-testimonials";
import { SLIDE_MS, useSlideCarousel } from "./use-slide-carousel";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const slideGridClass =
  "grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20";

function TestimonialSlideContent({
  testimonial,
  panelId,
}: {
  testimonial: FrameworkTestimonial;
  panelId?: string;
}) {
  return (
    <>
      <div
        className="aspect-4/3 w-full bg-black lg:aspect-square lg:max-h-[min(28rem,80vw)]"
        aria-hidden
      />

      <blockquote id={panelId} className="max-w-2xl">
        <p className="text-4xl font-bold leading-snug tracking-[-0.02em] sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-[1.08]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <footer className="mt-8 sm:mt-10">
          <p className="text-xl font-semibold sm:text-2xl lg:text-3xl">
            {testimonial.name}
          </p>
          <p className="mt-1 text-lg font-normal text-white/90 sm:text-xl lg:text-2xl">
            {testimonial.role}
          </p>
        </footer>
      </blockquote>
    </>
  );
}

type FrameworkTestimonialSectionProps = {
  activeIndex: number;
  testimonials: FrameworkTestimonial[];
  panelId?: string;
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

/** Framework testimonial — content driven by flow-section controls. */
export const FrameworkTestimonialSection = forwardRef<
  HTMLElement,
  FrameworkTestimonialSectionProps
>(function FrameworkTestimonialSection(
  { activeIndex, testimonials, panelId = "framework-testimonial-panel" },
  ref,
) {
  const { displayIndex, isSliding, transition, enterX, exitX, animate } =
    useSlideCarousel(activeIndex, testimonials.length);

  return (
    <section
      ref={ref}
      className="overflow-x-clip bg-brand-orange py-20 text-white sm:py-24 lg:py-28"
    >
      <div className={`${pageInset} relative`}>
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
    </section>
  );
});
