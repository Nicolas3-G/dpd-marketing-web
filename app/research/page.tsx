import { createPageMetadata } from "@/lib/metadata";

import { ResearchConfidenceSection } from "./research-confidence-section";
import { ResearchFeaturesSection } from "./research-features-section";
import { ResearchHero } from "./research-hero";
import { ResearchEmbedSection } from "./research-embed-section";
import { ResearchScaleSection } from "./research-scale-section";

export const metadata = createPageMetadata("Research");

export default function ResearchPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <ResearchHero />
      <ResearchFeaturesSection />
      <ResearchConfidenceSection />
      <ResearchScaleSection />
      <ResearchEmbedSection />
    </main>
  );
}
