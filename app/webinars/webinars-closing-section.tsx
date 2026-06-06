"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  webinarsClosingContent,
  type WebinarsClosingCard,
} from "./webinars-closing-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const ITEM_STAGGER_MS = 280;
const ITEM_FADE_MS = 500;
/** Wait after the grid enters view before the first card animates. */
const REVEAL_START_DELAY_MS = 200;
/** Require the grid to scroll further into the viewport before triggering. */
const REVEAL_ROOT_MARGIN = "0px 0px -22% 0px";
const REVEAL_THRESHOLD = 0.2;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useCardsStaggeredReveal() {
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
      { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
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
    const timeout = window.setTimeout(
      () => setRevealed(true),
      REVEAL_START_DELAY_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [inView]);

  return { gridRef, revealed };
}

function ClosingCard({
  title,
  description,
  linkLabel,
  href,
  index,
  revealed,
}: WebinarsClosingCard & { index: number; revealed: boolean }) {
  return (
    <article
      className={`flex min-h-68 flex-col border border-custom-black/12 bg-white p-7 transition-[opacity,translate] ease-out will-change-[opacity,translate] motion-reduce:transition-none sm:min-h-72 sm:p-8 ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        transitionDuration: `${ITEM_FADE_MS}ms`,
        transitionDelay: revealed ? `${index * ITEM_STAGGER_MS}ms` : "0ms",
      }}
    >
      <h3 className="custom-xs-title-bold">{title}</h3>
      <p className="mt-4 custom-body-sm text-custom-black">
        {description}
      </p>
      <a
        href={href}
        className="mt-auto pt-10 custom-body-sm text-custom-black underline decoration-custom-black/80 underline-offset-[3px] transition hover:text-custom-black/70"
      >
        {linkLabel}
      </a>
    </article>
  );
}

/** Centered headline, supporting copy, and three feature cards — below the CTA banner. */
export function WebinarsClosingSection() {
  const { heading, description, cards } = webinarsClosingContent;
  const { gridRef, revealed } = useCardsStaggeredReveal();

  return (
    <section
      id="webinars-closing"
      className="bg-white pb-14 pt-14 text-custom-black sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20"
    >
      <div className={pageInset}>
        <div className="flex flex-col items-center text-center">
          <h2 className="custom-sm-title-bold max-w-4xl">{heading}</h2>
          <p className="mt-5 max-w-2xl custom-body text-custom-black">
            {description}
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 md:gap-6 lg:mt-14"
        >
          {cards.map((card, index) => (
            <ClosingCard
              key={card.title}
              {...card}
              index={index}
              revealed={revealed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
