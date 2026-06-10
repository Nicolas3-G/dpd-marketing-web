export type ResearchScienceCard = {
  tag: string;
  title: string;
  whatItIs: string;
  whyItMatters: string;
  sectionId: string;
  workshopLabel: string;
};

/** Science cards for the research hero stack */
export const researchScienceCards: ResearchScienceCard[] = [
  {
    tag: "SCIENCE",
    title: "Neuroplasticity",
    whatItIs: "The brain strengthens new patterns through repeated practice.",
    whyItMatters:
      "Persona dexterity can be trained, helping people switch faster and perform with greater adaptability.",
    sectionId: "research-why",
    workshopLabel: "Neuroscience & Neuroplasticity",
  },
  {
    tag: "SCIENCE",
    title: "Flow Theory",
    whatItIs: "People perform best when focus, skill, and challenge are aligned.",
    whyItMatters:
      "DPD helps teams reduce friction and enter a smoother, more focused state of collaboration.",
    sectionId: "research-why",
    workshopLabel: "Flow Theory & Performance Psychology",
  },
  {
    tag: "SCIENCE",
    title: "Cognitive Behavioral Science",
    whatItIs: "Behavioral Science studies how people think, decide, act, and change.",
    whyItMatters:
      "Clear behavioral systems help teams reduce friction, make better decisions, and move together faster.",
    sectionId: "research-why",
    workshopLabel: "Cognitive Behavioral Science",
  },
  {
    tag: "SCIENCE",
    title: "Habit Formation",
    whatItIs: "Repeated cues and actions become automatic patterns over time.",
    whyItMatters: "Repeated practice turns behavioral alignment into a team habit.",
    sectionId: "research-why",
    workshopLabel: "Habit Formation and Deliberate Practice",
  },
  {
    tag: "SCIENCE",
    title: "Cognitive Flexibility",
    whatItIs:
      "The brain's ability to adapt, shift perspective, and think in new ways when conditions change.",
    whyItMatters:
      "Helps people adapt, solve problems, and stay agile through change.",
    sectionId: "research-why-reversed",
    workshopLabel: "Executive Function and Cognitive Flexibility",
  },
  {
    tag: "SCIENCE",
    title: "Game Theory",
    whatItIs:
      "Game Theory studies how people make decisions when their outcomes depend on the actions of others.",
    whyItMatters:
      "When everyone understands the rules, roles, and objective, teams coordinate faster and reduce friction.",
    sectionId: "research-why-reversed",
    workshopLabel: "Game Theory",
  },
  {
    tag: "SCIENCE",
    title: "Embodied Cognition",
    whatItIs: "The body and environment influence how people think, feel, and act.",
    whyItMatters:
      "Behavior changes faster when the body, mind, and environment are aligned.",
    sectionId: "research-why-reversed",
    workshopLabel: "Embodied Cognition",
  },
  {
    tag: "SCIENCE",
    title: "Default Mode Network",
    whatItIs:
      "A brain network most active during internal reflection, memory, and imagination.",
    whyItMatters:
      "Helps people generate ideas and surface insight before action.",
    sectionId: "research-why-reversed",
    workshopLabel: "Default Mode Network and Task Positive Network",
  },
];
