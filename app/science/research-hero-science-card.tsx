"use client";

import { Instrument_Serif } from "next/font/google";

import type { ResearchScienceCard } from "./research-science-cards";

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const SELECT_RESEARCH_TAB_EVENT = "dpd-select-research-tab";

export type SelectResearchTabDetail = {
  sectionId: string;
  workshopLabel: string;
};

export function ResearchHeroScienceCard({
  tag,
  title,
  whatItIs,
  whyItMatters,
  sectionId,
  workshopLabel,
}: ResearchScienceCard) {
  function handleLearnMore() {
    window.dispatchEvent(
      new CustomEvent<SelectResearchTabDetail>(SELECT_RESEARCH_TAB_EVENT, {
        detail: { sectionId, workshopLabel },
      }),
    );
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex h-full flex-col overflow-hidden p-6 sm:p-7">
      <span className="inline-flex w-fit rounded-full border border-brand-orange px-3 py-1 custom-caption text-brand-orange">
        {tag}
      </span>
      <h3 className={`${displaySerif.className} mt-4 custom-sm-title text-custom-black sm:mt-5`}>
        {title}
      </h3>
      <div className="mt-4 flex flex-col gap-4 sm:mt-5">
        {whatItIs ? (
          <p className="custom-label text-custom-black leading-relaxed">
            <span className="custom-label-bold text-brand-orange">What it is: </span>
            {whatItIs}
          </p>
        ) : null}
        {whyItMatters ? (
          <p className="custom-label text-custom-black leading-relaxed">
            <span className="custom-label-bold text-brand-orange">Why it matters: </span>
            {whyItMatters}
          </p>
        ) : null}
      </div>
      <div className="mt-auto pt-6 sm:pt-7">
        <button
          type="button"
          onClick={handleLearnMore}
          className="inline-flex h-9 items-center justify-center rounded-full border border-custom-black px-5 custom-label-bold text-custom-black transition hover:-translate-y-0.5 hover:border-brand-orange hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-black"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
