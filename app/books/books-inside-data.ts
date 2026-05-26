export type BooksInsideTheme = {
  title: string;
  description: string;
};

/** What readers take away from the book — edit themes here. */
export const booksInsideContent = {
  heading: "What you will take away",
  lead: "A practical operating manual for Dream, Plan, and Do—not another personality label.",
  themes: [
    {
      title: "Persona language that sticks",
      description:
        "Move beyond static types. Give teams shared words for Dreamer, Planner, and Doer modes so expectations stay visible in every meeting.",
    },
    {
      title: "Dynamic persona switching",
      description:
        "Learn when and how to switch behavioral postures on purpose—so collaboration speeds up without people performing a fake identity.",
    },
    {
      title: "Coordination over assessment",
      description:
        "See why personality tests describe tendencies but never coordinate behavior—and how DPD fills the missing layer your tools already need.",
    },
    {
      title: "Leaders who see the rhythm",
      description:
        "Give managers visibility into when teams should dream, plan, or do—and reduce decision latency, friction, and misaligned meetings.",
    },
  ] satisfies readonly BooksInsideTheme[],
} as const;
