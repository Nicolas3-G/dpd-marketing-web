export type WebinarsClosingCard = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

/** Centered closing copy and feature cards below the CTA banner — edit here. */
export const webinarsClosingContent = {
  heading: "Coordination unlocked",
  description:
    "Organizations use DPD webinars to build shared persona language, align teams around when to Dream, Plan, and Do, and sustain high-performance cultures as work gets more complex.",
  cards: [
    {
      title: "Learn",
      description:
        "Introduce the Dream, Plan, Do framework and shared persona language so teams enter the right behavioral posture faster.",
      linkLabel: "Explore the Core Workshop",
      href: "/contact",
    },
    {
      title: "Practice",
      description:
        "Build embodied and verbal cues that help people switch between Dreamer, Planner, and Doer in real time.",
      linkLabel: "Explore Persona Switching",
      href: "/contact",
    },
    {
      title: "Lead",
      description:
        "Give leaders visibility into when teams should Dream, Plan, or Do—and reduce meeting misalignment at scale.",
      linkLabel: "Explore Leadership Personas",
      href: "/contact",
    },
  ] satisfies readonly WebinarsClosingCard[],
} as const;