import { FaCheck } from "react-icons/fa6";

import type { ResearchSplitContent } from "./research-confidence-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

type ResearchSplitStackPosition = "first" | "middle" | "last";

const stackPadding: Record<ResearchSplitStackPosition, string> = {
  first: "pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12",
  middle: "py-8 sm:py-10 lg:py-12",
  last: "pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24",
};

type ResearchSplitSectionProps = {
  content: ResearchSplitContent;
  reversed?: boolean;
  stackPosition?: ResearchSplitStackPosition;
};

/** Two-column section: copy + black placeholder card (optional reversed layout). */
export function ResearchSplitSection({
  content,
  reversed = false,
  stackPosition = "middle",
}: ResearchSplitSectionProps) {
  const { overline, heading, lead, body, bullets } = content;

  const textColumn = (
    <div className="flex max-w-xl flex-col lg:max-w-none">
      <p className="text-xs font-bold tracking-[0.2em] text-brand-orange sm:text-[0.7rem]">
        {overline}
      </p>
      <h2 className="mt-3 text-4xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
        {heading}
      </h2>
      <p className="mt-4 text-lg font-medium leading-snug sm:text-xl">{lead}</p>
      <p className="mt-5 text-base leading-relaxed text-custom-black/85 sm:text-[17px]">
        {body}
      </p>
      <ul className="mt-8 flex flex-col gap-4 sm:mt-10">
        {bullets.map((text) => (
          <li key={text} className="flex gap-3 text-sm leading-snug sm:text-base">
            <span
              className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/50 text-custom-black"
              aria-hidden
            >
              <FaCheck className="size-2.5" />
            </span>
            <span className="font-medium">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const imageColumn = (
    <div
      className="min-h-[min(28rem,50vw)] w-full lg:min-h-0 lg:h-full"
      aria-hidden
    >
      <div className="h-full min-h-[min(28rem,50vw)] w-full rounded-2xl bg-black lg:min-h-0" />
    </div>
  );

  return (
    <section
      className={`bg-background text-custom-black ${stackPadding[stackPosition]}`}
    >
      <div
        className={`${pageInset} grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20`}
      >
        {reversed ? (
          <>
            <div className="lg:col-start-1 lg:row-start-1">{imageColumn}</div>
            <div className="lg:col-start-2">{textColumn}</div>
          </>
        ) : (
          <>
            {textColumn}
            {imageColumn}
          </>
        )}
      </div>
    </section>
  );
}
