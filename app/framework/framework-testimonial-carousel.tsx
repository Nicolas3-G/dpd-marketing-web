"use client";

import { useCallback, useRef, useState } from "react";

import { FrameworkTestimonialSection } from "./framework-testimonial-section";
import { frameworkTestimonials } from "./framework-testimonials";

const TESTIMONIAL_PANEL_ID = "framework-testimonial-panel";

/** Shared state: flow controls update the testimonial above. */
export function FrameworkTestimonialCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
  const testimonialRef = useRef<HTMLElement>(null);
  const slideCount = frameworkTestimonials.length;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % slideCount) + slideCount) % slideCount;
      if (next === activeIndex) {
        return;
      }
      setActiveIndex(next);
    },
    [activeIndex, slideCount],
  );

  return (
    <FrameworkTestimonialSection
      ref={testimonialRef}
      activeIndex={activeIndex}
      testimonials={frameworkTestimonials}
      panelId={TESTIMONIAL_PANEL_ID}
      onSelect={goTo}
      onPrev={() => goTo(activeIndex - 1)}
      onNext={() => goTo(activeIndex + 1)}
    />
  );
}
