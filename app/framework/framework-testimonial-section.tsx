import { forwardRef } from "react";

import type { FrameworkTestimonial } from "./framework-testimonials";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

type FrameworkTestimonialSectionProps = {
  testimonial: FrameworkTestimonial;
  panelId?: string;
};

/** Framework testimonial — content driven by flow-section controls. */
export const FrameworkTestimonialSection = forwardRef<
  HTMLElement,
  FrameworkTestimonialSectionProps
>(function FrameworkTestimonialSection(
  { testimonial, panelId = "framework-testimonial-panel" },
  ref,
) {
  return (
    <section
      ref={ref}
      className="bg-brand-orange py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        className={`${pageInset} grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20`}
      >
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
      </div>
    </section>
  );
});
