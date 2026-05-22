import { webinarsWhyContent } from "./webinars-why-data";

export type WebinarsOfferingCard = {
  title: string;
  bullets: readonly string[];
};

const [coreWorkshop, switchingWorkshop, leadershipWorkshop] =
  webinarsWhyContent.workshops;

/** Three-column offering section — one card per workshop; edit bullets here. */
export const webinarsOfferingContent = {
  heading: "DPD webinars are your always-on behavior coordination engine.",
  cards: [
    {
      title: coreWorkshop,
      bullets: [
        "Dream, Plan, Do framework introduced with shared persona language",
        "Priming cues that help teams enter the right behavioral posture faster",
        "Foundation for assessments, rituals, and ongoing DPDing",
      ],
    },
    {
      title: switchingWorkshop,
      bullets: [
        "Practice switching between Dreamer, Planner, and Doer in real time",
        "Embodied and verbal cues that connect posture, language, and action",
        "Sequencing exercises from ideas to strategy to execution together",
        "Formats for teams that mix personas in the same room",
      ],
    },
    {
      title: leadershipWorkshop,
      bullets: [
        "Leader visibility into when teams should Dream, Plan, or Do",
        "Shared cues that reduce meeting misalignment and mode-mixing",
        "Rollout and coaching paths tied to organizational priorities",
      ],
    },
  ] satisfies readonly WebinarsOfferingCard[],
} as const;
