"use client";

/**
 * Infinite horizontal belt: scroll scrubs within one loop, auto-drifts continuously.
 * Three identical runs of `cards` so wrapping never shows empty space.
 */

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Pixels per second — auto drift to the left (negative X). */
const AUTO_SCROLL_PX_PER_SEC = 42;

/** Repeating units in the DOM (≥2). Three gives headroom while auto + scroll combine. */
const LOOP_COPIES = 3;

export type AboutScrollCard = {
  src: string;
  alt: string;
};

type AboutScrollCardStripProps = {
  cards: AboutScrollCard[];
};

export function AboutScrollCardStrip({ cards }: AboutScrollCardStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;

    if (!strip || !track) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let measureFrameId = 0;
    let tickId = 0;
    let lastTickMs = performance.now();
    let currentX = 0;
    let scrollLinkedX = 0;
    let autoOffset = 0;

    const setTrackPosition = (x: number) => {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const measureLoopWidth = () => {
      const full = track.scrollWidth;
      return full > 0 ? full / LOOP_COPIES : 0;
    };

    const updateScrollLinked = () => {
      measureFrameId = 0;

      if (motionQuery.matches) {
        scrollLinkedX = 0;
        autoOffset = 0;
        currentX = 0;
        setTrackPosition(0);
        return;
      }

      const loopW = measureLoopWidth();
      if (loopW <= 0) {
        scrollLinkedX = 0;
        setTrackPosition(currentX);
        return;
      }

      /** Pan range for scroll: one loop minus viewport (infinite-friendly). */
      const scrollRange = Math.max(0, loopW - strip.clientWidth);
      if (scrollRange <= 0) {
        scrollLinkedX = 0;
        setTrackPosition(currentX);
        return;
      }

      const viewportHeight = window.innerHeight;
      const rect = strip.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const start = elementTop - viewportHeight * 1.3;
      const end = elementTop + strip.offsetHeight;
      const progress = Math.min(
        Math.max((window.scrollY - start) / (end - start), 0),
        1,
      );

      scrollLinkedX = -scrollRange * progress;
    };

    const tick = (now: number) => {
      tickId = window.requestAnimationFrame(tick);

      if (motionQuery.matches) {
        lastTickMs = now;
        return;
      }

      const dt = Math.min(now - lastTickMs, 64);
      lastTickMs = now;

      const loopW = measureLoopWidth();
      if (loopW > 0) {
        autoOffset -= AUTO_SCROLL_PX_PER_SEC * (dt / 1000);
        while (autoOffset <= -loopW) {
          autoOffset += loopW;
          currentX += loopW;
        }
      }

      const targetX = scrollLinkedX + autoOffset;
      const distance = targetX - currentX;

      if (Math.abs(distance) < 0.35) {
        currentX = targetX;
      } else {
        currentX += distance * 0.055;
      }

      setTrackPosition(currentX);
    };

    const requestScrollUpdate = () => {
      if (measureFrameId) {
        return;
      }

      measureFrameId = window.requestAnimationFrame(() => {
        updateScrollLinked();
      });
    };

    const resizeObserver = new ResizeObserver(requestScrollUpdate);
    resizeObserver.observe(strip);
    resizeObserver.observe(track);

    const onMotionQueryChange = () => {
      updateScrollLinked();
      lastTickMs = performance.now();
    };

    updateScrollLinked();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    motionQuery.addEventListener("change", onMotionQueryChange);

    lastTickMs = performance.now();
    tickId = window.requestAnimationFrame(tick);

    return () => {
      if (measureFrameId) {
        window.cancelAnimationFrame(measureFrameId);
      }

      if (tickId) {
        window.cancelAnimationFrame(tickId);
      }

      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      motionQuery.removeEventListener("change", onMotionQueryChange);
    };
  }, [cards]);

  const copies = Array.from({ length: LOOP_COPIES }, (_, copy) => copy);

  return (
    <div
      ref={stripRef}
      className="about-card-strip relative left-1/2 mt-6 w-screen -translate-x-1/2 sm:mt-8"
    >
      <div ref={trackRef} className="about-card-strip__track">
        {copies.flatMap((copy) =>
          cards.map((card, i) => (
            <div
              key={`${copy}-${card.src}-${i}`}
              className="about-card-strip__card relative aspect-8/5 overflow-hidden rounded-2xl bg-black/5 shadow-[0_18px_45px_rgba(39,39,31,0.08)]"
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 85vw"
                className="object-cover"
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
