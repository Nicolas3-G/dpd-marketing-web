"use client";

import { useCallback, useState, type CSSProperties } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { ResearchHeroScienceCard } from "./research-hero-science-card";
import { researchScienceCards } from "./research-science-cards";

const CARD_COUNT = researchScienceCards.length;
/** Horizontal step between stacked cards (~42% of card width, per design). */
const STACK_OFFSET_PERCENT = 42;
const STACK_SPREAD_MULTIPLIER = 1 + (CARD_COUNT - 1) * (STACK_OFFSET_PERCENT / 100);
/** Scale reduction per layer behind the active card. */
const STACK_SCALE_STEP = 0.062;

function stackOrder(cardIndex: number, activeIndex: number): number {
  return (cardIndex - activeIndex + CARD_COUNT) % CARD_COUNT;
}

/** Overlapping blank cards + arrows/dots for the research hero. */
export function ResearchHeroCardStack() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % CARD_COUNT) + CARD_COUNT) % CARD_COUNT);
  }, []);

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
          {Array.from({ length: CARD_COUNT }, (_, cardIndex) => {
            const order = stackOrder(cardIndex, activeIndex);
            const scale = 1 - order * STACK_SCALE_STEP;

            return (
              <div
                key={cardIndex}
                className="absolute inset-0 origin-left overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/6 transition-[transform,z-index] duration-300 ease-out motion-reduce:transition-none"
                style={{
                  zIndex: CARD_COUNT - order,
                  transform: `translateX(calc(${order} * ${STACK_OFFSET_PERCENT}%)) scale(${scale})`,
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
                    : "bg-black/20 hover:bg-black/35"
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
