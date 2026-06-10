import { researchConfidenceContent } from "./research-confidence-data";
import { ResearchSplitSection } from "./research-split-section";

export function ResearchConfidenceSection() {
  return (
    <ResearchSplitSection
      content={researchConfidenceContent}
      stackPosition="first"
      videoSrc="/videos/science-1.mp4"
    />
  );
}
