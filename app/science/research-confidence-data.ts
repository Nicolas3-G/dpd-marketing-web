export type ResearchSplitContent = {
  overline: string;
  heading: string;
  lead: string;
  body: string;
  bullets: readonly string[];
};

/** Copy for the first split section — edit here. */
export const researchConfidenceContent: ResearchSplitContent = {
  overline: "APPLY WITH CONFIDENCE",
  heading: "From research to coordinated practice",
  lead: "Turn Cognitive Persona Science into a shared language for team alignment — not assumptions.",
  body: "DPD helps organizations validate how teams dream, plan, and do together using real coordination signals before rolling out programs at scale.",
  bullets: [
    "Shorten adoption cycles by testing cognitive alignment before full rollout.",
    "Replace internal guesswork with observable coordination signals",
    "Prevent misalignment caused by unclear meeting modes or role cues",
    "Reduce friction by validating behavioral design before enterprise deployment",
  ],
};

/** Copy for the reversed split section — edit here. */
export const researchScaleContent: ResearchSplitContent = {
  overline: "SCALE WITH CLARITY",
  heading: "Bring validated behavior into every team rhythm",
  lead: "Extend what works from pilots into daily dream, plan, and do practice.",
  body: "Once coordination patterns are proven, DPD gives leaders and coaches a repeatable system to embed persona switching across workshops, meetings, and execution cycles.",
  bullets: [
    "Standardize meeting modes so teams know when to dream, plan, or do",
    "Give coaches shared language and cues that transfer across groups",
    "Align managers and ICs on the same behavioral operating system",
    "Measure adoption without relying on one-off personality assessments",
  ],
};

/** Copy for the third split section (text left, card right) — edit here. */
export const researchEmbedContent: ResearchSplitContent = {
  overline: "EMBED THE SYSTEM",
  heading: "Make persona coordination part of how you work",
  lead: "Move from one-off workshops to habits teams actually keep.",
  body: "DPD connects research-backed priming, cues, and meeting rituals so dream, plan, and do modes become the default way teams align—not a slide deck they forget after training.",
  bullets: [
    "Install persona cues in calendars, agendas, and team charters",
    "Reinforce switching with coins, language, and meeting-mode rituals",
    "Support coaches with playbooks tied to your organization’s context",
    "Sustain behavior change through neuroplasticity-friendly repetition",
  ],
};
