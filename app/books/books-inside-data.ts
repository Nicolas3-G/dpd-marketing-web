export type BooksInsideTheme = {
  title: string;
  description: string;
};

/** What readers take away from the book — edit themes here. */
export const booksInsideContent = {
  heading: "What you will take away",
  lead: "A practical playbook for Dreaming, Planning, and Doing — Visioning, Structuring, and Executing, without turning people into labels.",
  themes: [
    {
      title: "Persona language that sticks",
      description:
        "Move beyond static types. Give teams shared language for naming the mode, activating the matching persona, and keeping expectations visible in every meeting.",
    },
    {
      title: "Dynamic persona switching",
      description:
        "Learn how to name the mode, activate the matching persona, and switch on purpose — so teams can move faster, reduce friction, and stay in sync.",
    },
    {
      title: "Alignment over assessment",
      description:
        "Personality tests describe tendencies. DPD helps people align how they think, communicate, and work together in real time.",
    },
    {
      title: "Leaders who see the rhythm",
      description:
        "Give managers visibility into when teams should dream, plan, or do—and reduce decision latency, friction, and misaligned meetings.",
    },
  ] satisfies readonly BooksInsideTheme[],
} as const;
