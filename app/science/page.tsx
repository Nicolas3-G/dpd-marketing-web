import { createPageMetadata } from "@/lib/metadata";

import { ResearchConfidenceSection } from "./research-confidence-section";
import { ResearchHero } from "./research-hero";
import { ResearchEmbedSection } from "./research-embed-section";
import { ResearchScaleSection } from "./research-scale-section";
import { ResearchTabActivator } from "./research-tab-activator";
import {
  ResearchWhyReversedSection,
  ResearchWhySection,
} from "./research-why-section";

export const metadata = createPageMetadata("Science", {
  description:
    "Explore the science behind the DPD Framework — rooted in flow theory, game theory, neuroplasticity, and embodied cognition.",
});

export default async function SciencePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; section?: string }>;
}) {
  const { tab, section } = await searchParams;

  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <ResearchHero />
      <ResearchConfidenceSection />
      <ResearchScaleSection />
      <ResearchEmbedSection />
      <ResearchWhySection />
      <ResearchWhyReversedSection />
      {tab && section ? (
        <ResearchTabActivator tab={tab} section={section} />
      ) : null}
    </main>
  );
}
