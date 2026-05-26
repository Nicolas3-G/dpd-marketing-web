"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  researchWhyReversedContent,
  researchWhyReversedWorkshopPanels,
} from "./research-why-reversed-data";
import {
  researchWhyContent,
  researchWorkshopPanels,
  type ResearchWorkshopPanelItem,
} from "./research-why-data";

const ITEM_STAGGER_MS = 100;
const ITEM_FADE_MS = 500;

const panelListClass = "flex flex-col gap-10 sm:gap-12 lg:gap-14";

const panelShellClass =
  "flex w-full flex-col bg-custom-black px-8 py-10 sm:px-10 sm:py-12 lg:justify-center lg:px-12 lg:py-14 xl:px-14";

type ResearchWhySectionContent = {
  heading: string;
  workshops: readonly string[];
};

type ResearchWhySectionLayoutProps = {
  sectionId: string;
  idPrefix: string;
  content: ResearchWhySectionContent;
  panels: Record<string, readonly ResearchWorkshopPanelItem[]>;
  reversed?: boolean;
};

function workshopTabSlug(workshopId: string) {
  return workshopId.replace(/\s+/g, "-").toLowerCase();
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useStaggeredReveal(activeKey: string) {
  const listRef = useRef<HTMLUListElement>(null);
  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = listRef.current;
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
  }, [inView, activeKey]);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }

    const timeout = window.setTimeout(() => setRevealed(true), 50);
    return () => window.clearTimeout(timeout);
  }, [inView, activeKey]);

  return { listRef, revealed };
}

function usePanelMinHeight() {
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

  return { measureRef, minHeight };
}

function WorkshopOptions({
  workshops,
  active,
  onSelect,
  idPrefix,
}: {
  workshops: readonly string[];
  active: string;
  onSelect: (workshop: string) => void;
  idPrefix: string;
}) {
  return (
    <div
      className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:gap-4"
      role="tablist"
      aria-label="Workshops"
    >
      {workshops.map((label) => {
        const isActive = active === label;
        const slug = workshopTabSlug(label);
        return (
          <button
            key={label}
            type="button"
            role="tab"
            id={`${idPrefix}-workshop-tab-${slug}`}
            aria-selected={isActive}
            aria-controls={`${idPrefix}-workshop-panel-${slug}`}
            onClick={() => onSelect(label)}
            className={`w-fit border-b-2 py-3 text-left text-lg font-bold transition-colors sm:py-4 sm:text-xl ${
              isActive
                ? "border-brand-orange text-custom-black"
                : "border-transparent text-custom-black hover:text-custom-black/80"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function WorkshopPanelContentMeasure({
  items,
}: {
  items: readonly ResearchWorkshopPanelItem[];
}) {
  return (
    <ul className={panelListClass}>
      {items.map(({ label, Icon }) => (
        <li key={label} className="flex flex-col gap-4">
          <Icon className="size-7 shrink-0 text-white" aria-hidden />
          <p className="max-w-md text-base font-medium leading-snug text-white sm:text-lg sm:leading-7">
            {label}
          </p>
        </li>
      ))}
    </ul>
  );
}

function WorkshopPanelContent({
  items,
  activeKey,
}: {
  items: readonly ResearchWorkshopPanelItem[];
  activeKey: string;
}) {
  const { listRef, revealed } = useStaggeredReveal(activeKey);

  return (
    <ul ref={listRef} className={panelListClass}>
      {items.map(({ label, Icon }, index) => (
        <li
          key={label}
          className={`flex flex-col gap-4 transition-[opacity,transform] ease-out motion-reduce:transition-none ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{
            transitionDuration: `${ITEM_FADE_MS}ms`,
            transitionDelay: revealed ? `${index * ITEM_STAGGER_MS}ms` : "0ms",
          }}
        >
          <Icon className="size-7 shrink-0 text-white" aria-hidden />
          <p className="max-w-md text-base font-medium leading-snug text-white sm:text-lg sm:leading-7">
            {label}
          </p>
        </li>
      ))}
    </ul>
  );
}

function WorkshopPanelMeasure({
  items,
}: {
  items: readonly ResearchWorkshopPanelItem[];
}) {
  return (
    <div className={panelShellClass} aria-hidden>
      <WorkshopPanelContentMeasure items={items} />
    </div>
  );
}

function WorkshopPanel({
  workshopId,
  items,
  idPrefix,
}: {
  workshopId: string;
  items: readonly ResearchWorkshopPanelItem[];
  idPrefix: string;
}) {
  const slug = workshopTabSlug(workshopId);
  return (
    <div
      id={`${idPrefix}-workshop-panel-${slug}`}
      role="tabpanel"
      aria-labelledby={`${idPrefix}-workshop-tab-${slug}`}
      className={`${panelShellClass} h-full min-h-56 sm:min-h-64 lg:min-h-0`}
    >
      <WorkshopPanelContent items={items} activeKey={workshopId} />
    </div>
  );
}

function WorkshopPanelsColumn({
  activeWorkshop,
  workshops,
  panels,
  idPrefix,
}: {
  activeWorkshop: string;
  workshops: readonly string[];
  panels: Record<string, readonly ResearchWorkshopPanelItem[]>;
  idPrefix: string;
}) {
  const { measureRef, minHeight } = usePanelMinHeight();

  return (
    <div className="relative min-h-56 w-full min-w-0 sm:min-h-64 lg:min-h-0 lg:h-full">
      <div
        ref={measureRef}
        className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10 w-full"
        aria-hidden
      >
        {workshops.map((workshopId) => (
          <WorkshopPanelMeasure
            key={workshopId}
            items={panels[workshopId]}
          />
        ))}
      </div>

      <div
        className="h-full"
        style={minHeight > 0 ? { minHeight } : undefined}
      >
        <WorkshopPanel
          workshopId={activeWorkshop}
          items={panels[activeWorkshop]}
          idPrefix={idPrefix}
        />
      </div>
    </div>
  );
}

function CopyColumn({
  heading,
  workshops,
  activeWorkshop,
  onSelectWorkshop,
  idPrefix,
  reversed,
}: {
  heading: string;
  workshops: readonly string[];
  activeWorkshop: string;
  onSelectWorkshop: (workshop: string) => void;
  idPrefix: string;
  reversed: boolean;
}) {
  return (
    <div
      className={`flex min-h-0 flex-col px-5 py-12 sm:px-[45px] sm:py-14 lg:py-16 ${
        reversed
          ? "lg:pl-12 xl:pl-16"
          : "lg:pr-12 xl:pr-16"
      }`}
    >
      <h2 className="max-w-2xl text-2xl font-bold leading-[1.12] tracking-[-0.03em] sm:text-3xl lg:text-4xl lg:leading-[1.1]">
        {heading}
      </h2>

      <WorkshopOptions
        workshops={workshops}
        active={activeWorkshop}
        onSelect={onSelectWorkshop}
        idPrefix={idPrefix}
      />
    </div>
  );
}

/** Heading + workshop picker and black panel — optional reversed column order. */
export function ResearchWhySectionLayout({
  sectionId,
  idPrefix,
  content,
  panels,
  reversed = false,
}: ResearchWhySectionLayoutProps) {
  const { heading, workshops } = content;
  const [activeWorkshop, setActiveWorkshop] = useState(workshops[0]);

  const copyColumn = (
    <CopyColumn
      heading={heading}
      workshops={workshops}
      activeWorkshop={activeWorkshop}
      onSelectWorkshop={setActiveWorkshop}
      idPrefix={idPrefix}
      reversed={reversed}
    />
  );

  const panelsColumn = (
    <WorkshopPanelsColumn
      activeWorkshop={activeWorkshop}
      workshops={workshops}
      panels={panels}
      idPrefix={idPrefix}
    />
  );

  const gridClass = reversed
    ? "lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]"
    : "lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]";

  return (
    <section
      id={sectionId}
      className="overflow-hidden bg-white text-custom-black"
    >
      <div
        className={`grid w-full items-stretch gap-10 lg:gap-12 xl:gap-16 ${gridClass}`}
      >
        {reversed ? (
          <>
            {panelsColumn}
            {copyColumn}
          </>
        ) : (
          <>
            {copyColumn}
            {panelsColumn}
          </>
        )}
      </div>
    </section>
  );
}

/** Heading + workshop picker left; black panel right (research page). */
export function ResearchWhySection() {
  return (
    <ResearchWhySectionLayout
      sectionId="research-why"
      idPrefix="research-why"
      content={researchWhyContent}
      panels={researchWorkshopPanels}
    />
  );
}

/** Black panel left; heading + workshop picker right (research page). */
export function ResearchWhyReversedSection() {
  return (
    <ResearchWhySectionLayout
      sectionId="research-why-reversed"
      idPrefix="research-why-reversed"
      content={researchWhyReversedContent}
      panels={researchWhyReversedWorkshopPanels}
      reversed
    />
  );
}
