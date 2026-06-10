"use client";

import { useEffect } from "react";

import {
  SELECT_RESEARCH_TAB_EVENT,
  type SelectResearchTabDetail,
} from "./research-hero-science-card";
import { researchScienceCards } from "./research-science-cards";

export function ResearchTabActivator({
  tab,
  section,
}: {
  tab: string;
  section: string;
}) {
  useEffect(() => {
    const card = researchScienceCards.find((c) => c.title === tab);
    if (!card) return;

    const id = window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent<SelectResearchTabDetail>(SELECT_RESEARCH_TAB_EVENT, {
          detail: { sectionId: section, workshopLabel: card.workshopLabel },
        }),
      );
    }, 0);

    return () => window.clearTimeout(id);
  }, [tab, section]);

  return null;
}
