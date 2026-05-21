"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

type FrameworkFlowSectionProps = {
  activeIndex: number;
  slideCount: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  testimonialPanelId?: string;
  /** Matches orange testimonial section height when set. */
  sectionHeightPx?: number | null;
};

/** Flow headline + controls; dots/arrows update the testimonial section. */
export function FrameworkFlowSection({
  activeIndex,
  slideCount,
  onSelect,
  onPrev,
  onNext,
  testimonialPanelId = "framework-testimonial-panel",
  sectionHeightPx = null,
}: FrameworkFlowSectionProps) {
  return (
    <section
      className="bg-background text-[#111111]"
      style={
        sectionHeightPx != null ? { height: sectionHeightPx } : undefined
      }
    >
      <div
        className={`${pageInset} relative flex h-full min-h-full flex-col pt-10 pb-16 sm:pb-20 lg:pb-24`}
      >
        <div className="flex items-center justify-between gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
          <div
            className="flex gap-5"
            role="tablist"
            aria-label="Testimonials"
          >
            {Array.from({ length: slideCount }, (_, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={testimonialPanelId}
                  aria-label={`Testimonial ${index + 1}`}
                  onClick={() => onSelect(index)}
                  className={`size-4 rounded-full transition-colors ${
                    isActive ? "bg-black" : "bg-black/25 hover:bg-black/40"
                  }`}
                />
              );
            })}
          </div>

          <div className="flex justify-end gap-4 lg:col-start-2 lg:w-full lg:max-w-2xl lg:justify-end">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous testimonial"
              className="grid size-14 place-items-center rounded-full border border-black text-black transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:size-16"
            >
              <FaArrowLeft className="size-5 sm:size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next testimonial"
              className="grid size-14 place-items-center rounded-full border border-black text-black transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:size-16"
            >
              <FaArrowRight className="size-5 sm:size-6" aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <h2 className="max-w-5xl text-4xl font-bold leading-[0.98] tracking-tighter sm:text-5xl lg:text-6xl">
            Dream. Plan. Do. Together in Flow.
          </h2>
        </div>
      </div>
    </section>
  );
}
