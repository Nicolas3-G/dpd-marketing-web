import { createPageMetadata } from "@/lib/metadata";

import { BooksAuthorSection } from "./books-author-section";
import { BooksCtaSection } from "./books-cta-section";
import { BooksExploreSection } from "./books-explore-section";
import { BooksFeaturedSection } from "./books-featured-section";
import { BooksHero } from "./books-hero";
import { BooksInsideSection } from "./books-inside-section";

export const metadata = createPageMetadata("Books", {
  description:
    "Explore books on the DPD Framework — practical guides to behavior coordination, team alignment, and performance.",
});

export default function BooksPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <BooksHero />
      <BooksFeaturedSection />
      <BooksInsideSection />
      <BooksAuthorSection />
      <BooksCtaSection />
      <BooksExploreSection />
    </main>
  );
}
