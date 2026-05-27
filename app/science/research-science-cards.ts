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
    title: "Neuroplasticity",
    activatedBy:
      "Repeated persona switching, meeting mode practice, DPD cues, and behavioral reinforcement.",
    graphic: "priming",
  },
  {
    tag: "SCIENCE",
    title: "Flow Theory",
    activatedBy:
      "Clear meeting modes, persona alignment, shared purpose, and synchronized action.",
    graphic: "game-theory",
  },
  {
    tag: "SCIENCE",
    title: "Cognitive Behavioral Science",
    activatedBy:
      "Clear meeting modes, shared language, persona cues, and simple behavioral rules.",
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
