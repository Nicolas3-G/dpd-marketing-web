"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const personas = [
  {
    tab: "Dreamers",
    title: "The Dreamer",
    description: "Focuses on vision, innovation, and \"what's next\".",
  },
  {
    tab: "Planners",
    title: "The Planner",
    description:
      "Focuses on structure, sequencing, and turning ideas into actionable plans.",
  },
  {
    tab: "Doers",
    title: "The Doer",
    description:
      "Focuses on execution, momentum, and delivering results on the ground.",
  },
] as const;

/** Framework persona tabs + carousel — edit here without affecting other pages. */
export function FrameworkPersonaSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = personas[activeIndex];

  function goTo(index: number) {
    const total = personas.length;
    setActiveIndex(((index % total) + total) % total);
  }

  return (
    <section className="bg-section-gray pt-20 text-[#111111] sm:pt-24 lg:pt-28">
      <div className={`${pageInset} relative pb-24 sm:pb-28`}>
        <div
          className="flex flex-wrap gap-8 sm:gap-12 lg:gap-16"
          role="tablist"
          aria-label="Persona types"
        >
          {personas.map((persona, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={persona.tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`framework-persona-panel-${index}`}
                id={`framework-persona-tab-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`pb-3 text-lg font-bold transition-colors sm:text-xl lg:text-2xl ${
                  isActive
                    ? "border-b-4 border-black text-black"
                    : "border-b-4 border-transparent text-black/55 hover:text-black/80"
                }`}
              >
                {persona.tab}
              </button>
            );
          })}
        </div>

        <div
          id={`framework-persona-panel-${activeIndex}`}
          role="tabpanel"
          aria-labelledby={`framework-persona-tab-${activeIndex}`}
          className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16 xl:gap-20"
        >
          <div>
            <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {active.title}
            </h2>
            <p className="mt-8 max-w-2xl text-xl font-normal leading-8 text-black sm:mt-10 sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.35]">
              {active.description}
            </p>
          </div>

          <div
            className="aspect-4/3 w-full bg-black lg:aspect-auto lg:min-h-[min(28rem,50vw)]"
            aria-hidden
          />
        </div>

        <div className="absolute bottom-10 left-0 flex gap-3">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous persona"
            className="grid size-12 place-items-center rounded-full border border-black text-black transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            <FaArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next persona"
            className="grid size-12 place-items-center rounded-full border border-black text-black transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            <FaArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
