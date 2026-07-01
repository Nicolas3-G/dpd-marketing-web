"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  researchWhyReversedContent,
  researchWhyReversedWorkshopPanels,
} from "./research-why-reversed-data";
import {
  SELECT_RESEARCH_TAB_EVENT,
  type SelectResearchTabDetail,
} from "./research-hero-science-card";
import {
  researchWhyContent,
  researchWorkshopPanels,
  type ResearchWorkshopPanelContent,
  type ResearchWorkshopProsePanel,
} from "./research-why-data";

const ITEM_FADE_MS = 400;

const panelShellClass =
  "flex w-full flex-col items-start bg-custom-black px-8 py-10 sm:px-10 sm:py-12 lg:justify-start lg:px-12 lg:py-14 xl:px-14";

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
            className={`w-fit border-b-2 pt-3 pb-1 text-left custom-xxs-title-bold transition-colors sm:pt-4 sm:pb-1.5 ${
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

function WorkshopProsePanelBody({ content, title }: { content: ResearchWorkshopProsePanel; title?: string }) {
  return (
    <div className="flex max-w-2xl flex-col gap-6 sm:gap-7">
      {title ? (
        <h3 className="custom-md-title text-white">{title}</h3>
      ) : null}
      {content.intro.map((paragraph) => (
        <p key={paragraph} className="custom-body text-white">
          {paragraph}
        </p>
      ))}

      <div className="flex flex-col gap-6 sm:gap-7">
        <h3 className="custom-body-bold text-white">{content.whyItMatters.heading}</h3>
        {content.whyItMatters.paragraphs.map((paragraph) => (
          <p key={paragraph} className="custom-body text-white">
            {paragraph}
          </p>
        ))}
      </div>

      {content.research && content.research.links.length > 0 ? (
        <div className="flex flex-col gap-4 sm:gap-5">
          <h3 className="custom-body-bold text-white">{content.research.heading}</h3>
          <ul className="flex flex-col gap-3 sm:gap-4">
            {content.research.links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-body text-brand-orange hover:text-brand-orange-hover"
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

function WorkshopProsePanelContent({
  content,
  isActive,
  title,
}: {
  content: ResearchWorkshopProsePanel;
  isActive: boolean;
  title?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const el = divRef.current;
    if (!el || prefersReducedMotion()) return;

    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateX(20px)";

    void el.offsetHeight; // force reflow so browser records the start state

    el.style.transition = `opacity ${ITEM_FADE_MS}ms ease-out, transform ${ITEM_FADE_MS}ms ease-out`;
    el.style.opacity = "1";
    el.style.transform = "translateX(0px)";
  }, [isActive]);

  return (
    <div ref={divRef}>
      <WorkshopProsePanelBody content={content} title={title} />
    </div>
  );
}

function WorkshopPanelContent({
  panel,
  isActive,
  title,
}: {
  panel: ResearchWorkshopPanelContent | undefined;
  isActive: boolean;
  title?: string;
}) {
  if (!panel) return null;
  return <WorkshopProsePanelContent content={panel} isActive={isActive} title={title} />;
}

function WorkshopPanel({
  workshopId,
  panel,
  idPrefix,
  isActive,
}: {
  workshopId: string;
  panel: ResearchWorkshopPanelContent | undefined;
  idPrefix: string;
  isActive: boolean;
}) {
  const slug = workshopTabSlug(workshopId);
  return (
    <div
      id={`${idPrefix}-workshop-panel-${slug}`}
      role="tabpanel"
      aria-labelledby={`${idPrefix}-workshop-tab-${slug}`}
      className={`${panelShellClass} h-full`}
    >
      <WorkshopPanelContent panel={panel} isActive={isActive} title={workshopId} />
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
  const fallbackWorkshop = workshops[0];

  return (
    <div
      className="grid w-full min-w-0 min-h-56 sm:min-h-64 lg:min-h-0 lg:h-full"
      style={{ gridTemplate: "1fr / 1fr" }}
    >
      {workshops.map((workshopId) => {
        const isActive = workshopId === activeWorkshop;
        return (
          <div
            key={workshopId}
            style={{ gridArea: "1 / 1" }}
            aria-hidden={!isActive || undefined}
            className={!isActive ? "invisible pointer-events-none" : undefined}
          >
            <WorkshopPanel
              workshopId={workshopId}
              panel={resolveWorkshopPanel(panels, workshopId, fallbackWorkshop)}
              idPrefix={idPrefix}
              isActive={isActive}
            />
          </div>
        );
      })}
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
        <h2 className="max-w-2xl custom-md-title-bold leading-[1.12] lg:leading-[1.1]">
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
    function handleSelectTab(e: Event) {
      const { sectionId: targetSection, workshopLabel } = (
        e as CustomEvent<SelectResearchTabDetail>
      ).detail;
      if (targetSection !== sectionId) return;
      const match = workshops.find((w) => w === workshopLabel);
      if (match) setActiveWorkshop(match);
    }

    window.addEventListener(SELECT_RESEARCH_TAB_EVENT, handleSelectTab);
    return () => window.removeEventListener(SELECT_RESEARCH_TAB_EVENT, handleSelectTab);
  }, [sectionId, workshops]);

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
            <div className="lg:col-start-2 lg:row-start-1">{copyColumn}</div>
            <div className="lg:col-start-1 lg:row-start-1">{panelsColumn}</div>
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
