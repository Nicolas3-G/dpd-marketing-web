import { FaCheck } from "react-icons/fa6";

import type { ResearchSplitContent } from "./research-confidence-data";
import { LoopingVideo } from "./looping-video";

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
  videoSrc?: string;
};

/** Two-column section: copy + black placeholder card (optional reversed layout). */
export function ResearchSplitSection({
  content,
  reversed = false,
  stackPosition = "middle",
  videoSrc,
}: ResearchSplitSectionProps) {
  const { overline, heading, lead, body, bullets } = content;

  const textColumn = (
    <div className="flex max-w-xl flex-col lg:max-w-none">
      <p className="custom-caption-bold text-brand-orange">
        {overline}
      </p>
      <h2 className="mt-3 custom-md-title-bold leading-[1.08] lg:leading-[1.06]">
        {heading}
      </h2>
      <p className="mt-4 custom-body-bold">{lead}</p>
      <p className="mt-5 custom-body text-custom-black">
        {body}
      </p>
      <ul className="mt-8 flex flex-col gap-4 sm:mt-10">
        {bullets.map((text) => (
          <li key={text} className="flex gap-3 custom-body-bold">
            <span
              className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/50 text-custom-black"
              aria-hidden
            >
              <FaCheck className="size-2.5" />
            </span>
            <span className="custom-body">{text}</span>
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
      {videoSrc ? (
        <LoopingVideo
          src={videoSrc}
          className="h-full min-h-[min(28rem,50vw)] w-full rounded-2xl object-cover lg:min-h-0"
        />
      ) : (
        <div className="h-full min-h-[min(28rem,50vw)] w-full rounded-2xl bg-black lg:min-h-0" />
      )}
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
