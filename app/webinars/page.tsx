import { createPageMetadata } from "@/lib/metadata";

import { WebinarsClosingSection } from "./webinars-closing-section";
import { WebinarsCtaSection } from "./webinars-cta-section";
import { WebinarsHero } from "./webinars-hero";
import { WebinarsProcessSection } from "./webinars-process-section";
import { WebinarsOfferingSection } from "./webinars-offering-section";
import { WebinarsWhySection } from "./webinars-why-section";

export const metadata = createPageMetadata("Webinars");

export default function WebinarsPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <WebinarsHero />
      <WebinarsOfferingSection />
      <WebinarsWhySection />
      <WebinarsProcessSection />
      <WebinarsCtaSection />
      <WebinarsClosingSection />
    </main>
  );
}
