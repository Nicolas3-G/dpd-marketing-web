import { researchScaleContent } from "./research-confidence-data";
import { ResearchSplitSection } from "./research-split-section";

export function ResearchScaleSection() {
  return (
    <ResearchSplitSection
      content={researchScaleContent}
      reversed
      stackPosition="middle"
      videoSrc="/videos/science-2.mp4"
    />
  );
}
