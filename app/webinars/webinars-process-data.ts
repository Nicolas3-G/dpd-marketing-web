export type WebinarsProcessStep = {
  number: string;
  title: string;
  description: string;
};

/** “How it’s done” split section — edit copy here. */
export const webinarsProcessContent = {
  overline: "HOW IT'S DONE",
  heading:
    "From first conversation to coordinated teams that Dream, Plan, and Do together.",
  steps: [
    {
      number: "01",
      title: "Talk with your team",
      description:
        "Start with a short discovery session to understand goals, friction points, and where persona coordination can help most.",
    },
    {
      number: "02",
      title: "Make a rollout plan",
      description:
        "Map assessments, workshops, and leadership touchpoints so adoption stays practical—not another initiative on the shelf.",
    },
    {
      number: "03",
      title: "Put DPD to work",
      description:
        "Run facilitated webinars and rituals that turn insight into shared language, better meetings, and measurable behavior change.",
    },
  ] satisfies readonly WebinarsProcessStep[],
} as const;
