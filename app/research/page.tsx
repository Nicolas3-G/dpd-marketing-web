import { createPageMetadata } from "@/lib/metadata";

import { ResearchFeaturesSection } from "./research-features-section";
import { ResearchHero } from "./research-hero";

export const metadata = createPageMetadata("Research");

export default function ResearchPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <ResearchHero />
      <ResearchFeaturesSection />
    </main>
  );
}
