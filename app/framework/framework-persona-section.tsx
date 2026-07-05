"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
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
    title: "The Dreamer Persona",
    description:
      "The Dreamer Persona helps individuals and teams move beyond current constraints and imagine new possibilities. It opens the field of thinking so people can see what could exist before deciding what should be done or built.\n\nBest for moments that require exploration, ideation, reframing, or possibility thinking.",
    imageSrc: "/Dreamers/dreamer-wide.jpg",
    imageAlt: "A dreamer persona.",
  },
  {
    tab: "Planners",
    title: "The Planner Persona",
    description:
      "The Planner Persona helps individuals and teams turn ideas into structure before action begins. It creates the path from possibility to coordinated action.\n\nBest for moments that require prioritizing, sequencing, assigning ownership, or building the plan.",
    imageSrc: "/Planners/planner-wide.jpg",
    imageAlt: "A planner persona.",
  },
  {
    tab: "Doers",
    title: "The Doer Persona",
    description:
      "The Doer Persona helps individuals and teams move from discussion into focused action. It converts plans into visible progress, follow-through, and real results.\n\nBest for moments that require action, implementation, accountability, and outcome delivery.",
    imageSrc: "/Doers/doer-wide.jpg",
    imageAlt: "A doer persona.",
  },
] as const;

type Persona = (typeof personas)[number];

function PersonaTextContent({ persona, minHeight }: { persona: Persona; minHeight?: number }) {
  const descriptionParagraphs = persona.description
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div style={minHeight ? { minHeight } : undefined}>
      <h2 className="custom-md-title-bold leading-tight">
        {persona.title}
      </h2>
      <div className="mt-8 max-w-2xl custom-body text-white sm:mt-10 sm:leading-10 lg:leading-[1.35]">
        {descriptionParagraphs.map((para, idx) => (
          <p key={idx} className={idx === 0 ? undefined : "mt-6"}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

function PersonaSlideContent({ persona, textMinHeight }: { persona: Persona; textMinHeight?: number }) {
  return (
    <>
      <PersonaTextContent persona={persona} minHeight={textMinHeight} />

      {persona.imageSrc ? (
        <div className="relative aspect-4/3 w-full overflow-hidden lg:aspect-auto lg:min-h-[min(28rem,50vw)]">
          <Image
            src={persona.imageSrc}
            alt={persona.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={persona.tab === "Doers"}
          />
        </div>
      ) : (
        <div
          className="aspect-4/3 w-full bg-custom-black lg:aspect-auto lg:min-h-[min(28rem,50vw)]"
          aria-hidden
        />
      )}
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

  const measureRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState(0);

  const updateMinHeight = useCallback(() => {
    const container = measureRef.current;
    if (!container) return;
    const heights = Array.from(container.children).map(
      (child) => (child as HTMLElement).offsetHeight,
    );
    const max = Math.max(0, ...heights);
    if (max > 0) setMinHeight(max);
  }, []);

  useLayoutEffect(() => {
    updateMinHeight();
    const container = measureRef.current;
    if (!container) return;
    const observer = new ResizeObserver(updateMinHeight);
    observer.observe(container);
    window.addEventListener("resize", updateMinHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMinHeight);
    };
  }, [updateMinHeight]);

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      className="relative mt-12 overflow-hidden lg:mt-16"
    >
      {/* Invisible text-only sizer — measures tallest text section so image stays at a consistent position */}
      <div
        ref={measureRef}
        className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10 w-full"
        aria-hidden
        inert
      >
        {personas.map((persona) => (
          <PersonaTextContent key={persona.tab} persona={persona} />
        ))}
      </div>

      {isSliding && transition ? (
        <>
          <div className={`invisible ${slideGridClass}`} aria-hidden>
            <PersonaSlideContent persona={personas[displayIndex]} textMinHeight={minHeight} />
          </div>

          <div
            className={`absolute inset-0 ${slideGridClass} transition-transform ease-in-out motion-reduce:transition-none`}
            style={{
              transform: `translateX(${exitX}%)`,
              transitionDuration: animate ? `${SLIDE_MS}ms` : "0ms",
            }}
            aria-hidden
          >
            <PersonaSlideContent persona={personas[transition.from]} textMinHeight={minHeight} />
          </div>

          <div
            className={`absolute inset-0 ${slideGridClass} transition-transform ease-in-out motion-reduce:transition-none`}
            style={{
              transform: `translateX(${enterX}%)`,
              transitionDuration: animate ? `${SLIDE_MS}ms` : "0ms",
            }}
          >
            <PersonaSlideContent persona={personas[displayIndex]} textMinHeight={minHeight} />
          </div>
        </>
      ) : (
        <div className={slideGridClass}>
          <PersonaSlideContent persona={personas[displayIndex]} textMinHeight={minHeight} />
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
    if (
      !(tab instanceof HTMLElement) ||
      !containerRef.current?.contains(tab)
    ) {
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
        className={`${SLIDING_UNDERLINE_CLASS} !bg-brand-orange`}
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
            className={`pb-3 custom-body-bold transition-colors ${
              isActive ? "text-brand-orange" : "text-white/55 hover:text-white/80"
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
    const clamped = Math.max(0, Math.min(personas.length - 1, index));
    if (clamped === activeIndex) return;
    setActiveIndex(clamped);
  }, [activeIndex]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { index } = (e as CustomEvent<{ index: number }>).detail;
      goTo(index);
    };
    window.addEventListener("dpd:select-persona", handler);
    return () => window.removeEventListener("dpd:select-persona", handler);
  }, [goTo]);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === personas.length - 1;

  return (
    <section id="framework-personas" className="bg-custom-black pt-12 text-white scroll-mt-20">
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
            disabled={isFirst}
            aria-label="Previous persona"
            className="grid size-12 place-items-center rounded-full border border-white text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <FaArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={isLast}
            aria-label="Next persona"
            className="grid size-12 place-items-center rounded-full border border-white text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <FaArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
