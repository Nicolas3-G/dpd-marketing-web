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
  type ResearchWorkshopPanelContent,
  type ResearchWorkshopPanelItem,
  type ResearchWorkshopProsePanel,
} from "./research-why-data";

const ITEM_STAGGER_MS = 100;
const ITEM_FADE_MS = 500;

const panelListClass = "flex flex-col gap-10 sm:gap-12 lg:gap-14";

const panelShellClass =
  "flex w-full flex-col bg-custom-black px-8 py-10 sm:px-10 sm:py-12 lg:justify-center lg:px-12 lg:py-14 xl:px-14";

type ResearchWhySectionContent = {
  heading?: string;
  workshops: readonly string[];
};

type ResearchWhySectionLayoutProps = {
  sectionId: string;
  idPrefix: string;
  content: ResearchWhySectionContent;
  panels: Record<string, ResearchWorkshopPanelContent>;
  reversed?: boolean;
};

const panelParagraphClass =
  "text-base font-medium leading-relaxed text-white/90 sm:text-lg sm:leading-7";

const panelSubheadingClass =
  "text-base font-bold text-white sm:text-lg";

const panelLinkClass =
  "text-base font-medium text-brand-orange transition-colors hover:text-brand-orange-hover sm:text-lg";

function workshopTabSlug(workshopId: string) {
  return workshopId.replace(/\s+/g, "-").toLowerCase();
}

function resolveWorkshopPanel(
  panels: Record<string, ResearchWorkshopPanelContent>,
  workshopId: string,
  fallbackWorkshopId: string,
) {
  return panels[workshopId] ?? panels[fallbackWorkshopId];
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useStaggeredReveal(activeKey: string) {
  const listRef = useRef<HTMLElement>(null);
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

const workshopTabListClass =
  "flex w-full max-w-md flex-col gap-3 sm:gap-4";

function WorkshopOptions({
  workshops,
  active,
  onSelect,
  idPrefix,
  compactTop = false,
}: {
  workshops: readonly string[];
  active: string;
  onSelect: (workshop: string) => void;
  idPrefix: string;
  compactTop?: boolean;
}) {
  return (
    <div
      className={`${workshopTabListClass} ${
        compactTop ? "mt-0 sm:mt-0" : "mt-8 sm:mt-10"
      }`}
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
            className={`w-fit border-b-2 pt-3 pb-1 text-left text-lg font-bold transition-colors sm:pt-4 sm:pb-1.5 sm:text-xl ${
              isActive
                ? "border-brand-orange text-brand-orange"
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

function WorkshopProsePanelBody({ content }: { content: ResearchWorkshopProsePanel }) {
  return (
    <div className="flex max-w-2xl flex-col gap-6 sm:gap-7">
      {content.intro.map((paragraph) => (
        <p key={paragraph} className={panelParagraphClass}>
          {paragraph}
        </p>
      ))}

      <div className="flex flex-col gap-6 sm:gap-7">
        <h3 className={panelSubheadingClass}>{content.whyItMatters.heading}</h3>
        {content.whyItMatters.paragraphs.map((paragraph) => (
          <p key={paragraph} className={panelParagraphClass}>
            {paragraph}
          </p>
        ))}
      </div>

      {content.research && content.research.links.length > 0 ? (
        <div className="flex flex-col gap-4 sm:gap-5">
          <h3 className={panelSubheadingClass}>{content.research.heading}</h3>
          <ul className="flex flex-col gap-3 sm:gap-4">
            {content.research.links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={panelLinkClass}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function WorkshopListPanelBody({
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

function WorkshopListPanelContent({
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

function WorkshopProsePanelContent({
  content,
  activeKey,
}: {
  content: ResearchWorkshopProsePanel;
  activeKey: string;
}) {
  const { listRef, revealed } = useStaggeredReveal(activeKey);

  return (
    <div
      ref={listRef}
      className={`transition-[opacity,transform] ease-out motion-reduce:transition-none ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ transitionDuration: `${ITEM_FADE_MS}ms` }}
    >
      <WorkshopProsePanelBody content={content} />
    </div>
  );
}

function WorkshopPanelBody({ panel }: { panel: ResearchWorkshopPanelContent | undefined }) {
  if (!panel) return null;

  if (panel.kind === "prose") {
    return <WorkshopProsePanelBody content={panel} />;
  }

  return <WorkshopListPanelBody items={panel.items} />;
}

function WorkshopPanelContent({
  panel,
  activeKey,
}: {
  panel: ResearchWorkshopPanelContent | undefined;
  activeKey: string;
}) {
  if (!panel) return null;

  if (panel.kind === "prose") {
    return <WorkshopProsePanelContent content={panel} activeKey={activeKey} />;
  }

  return <WorkshopListPanelContent items={panel.items} activeKey={activeKey} />;
}

function WorkshopPanelMeasure({
  panel,
}: {
  panel: ResearchWorkshopPanelContent | undefined;
}) {
  if (!panel) return null;

  return (
    <div className={panelShellClass} aria-hidden>
      <WorkshopPanelBody panel={panel} />
    </div>
  );
}

function WorkshopPanel({
  workshopId,
  panel,
  idPrefix,
}: {
  workshopId: string;
  panel: ResearchWorkshopPanelContent | undefined;
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
      <WorkshopPanelContent panel={panel} activeKey={workshopId} />
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
  panels: Record<string, ResearchWorkshopPanelContent>;
  idPrefix: string;
}) {
  const { measureRef, minHeight } = usePanelMinHeight();
  const fallbackWorkshop = workshops[0];
  const activePanel = resolveWorkshopPanel(
    panels,
    activeWorkshop,
    fallbackWorkshop,
  );

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
            panel={resolveWorkshopPanel(panels, workshopId, fallbackWorkshop)}
          />
        ))}
      </div>

      <div
        className="h-full"
        style={minHeight > 0 ? { minHeight } : undefined}
      >
        <WorkshopPanel
          workshopId={activeWorkshop}
          panel={activePanel}
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
  heading?: string;
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
      {heading ? (
        <h2 className="max-w-2xl text-2xl font-bold leading-[1.12] tracking-[-0.03em] sm:text-3xl lg:text-4xl lg:leading-[1.1]">
          {heading}
        </h2>
      ) : null}

      <WorkshopOptions
        workshops={workshops}
        active={activeWorkshop}
        onSelect={onSelectWorkshop}
        idPrefix={idPrefix}
        compactTop={!heading}
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

  useEffect(() => {
    if (!panels[activeWorkshop]) {
      setActiveWorkshop(workshops[0]);
    }
  }, [activeWorkshop, panels, workshops]);

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

/** Black panel left; workshop picker right — no section title (research page). */
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
