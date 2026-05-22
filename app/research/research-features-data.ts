import type { IconType } from "react-icons";
import {
  FaBrain,
  FaChartLine,
  FaComments,
  FaFingerprint,
  FaLightbulb,
  FaListCheck,
  FaRepeat,
  FaRoute,
  FaScaleBalanced,
  FaUserGraduate,
  FaUsers,
  FaPersonRunning,
} from "react-icons/fa6";

export type ResearchFeatureTab = "features" | "benefits";

export type ResearchFeatureItem = {
  label: string;
  Icon: IconType;
};

export type ResearchFeatureTabContent = {
  label: string;
  heading: string;
  items: ResearchFeatureItem[];
};

/** Features / Benefits copy and icons — edit here. */
export const researchFeatureTabs: Record<
  ResearchFeatureTab,
  ResearchFeatureTabContent
> = {
  features: {
    label: "Features",
    heading: "Features",
    items: [
      {
        label: "Priming Theory activated through persona cues. Helps teams enter the right behavioral posture faster.",
        Icon: FaLightbulb,
      },
      {
        label: "Game Theory applied to team coordination. Helps people understand roles, rules, and shared outcomes.",
        Icon: FaScaleBalanced,
      },
      {
        label: "Neuroplasticity through repeated persona practice. Helps teams build new behavioral patterns over time.",
        Icon: FaBrain,
      },
      {
        label: "Embodied Cognition through physical and verbal cues. Helps people connect posture, language, and action.",
        Icon: FaPersonRunning,
      },
      {
        label: "Habit Formation through meeting mode rituals. Helps teams build new behavioral patterns over time.",
        Icon: FaRepeat,
      },
      {
        label: "Dream, Plan, Do sequencing across teams. Helps teams move from ideas to strategy to execution in the right order.",
        Icon: FaRoute,
      },
    ],
  },
  benefits: {
    label: "Benefits",
    heading: "Benefits",
    items: [
      {
        label: "Teams know when to Dream, Plan, and Do together. Creates shared timing, clearer meetings, and better flow.",
        Icon: FaUsers,
      },
      {
        label: "Less friction between insight and execution. Turns personality awareness and process tools into coordinated action.",
        Icon: FaListCheck,
      },
      {
        label: "Shared cues reduce meeting misalignment. Helps teams stop mixing modes and start moving together.",
        Icon: FaComments,
      },
      {
        label: "Coaches gain a repeatable behavioral operating system. Gives coaches a simple framework for helping clients move from awareness to action.",
        Icon: FaUserGraduate,
      },
      {
        label: "Organizations increase ROI on existing tools. Adds the missing behavioral layer that helps personality and process tools work harder.",
        Icon: FaChartLine,
      },
      {
        label: "Individuals build awareness that transfers into action. Strengthens self awareness, relational awareness, and persona dexterity.",
        Icon: FaFingerprint,
      },
    ],
  },
};
