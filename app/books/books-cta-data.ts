import { BOOK_AMAZON_URL } from "./books-featured-data";

/** Parallax CTA banner — edit copy and image here. */
export const booksCtaContent = {
  headingLines: [
    "Take the framework off the shelf",
    "and into your team's rhythm.",
  ],
  cta: {
    label: "Get the book",
    href: BOOK_AMAZON_URL,
  },
  backgroundImage: "/bg-2.jpg",
} as const;
