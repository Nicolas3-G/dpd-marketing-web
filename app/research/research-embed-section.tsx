import { researchEmbedContent } from "./research-confidence-data";
import { ResearchSplitSection } from "./research-split-section";

export function ResearchEmbedSection() {
  return (
    <ResearchSplitSection content={researchEmbedContent} stackPosition="last" />
  );
}
