"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ScrollCard = {
  src: string;
  alt: string;
};

type ScrollCardStripProps = {
  cards: ScrollCard[];
};

export function ScrollCardStrip({ cards }: ScrollCardStripProps) {
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
    let animationFrameId = 0;
    let currentX = 0;
    let targetX = 0;

    const setTrackPosition = (x: number) => {
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const animatePosition = () => {
      const distance = targetX - currentX;

      if (Math.abs(distance) < 0.35) {
        currentX = targetX;
        setTrackPosition(currentX);
        animationFrameId = 0;
        return;
      }

      currentX += distance * 0.055;
      setTrackPosition(currentX);
      animationFrameId = window.requestAnimationFrame(animatePosition);
    };

    const requestAnimation = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(animatePosition);
    };

    const updatePosition = () => {
      measureFrameId = 0;

      if (motionQuery.matches) {
        targetX = 0;
        currentX = 0;
        setTrackPosition(currentX);
        return;
      }

      const viewportHeight = window.innerHeight;
      const scrollDistance = track.scrollWidth - strip.clientWidth;

      if (scrollDistance <= 0) {
        targetX = 0;
        currentX = 0;
        setTrackPosition(currentX);
        return;
      }

      const rect = strip.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const start = elementTop - viewportHeight * 1.3;
      const end = elementTop + strip.offsetHeight;
      const progress = Math.min(
        Math.max((window.scrollY - start) / (end - start), 0),
        1,
      );

      targetX = -scrollDistance * progress;
      requestAnimation();
    };

    const requestUpdate = () => {
      if (measureFrameId) {
        return;
      }

      measureFrameId = window.requestAnimationFrame(updatePosition);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(strip);
    resizeObserver.observe(track);

    updatePosition();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    motionQuery.addEventListener("change", requestUpdate);

    return () => {
      if (measureFrameId) {
        window.cancelAnimationFrame(measureFrameId);
      }

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      motionQuery.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <div
      ref={stripRef}
      className="card-strip relative left-1/2 mt-14 w-screen -translate-x-1/2"
    >
      <div ref={trackRef} className="card-strip__track">
        {cards.map((card) => (
          <div
            key={card.src}
            className="card-strip__card relative aspect-4/5 overflow-hidden bg-custom-black/5 shadow-[0_18px_45px_rgba(39,39,31,0.08)]"
          >
            <Image
              src={card.src}
              alt={card.alt}
              fill
              sizes="(min-width: 1024px) calc((100vw - 12.5rem) / 6), (min-width: 640px) calc((100vw - 3rem) / 3), calc((100vw - 1.5rem) / 2)"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
