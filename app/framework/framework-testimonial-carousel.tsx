"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { FrameworkFlowSection } from "./framework-flow-section";
import { FrameworkTestimonialSection } from "./framework-testimonial-section";
import { frameworkTestimonials } from "./framework-testimonials";

const TESTIMONIAL_PANEL_ID = "framework-testimonial-panel";

/** Shared state: flow controls update the testimonial above. */
export function FrameworkTestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonialHeightPx, setTestimonialHeightPx] = useState<number | null>(
    null,
  );
  const testimonialRef = useRef<HTMLElement>(null);
  const slideCount = frameworkTestimonials.length;

  function goTo(index: number) {
    setActiveIndex(((index % slideCount) + slideCount) % slideCount);
  }

  useLayoutEffect(() => {
    const el = testimonialRef.current;
    if (!el) return;

    const measure = () => {
      setTestimonialHeightPx(el.getBoundingClientRect().height);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [activeIndex]);

  return (
    <>
      <FrameworkTestimonialSection
        ref={testimonialRef}
        testimonial={frameworkTestimonials[activeIndex]}
        panelId={TESTIMONIAL_PANEL_ID}
      />
      <FrameworkFlowSection
        activeIndex={activeIndex}
        slideCount={slideCount}
        onSelect={setActiveIndex}
        onPrev={() => goTo(activeIndex - 1)}
        onNext={() => goTo(activeIndex + 1)}
        testimonialPanelId={TESTIMONIAL_PANEL_ID}
        sectionHeightPx={testimonialHeightPx}
      />
    </>
  );
}
