export type BooksExploreLink = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

/** Related paths after reading — keep lean while the catalog is one title. */
export const booksExploreContent = {
  heading: "Go deeper with DPD",
  description:
    "The book is the long-form guide. These resources help you practice persona coordination with your team right away.",
  links: [
    {
      title: "The framework online",
      description:
        "Explore Dreamer, Planner, and Doer personas, the science behind DPD, and how teams put coordination into daily work.",
      linkLabel: "Visit the framework page",
      href: "/framework",
    },
    {
      title: "Discover your persona",
      description:
        "Take the assessment in about ten minutes and get practical insight into how you dream, plan, and do with others.",
      linkLabel: "Take the test",
      href: "/survey",
    },
    {
      title: "Live workshops",
      description:
        "Bring shared persona language into your organization through facilitated sessions built for coaches and teams.",
      linkLabel: "Explore webinars",
      href: "/webinars",
    },
  ] satisfies readonly BooksExploreLink[],
} as const;
