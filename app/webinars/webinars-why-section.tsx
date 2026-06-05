"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  webinarsWhyContent,
  webinarsWorkshopPanels,
  type WebinarsWorkshopId,
  type WebinarsWorkshopPanelItem,
} from "./webinars-why-data";

const workshopKeys = webinarsWhyContent.workshops;

const ITEM_STAGGER_MS = 100;
const ITEM_FADE_MS = 500;

const panelListClass = "flex flex-col gap-10 sm:gap-12 lg:gap-14";

const panelShellClass =
  "flex w-full flex-col bg-custom-black px-8 py-10 sm:px-10 sm:py-12 lg:justify-center lg:px-12 lg:py-14 xl:px-14";

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
}: {
  workshops: readonly WebinarsWorkshopId[];
  active: WebinarsWorkshopId;
  onSelect: (workshop: WebinarsWorkshopId) => void;
}) {
  return (
    <div
      className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:gap-4"
      role="tablist"
      aria-label="Workshops"
    >
      {workshops.map((label) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            type="button"
            role="tab"
            id={`webinars-workshop-tab-${workshopTabSlug(label)}`}
            aria-selected={isActive}
            aria-controls={`webinars-workshop-panel-${workshopTabSlug(label)}`}
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
  items: readonly WebinarsWorkshopPanelItem[];
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
  items: readonly WebinarsWorkshopPanelItem[];
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
  items: readonly WebinarsWorkshopPanelItem[];
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
}: {
  workshopId: WebinarsWorkshopId;
  items: readonly WebinarsWorkshopPanelItem[];
}) {
  return (
    <div
      id={`webinars-workshop-panel-${workshopTabSlug(workshopId)}`}
      role="tabpanel"
      aria-labelledby={`webinars-workshop-tab-${workshopTabSlug(workshopId)}`}
      className={`${panelShellClass} h-full min-h-56 sm:min-h-64 lg:min-h-0`}
    >
      <WorkshopPanelContent items={items} activeKey={workshopId} />
    </div>
  );
}

function WorkshopPanelsColumn({
  activeWorkshop,
}: {
  activeWorkshop: WebinarsWorkshopId;
}) {
  const { measureRef, minHeight } = usePanelMinHeight();

  return (
    <div className="relative min-h-56 w-full min-w-0 sm:min-h-64 lg:min-h-0 lg:h-full">
      <div
        ref={measureRef}
        className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10 w-full"
        aria-hidden
      >
        {workshopKeys.map((workshopId) => (
          <WorkshopPanelMeasure
            key={workshopId}
            items={webinarsWorkshopPanels[workshopId]}
          />
        ))}
      </div>

      <div
        className="h-full"
        style={minHeight > 0 ? { minHeight } : undefined}
      >
        <WorkshopPanel
          workshopId={activeWorkshop}
          items={webinarsWorkshopPanels[activeWorkshop]}
        />
      </div>
    </div>
  );
}

/** Heading + workshop picker left; full-height science panel right. */
export function WebinarsWhySection() {
  const { heading, workshops } = webinarsWhyContent;
  const [activeWorkshop, setActiveWorkshop] = useState<WebinarsWorkshopId>(
    workshops[0],
  );

  return (
    <section id="webinars-why" className="overflow-hidden bg-white text-custom-black">
      <div className="grid w-full items-stretch gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 xl:gap-16">
        <div className="flex min-h-0 flex-col px-5 py-12 sm:px-[45px] sm:py-14 lg:py-16 lg:pr-12 xl:pr-16">
          <h2 className="custom-sm-title-bold">
            {heading}
          </h2>

          <WorkshopOptions
            workshops={workshops}
            active={activeWorkshop}
            onSelect={setActiveWorkshop}
          />
        </div>

        <WorkshopPanelsColumn activeWorkshop={activeWorkshop} />
      </div>
    </section>
  );
}
