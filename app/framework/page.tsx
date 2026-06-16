import { createPageMetadata } from "@/lib/metadata";

import { FrameworkCtaSection } from "./framework-cta-section";
import { FrameworkFlowSection } from "./framework-flow-section";
import { FrameworkHero } from "./framework-hero";
import { FrameworkPersonaSection } from "./framework-persona-section";
import { FrameworkScienceSection } from "./framework-science-section";
import { FrameworkTestimonialCarousel } from "./framework-testimonial-carousel";

export const metadata = createPageMetadata("Framework", {
  description:
    "The DPD Framework platform — tools and insights for behavior coordination that help teams align, adapt, and perform at their best.",
});

export default function FrameworkPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <FrameworkHero />
      <FrameworkCtaSection />
      <FrameworkPersonaSection />
      <FrameworkScienceSection />
      <FrameworkTestimonialCarousel />
      <FrameworkFlowSection />
    </main>
  );
}
