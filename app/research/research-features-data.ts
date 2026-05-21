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
        label: "Priming theory built into persona cues",
        Icon: FaLightbulb,
      },
      {
        label: "Game theory–informed coordination signals",
        Icon: FaScaleBalanced,
      },
      {
        label: "Neuroplasticity through repeated persona practice",
        Icon: FaBrain,
      },
      {
        label: "Embodied cognition via physical and verbal cues",
        Icon: FaPersonRunning,
      },
      {
        label: "Habit formation through meeting-mode rituals",
        Icon: FaRepeat,
      },
      {
        label: "Dream–Plan–Do sequencing across personas",
        Icon: FaRoute,
      },
    ],
  },
  benefits: {
    label: "Benefits",
    heading: "Benefits",
    items: [
      {
        label: "Teams know when to dream, plan, and do together",
        Icon: FaUsers,
      },
      {
        label: "Less friction between personality insight and execution",
        Icon: FaListCheck,
      },
      {
        label: "Shared cues reduce misalignment in meetings",
        Icon: FaComments,
      },
      {
        label: "Coaches gain a repeatable behavioral operating system",
        Icon: FaUserGraduate,
      },
      {
        label: "Organizations increase ROI on existing tools",
        Icon: FaChartLine,
      },
      {
        label: "Individuals build self-awareness that transfers to action",
        Icon: FaFingerprint,
      },
    ],
  },
};
