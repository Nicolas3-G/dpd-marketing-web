import { createPageMetadata } from "@/lib/metadata";
import { ContactHero } from "./contact-hero";

export const metadata = createPageMetadata("Contact", {
  description:
    "Get in touch with the DPD Framework team — reach out for inquiries, partnerships, or media requests.",
});

export default function ContactPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="h-20 w-full bg-background" aria-hidden />
      <ContactHero />
    </main>
  );
}
