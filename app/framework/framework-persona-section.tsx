"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import {
  SLIDING_UNDERLINE_CLASS,
  useSlidingUnderline,
} from "@/lib/use-sliding-underline";

import { SLIDE_MS, useSlideCarousel } from "./use-slide-carousel";

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

type Persona = (typeof personas)[number];

function PersonaSlideContent({ persona }: { persona: Persona }) {
  return (
    <>
      <div>
        <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          {persona.title}
        </h2>
        <p className="mt-8 max-w-2xl text-xl font-normal leading-8 text-black sm:mt-10 sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.35]">
          {persona.description}
        </p>
      </div>

      <div
        className="aspect-4/3 w-full bg-black lg:aspect-auto lg:min-h-[min(28rem,50vw)]"
        aria-hidden
      />
    </>
  );
}

const slideGridClass =
  "grid items-start gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20";

type PersonaSlidePanelProps = {
  activeIndex: number;
  panelId: string;
  labelledBy: string;
};

function PersonaSlidePanel({
  activeIndex,
  panelId,
  labelledBy,
}: PersonaSlidePanelProps) {
  const { displayIndex, isSliding, transition, enterX, exitX, animate } =
    useSlideCarousel(activeIndex, personas.length);

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      className="relative mt-12 overflow-hidden lg:mt-16"
    >
      {isSliding && transition ? (
        <>
          <div className={`invisible ${slideGridClass}`} aria-hidden>
            <PersonaSlideContent persona={personas[displayIndex]} />
          </div>

          <div
            className={`absolute inset-0 ${slideGridClass} transition-transform ease-in-out motion-reduce:transition-none`}
            style={{
              transform: `translateX(${exitX}%)`,
              transitionDuration: animate ? `${SLIDE_MS}ms` : "0ms",
            }}
            aria-hidden
          >
            <PersonaSlideContent persona={personas[transition.from]} />
          </div>

          <div
            className={`absolute inset-0 ${slideGridClass} transition-transform ease-in-out motion-reduce:transition-none`}
            style={{
              transform: `translateX(${enterX}%)`,
              transitionDuration: animate ? `${SLIDE_MS}ms` : "0ms",
            }}
          >
            <PersonaSlideContent persona={personas[displayIndex]} />
          </div>
        </>
      ) : (
        <div className={slideGridClass}>
          <PersonaSlideContent persona={personas[displayIndex]} />
        </div>
      )}
    </div>
  );
}

type PersonaTabListProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

function PersonaTabList({ activeIndex, onSelect }: PersonaTabListProps) {
  const { containerRef, line, syncLine } = useSlidingUnderline();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const syncToActiveTab = useCallback(() => {
    const el = tabRefs.current[activeIndex];
    if (el) {
      syncLine(el);
    }
  }, [activeIndex, syncLine]);

  useLayoutEffect(() => {
    syncToActiveTab();
  }, [syncToActiveTab]);

  function handleTablistMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    const next = e.relatedTarget;
    if (next instanceof Node && e.currentTarget.contains(next)) {
      return;
    }
    syncToActiveTab();
  }

  function handleTabFocusIn(e: FocusEvent<HTMLDivElement>) {
    const t = e.target;
    if (!(t instanceof HTMLElement)) {
      return;
    }
    const tab = t.closest('[role="tab"]');
    if (!tab || !containerRef.current?.contains(tab)) {
      return;
    }
    syncLine(tab);
  }

  function handleTablistFocusOut(e: FocusEvent<HTMLDivElement>) {
    const next = e.relatedTarget;
    if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
      syncToActiveTab();
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap gap-8 sm:gap-12 lg:gap-16"
      role="tablist"
      aria-label="Persona types"
      onMouseLeave={handleTablistMouseLeave}
      onFocusCapture={handleTabFocusIn}
      onBlurCapture={handleTablistFocusOut}
    >
      <span
        aria-hidden
        className={SLIDING_UNDERLINE_CLASS}
        style={{
          left: line.left,
          width: line.width,
          opacity: line.active ? 1 : 0,
        }}
      />
      {personas.map((persona, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={persona.tab}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`framework-persona-panel-${index}`}
            id={`framework-persona-tab-${index}`}
            onClick={() => onSelect(index)}
            onMouseEnter={(e) => syncLine(e.currentTarget)}
            className={`pb-3 text-lg font-bold transition-colors sm:text-xl lg:text-2xl ${
              isActive ? "text-black" : "text-black/55 hover:text-black/80"
            }`}
          >
            {persona.tab}
          </button>
        );
      })}
    </div>
  );
}

/** Framework persona tabs + carousel — edit here without affecting other pages. */
export function FrameworkPersonaSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    const total = personas.length;
    const next = ((index % total) + total) % total;
    if (next === activeIndex) {
      return;
    }
    setActiveIndex(next);
  }, [activeIndex]);

  return (
    <section className="bg-section-gray pt-20 text-[#111111] sm:pt-24 lg:pt-28">
      <div className={`${pageInset} relative pb-24 sm:pb-28`}>
        <PersonaTabList activeIndex={activeIndex} onSelect={goTo} />

        <PersonaSlidePanel
          activeIndex={activeIndex}
          panelId={`framework-persona-panel-${activeIndex}`}
          labelledBy={`framework-persona-tab-${activeIndex}`}
        />

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
