import { createPageMetadata } from "@/lib/metadata";

import { ResearchConfidenceSection } from "./research-confidence-section";
import { ResearchHero } from "./research-hero";
import { ResearchEmbedSection } from "./research-embed-section";
import { ResearchScaleSection } from "./research-scale-section";
import {
  ResearchWhyReversedSection,
  ResearchWhySection,
} from "./research-why-section";

export const metadata = createPageMetadata("Science");

export default function SciencePage() {
  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <ResearchHero />
      <ResearchConfidenceSection />
      <ResearchScaleSection />
      <ResearchEmbedSection />
      <ResearchWhySection />
      <ResearchWhyReversedSection />
    </main>
  );
}
