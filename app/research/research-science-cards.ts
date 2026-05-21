export type ResearchScienceGraphic = "priming" | "game-theory";

export type ResearchScienceCard = {
  tag: string;
  title: string;
  graphic: ResearchScienceGraphic;
  activatedBy: string;
};

/** Science cards for the research hero stack */
export const researchScienceCards: ResearchScienceCard[] = [
  {
    tag: "SCIENCE",
    title: "Priming Theory",
    activatedBy:
      "Dreaming, Planning, Doing cues, meeting mode priming, and persona prompts.",
    graphic: "priming",
  },
  {
    tag: "SCIENCE",
    title: "Game Theory",
    activatedBy:
      "shared team cues, coordinated behavior, role clarity, and aligned action.",
    graphic: "game-theory",
  },
  {
    tag: "SCIENCE",
    title: "Neuroplasticity",
    activatedBy:
      "repeated persona switching, deliberate practice, and behavioral reinforcement over time.",
    graphic: "priming",
  },
  {
    tag: "SCIENCE",
    title: "Embodied Cognition",
    activatedBy:
      "physical cues, posture, coins, and behavior-linked action.",
    graphic: "priming",
  },
  {
    tag: "SCIENCE",
    title: "Habit Formation",
    activatedBy:
      "Meeting mode rituals, persona switching, DPD language, and consistent cues.",
    graphic: "priming",
  },
];
