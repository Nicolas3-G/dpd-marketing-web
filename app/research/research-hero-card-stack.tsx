"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { ResearchHeroScienceCard } from "./research-hero-science-card";
import { researchScienceCards } from "./research-science-cards";

const CARD_COUNT = researchScienceCards.length;
/** Horizontal step between stacked cards (~42% of card width, per design). */
const STACK_OFFSET_PERCENT = 42;
const STACK_SPREAD_MULTIPLIER = 1 + (CARD_COUNT - 1) * (STACK_OFFSET_PERCENT / 100);
/** Scale reduction per layer behind the active card. */
const STACK_SCALE_STEP = 0.062;
const TRANSITION_MS = 300;
/** How far the front card drifts left while fading out (negative = left). */
const FADE_OUT_OFFSET_PERCENT = -14;
/** Front card starts this far left when fading in on prev (negative = left). */
const FADE_IN_FROM_LEFT_PERCENT = -14;

const cardShellClass =
  "absolute inset-0 origin-left overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-custom-black/6";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function stackOrder(cardIndex: number, activeIndex: number): number {
  return (cardIndex - activeIndex + CARD_COUNT) % CARD_COUNT;
}

function stackTransform(order: number) {
  const scale = 1 - order * STACK_SCALE_STEP;
  return {
    zIndex: CARD_COUNT - order,
    transform: `translateX(calc(${order} * ${STACK_OFFSET_PERCENT}%)) scale(${scale})`,
  };
}

type FadingOutCardProps = {
  cardIndex: number;
};

type FadingOutBackCardProps = {
  cardIndex: number;
  atActiveIndex: number;
};

type FadingInCardProps = {
  cardIndex: number;
  activeIndex: number;
};

type FadingInFrontCardProps = {
  cardIndex: number;
};

/** Back-of-stack card fades in after the front card exits (next). */
function FadingInCard({ cardIndex, activeIndex }: FadingInCardProps) {
  const order = stackOrder(cardIndex, activeIndex);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEntered(true);
      return;
    }

    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`${cardShellClass} pointer-events-none transition-opacity ease-out motion-reduce:transition-none ${
        entered ? "opacity-100" : "opacity-0"
      }`}
      style={{
        ...stackTransform(order),
        transitionDuration: `${TRANSITION_MS}ms`,
      }}
      aria-hidden
    >
      <ResearchHeroScienceCard {...researchScienceCards[cardIndex]} />
    </div>
  );
}

/** Back-of-stack card fades out instead of sliding to the front (prev). */
function FadingOutBackCard({ cardIndex, atActiveIndex }: FadingOutBackCardProps) {
  const order = stackOrder(cardIndex, atActiveIndex);
  const [exited, setExited] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setExited(true);
      return;
    }

    const frame = requestAnimationFrame(() => setExited(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`${cardShellClass} pointer-events-none transition-opacity ease-out motion-reduce:transition-none ${
        exited ? "opacity-0" : "opacity-100"
      }`}
      style={{
        ...stackTransform(order),
        transitionDuration: `${TRANSITION_MS}ms`,
      }}
      aria-hidden
    >
      <ResearchHeroScienceCard {...researchScienceCards[cardIndex]} />
    </div>
  );
}

/** Front card fades in after the back card exits (prev). */
function FadingInFrontCard({ cardIndex }: FadingInFrontCardProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEntered(true);
      return;
    }

    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`${cardShellClass} pointer-events-none transition-[opacity,transform] ease-out motion-reduce:transition-none ${
        entered ? "opacity-100" : "opacity-0"
      }`}
      style={{
        zIndex: CARD_COUNT + 2,
        transform: entered
          ? "translateX(0) scale(1)"
          : `translateX(${FADE_IN_FROM_LEFT_PERCENT}%) scale(1)`,
        transitionDuration: `${TRANSITION_MS}ms`,
      }}
      aria-hidden
    >
      <ResearchHeroScienceCard {...researchScienceCards[cardIndex]} />
    </div>
  );
}

/** Front card fades and drifts left while the stack slides forward. */
function FadingOutCard({ cardIndex }: FadingOutCardProps) {
  const [exited, setExited] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setExited(true);
      return;
    }

    const frame = requestAnimationFrame(() => setExited(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`${cardShellClass} pointer-events-none transition-[opacity,transform] ease-out motion-reduce:transition-none ${
        exited ? "opacity-0" : "opacity-100"
      }`}
      style={{
        zIndex: CARD_COUNT + 2,
        transform: exited
          ? `translateX(${FADE_OUT_OFFSET_PERCENT}%) scale(1)`
          : "translateX(0) scale(1)",
        transitionDuration: `${TRANSITION_MS}ms`,
      }}
      aria-hidden
    >
      <ResearchHeroScienceCard {...researchScienceCards[cardIndex]} />
    </div>
  );
}

/** Overlapping blank cards + arrows/dots for the research hero. */
export function ResearchHeroCardStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadingOutIndex, setFadingOutIndex] = useState<number | null>(null);
  const [fadingOutBack, setFadingOutBack] = useState<{
    cardIndex: number;
    atActiveIndex: number;
  } | null>(null);
  const [fadingInIndex, setFadingInIndex] = useState<number | null>(null);
  const [fadingInFrontIndex, setFadingInFrontIndex] = useState<number | null>(
    null,
  );
  const fadeTimeoutsRef = useRef<{
    out?: ReturnType<typeof setTimeout>;
    in?: ReturnType<typeof setTimeout>;
  }>({});

  const clearFadeTimeouts = useCallback(() => {
    const { out, in: fadeIn } = fadeTimeoutsRef.current;
    if (out) clearTimeout(out);
    if (fadeIn) clearTimeout(fadeIn);
    fadeTimeoutsRef.current = {};
  }, []);

  const clearFadeOverlays = useCallback(() => {
    setFadingOutIndex(null);
    setFadingOutBack(null);
    setFadingInIndex(null);
    setFadingInFrontIndex(null);
  }, []);

  const runTwoPhaseFade = useCallback(
    (onOutComplete: () => void, onInComplete: () => void) => {
      fadeTimeoutsRef.current.out = setTimeout(() => {
        onOutComplete();
        fadeTimeoutsRef.current.out = undefined;

        fadeTimeoutsRef.current.in = setTimeout(() => {
          onInComplete();
          fadeTimeoutsRef.current.in = undefined;
        }, TRANSITION_MS);
      }, TRANSITION_MS);
    },
    [],
  );

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;
      if (next === activeIndex) return;

      clearFadeTimeouts();
      clearFadeOverlays();

      const isNextStep =
        (next - activeIndex + CARD_COUNT) % CARD_COUNT === 1;
      const isPrevStep =
        (activeIndex - next + CARD_COUNT) % CARD_COUNT === 1;

      if (isNextStep && !prefersReducedMotion()) {
        const outgoingIndex = activeIndex;
        setFadingOutIndex(outgoingIndex);
        setActiveIndex(next);

        runTwoPhaseFade(
          () => {
            setFadingOutIndex(null);
            setFadingInIndex(outgoingIndex);
          },
          () => setFadingInIndex(null),
        );
        return;
      }

      if (isPrevStep && !prefersReducedMotion()) {
        const incomingFrontIndex = next;
        const previousActiveIndex = activeIndex;
        setFadingOutBack({
          cardIndex: incomingFrontIndex,
          atActiveIndex: previousActiveIndex,
        });
        setActiveIndex(next);

        runTwoPhaseFade(
          () => {
            setFadingOutBack(null);
            setFadingInFrontIndex(incomingFrontIndex);
          },
          () => setFadingInFrontIndex(null),
        );
        return;
      }

      setActiveIndex(next);
    },
    [activeIndex, clearFadeOverlays, clearFadeTimeouts, runTwoPhaseFade],
  );

  useEffect(
    () => () => {
      clearFadeTimeouts();
    },
    [clearFadeTimeouts],
  );

  return (
    <div
      className="relative mx-auto w-[calc(17.5rem*var(--research-stack-spread))] max-w-full lg:mx-0 lg:ml-auto lg:w-[calc(18.5rem*var(--research-stack-spread))] xl:w-[calc(19.5rem*var(--research-stack-spread))]"
      style={
        {
          "--research-stack-spread": STACK_SPREAD_MULTIPLIER,
        } as CSSProperties
      }
    >
      <div className="relative h-[min(52vw,22rem)] sm:h-88 lg:h-[26rem] xl:h-[28rem]">
        <div className="absolute top-1/2 left-0 h-full w-[17.5rem] max-w-[min(17.5rem,100%)] -translate-y-1/2 sm:w-72 lg:w-[18.5rem] xl:w-[19.5rem]">
          {fadingOutIndex !== null ? (
            <FadingOutCard cardIndex={fadingOutIndex} />
          ) : null}

          {fadingOutBack !== null ? (
            <FadingOutBackCard
              cardIndex={fadingOutBack.cardIndex}
              atActiveIndex={fadingOutBack.atActiveIndex}
            />
          ) : null}

          {fadingInIndex !== null ? (
            <FadingInCard
              cardIndex={fadingInIndex}
              activeIndex={activeIndex}
            />
          ) : null}

          {fadingInFrontIndex !== null ? (
            <FadingInFrontCard cardIndex={fadingInFrontIndex} />
          ) : null}

          {Array.from({ length: CARD_COUNT }, (_, cardIndex) => {
            if (
              cardIndex === fadingOutIndex ||
              cardIndex === fadingInIndex ||
              cardIndex === fadingInFrontIndex ||
              fadingOutBack?.cardIndex === cardIndex
            ) {
              return null;
            }

            const order = stackOrder(cardIndex, activeIndex);

            return (
              <div
                key={cardIndex}
                className={`${cardShellClass} transition-[transform,z-index] ease-out motion-reduce:transition-none`}
                style={{
                  ...stackTransform(order),
                  transitionDuration: `${TRANSITION_MS}ms`,
                }}
                aria-hidden={order !== 0}
              >
                <ResearchHeroScienceCard {...researchScienceCards[cardIndex]} />
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="mt-8 flex items-center justify-center gap-5 sm:mt-10"
        role="group"
        aria-label="Research cards"
      >
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous card"
          className="inline-flex size-10 items-center justify-center text-brand-orange transition hover:text-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
        >
          <FaChevronLeft className="size-5" aria-hidden />
        </button>

        <div
          className="flex items-center gap-2.5"
          role="tablist"
          aria-label="Card slides"
        >
          {Array.from({ length: CARD_COUNT }, (_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={researchScienceCards[index].title}
                onClick={() => goTo(index)}
                className={`size-2.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-brand-orange"
                    : "bg-custom-black/20 hover:bg-custom-black/35"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next card"
          className="inline-flex size-10 items-center justify-center text-brand-orange transition hover:text-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
        >
          <FaChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
