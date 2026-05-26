import { FaBrain, FaLightbulb, FaRepeat } from "react-icons/fa6";

import type { ResearchWorkshopPanelItem } from "./research-why-data";

/** Reversed “why” split section — edit copy here (research page). */
export const researchWhyReversedContent = {
  heading:
    "Discover why organizations choose DPD webinars as their behavior coordination partner.",
  workshops: [
    "DPD Core Workshop",
    "Persona Switching Workshop",
    "Leadership Persona Workshop",
  ] as const,
} as const;

export type ResearchWhyReversedWorkshopId =
  (typeof researchWhyReversedContent.workshops)[number];

/** Left-panel content per workshop — edit labels and icons here. */
export const researchWhyReversedWorkshopPanels: Record<
  ResearchWhyReversedWorkshopId,
  readonly ResearchWorkshopPanelItem[]
> = {
  "DPD Core Workshop": [
    {
      label:
        "Priming Theory activated through persona cues. Helps teams enter the right behavioral posture faster.",
      Icon: FaLightbulb,
    },
    {
      label:
        "Neuroplasticity through repeated persona practice. Helps teams build new behavioral patterns over time.",
      Icon: FaBrain,
    },
    {
      label:
        "Habit Formation through meeting mode rituals. Helps teams build new behavioral patterns over time.",
      Icon: FaRepeat,
    },
  ],
  "Persona Switching Workshop": [
    {
      label:
        "Game Theory applied to team coordination. Helps people understand roles, rules, and shared outcomes.",
      Icon: FaLightbulb,
    },
    {
      label:
        "Embodied Cognition through physical and verbal cues. Helps people connect posture, language, and action.",
      Icon: FaBrain,
    },
    {
      label:
        "Dream, Plan, Do sequencing across teams. Helps teams move from ideas to strategy to execution in the right order.",
      Icon: FaRepeat,
    },
  ],
  "Leadership Persona Workshop": [
    {
      label:
        "Teams know when to Dream, Plan, and Do together. Creates shared timing, clearer meetings, and better flow.",
      Icon: FaLightbulb,
    },
    {
      label:
        "Shared cues reduce meeting misalignment. Helps teams stop mixing modes and start moving together.",
      Icon: FaBrain,
    },
    {
      label:
        "Organizations increase ROI on existing tools. Adds the missing behavioral layer personality and process tools need.",
      Icon: FaRepeat,
    },
  ],
};
