"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { webinarsOfferingContent } from "./webinars-offering-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const ITEM_STAGGER_MS = 100;
const ITEM_FADE_MS = 500;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useSectionStaggeredReveal() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setInView(true);
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }
    setRevealed(false);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }
    const timeout = window.setTimeout(() => setRevealed(true), 50);
    return () => window.clearTimeout(timeout);
  }, [inView]);

  return { gridRef, revealed };
}

function OfferingCard({
  title,
  bullets,
  revealed,
  staggerOffset,
}: {
  title: string;
  bullets: readonly string[];
  revealed: boolean;
  staggerOffset: number;
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-white/12 bg-white/5 p-5 sm:p-6 lg:rounded-2xl lg:p-7">
      <div
        className="mx-auto aspect-4/3 w-[82%] max-w-full shrink-0 bg-custom-black sm:w-[78%]"
        aria-hidden
      />
      <h3 className="mt-5 custom-body-bold text-white sm:mt-6">
        {title}
      </h3>
      <ul className="mt-4 flex flex-1 flex-col gap-3 sm:mt-5 sm:gap-3.5">
        {bullets.map((bullet, index) => {
          const staggerIndex = staggerOffset + index;
          return (
            <li
              key={bullet}
              className={`flex gap-2.5 custom-body leading-relaxed text-white transition-[opacity,transform] ease-out motion-reduce:transition-none ${
                revealed
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDuration: `${ITEM_FADE_MS}ms`,
                transitionDelay: revealed
                  ? `${staggerIndex * ITEM_STAGGER_MS}ms`
                  : "0ms",
              }}
            >
              <span
                className="mt-0.5 shrink-0 text-base font-bold leading-none text-brand-orange"
                aria-hidden
              >
                +
              </span>
              <span>{bullet}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

/** Dark section: heading + three feature cards with image placeholders. */
export function WebinarsOfferingSection() {
  const { heading, cards } = webinarsOfferingContent;
  const { gridRef, revealed } = useSectionStaggeredReveal();

  let bulletOffset = 0;
  const cardsWithOffset = cards.map((card) => {
    const offset = bulletOffset;
    bulletOffset += card.bullets.length;
    return { card, offset };
  });

  return (
    <section
      id="webinars-offering"
      className="relative isolate overflow-hidden py-14 text-white sm:py-16 lg:py-20"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/contact-bg.jpg"
          alt=""
          fill
          className="scale-105 object-cover blur-md"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 z-[1] bg-custom-black/50"
        aria-hidden
      />

      <div className={`relative z-10 ${pageInset}`}>
        <h2 className="custom-xs-title text-white">
          {heading}
        </h2>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:mt-12 md:grid-cols-3 md:gap-5 lg:mt-14 lg:gap-6"
        >
          {cardsWithOffset.map(({ card, offset }) => (
            <OfferingCard
              key={card.title}
              title={card.title}
              bullets={card.bullets}
              revealed={revealed}
              staggerOffset={offset}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
