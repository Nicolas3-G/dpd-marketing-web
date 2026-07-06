import type { ResearchWorkshopPanelContent } from "./research-why-data";

/** Reversed split section — no heading; edit tabs and panel copy here. */
export const researchWhyReversedContent = {
  workshops: [
    "Executive Function and Cognitive Flexibility",
    "Game Theory",
    "Embodied Cognition",
    "Default Mode Network and Task Positive Network",
  ] as const,
} as const;

export type ResearchWhyReversedWorkshopId =
  (typeof researchWhyReversedContent.workshops)[number];

/** Panel content per tab — edit copy here. */
export const researchWhyReversedWorkshopPanels: Record<
  ResearchWhyReversedWorkshopId,
  ResearchWorkshopPanelContent
> = {
  "Executive Function and Cognitive Flexibility": {
    kind: "prose",
    intro: [
      "Executive Function and Cognitive Flexibility support one of the core ideas behind DPD: people can pause, choose the right cognitive posture, and adapt when the moment changes.",
      "These mental processes help people think before acting, resist automatic reactions, switch perspectives, and respond to new or complex situations.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when people stop reacting from habit and start responding to what the moment requires.",
        "DPD helps teams name the mode, activate the matching Cognitive Persona Posture, and switch between Dreaming, Planning, and Doing without getting stuck.",
        "The result is better meeting discipline, clearer decisions, less premature execution, stronger planning, and faster team alignment.",
      ],
    },
  },
  "Game Theory": {
    kind: "prose",
    intro: [
      "Game Theory studies strategic interaction — situations where one person’s outcome depends not only on their own choices, but also on the choices of others. In teams, this matters because people perform better when they share expectations, understand their roles, and know how to move toward the same outcome together.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when they know what game they are playing.",
        "DPD helps teams clarify the mode of the moment: Are we Dreaming, Planning, or Doing? Once the mode is clear, people can activate the matching Cognitive Persona Posture, follow the rules of the moment, and coordinate action toward a shared goal.",
        "The result is less friction, faster alignment, clearer decision-making, stronger collaboration, and better execution.",
      ],
    },
    research: {
      heading: "Read the Research",
      links: [
        {
          label: "Stanford Encyclopedia of Philosophy, Game Theory",
          href: "https://plato.stanford.edu/entries/game-theory/",
        },
        {
          label:
            "DeChurch and Mesmer Magnus, Measuring Shared Team Mental Models: A Meta Analysis",
          href: "https://atlas.northwestern.edu/papers/sharedTeam.pdf",
        },
        {
          label:
            "Salas et al., The Assessment of Team Performance: Observations and Needs",
          href: "https://cecas.clemson.edu/cedar/wp-content/uploads/2016/07/Salas-et-al-2017-Team-Performance-Measurement.pdf",
        },
      ],
    },
  },
  "Embodied Cognition": {
    kind: "prose",
    intro: [
      "Embodied Cognition supports one of the core ideas behind DPD: thinking does not happen in the mind alone. The body, environment, posture, movement, physical cues, and situational context all influence how people think, feel, and respond.",
      "Embodied cognition research shows that cognition is connected to the body’s interaction with the world. In practical terms, how people sit, speak, move, listen, and engage can shape how clearly they participate in the moment.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when the mode is not just talked about, but made visible.",
        "If a team says, “We need to execute,” but people are still scattered, defensive, or unclear about the moment, execution will suffer. DPD helps teams make the mode visible and actionable through shared language, cues, posture, and ritual.",
        "The result is faster activation, stronger presence, clearer participation, and more coordinated action in the room.",
      ],
    },
    research: {
      heading: "Read the Research",
      links: [
        {
          label: "Wilson, Six Views of Embodied Cognition",
          href: "https://link.springer.com/article/10.3758/BF03196322",
        },
        {
          label: "Barsalou, Grounded Cognition",
          href: "https://pubmed.ncbi.nlm.nih.gov/17705682/",
        },
        {
          label: "Stanford Encyclopedia of Philosophy, Embodied Cognition",
          href: "https://plato.stanford.edu/archives/spr2024/entries/embodied-cognition/",
        },
      ],
    },
  },
  "Default Mode Network and Task Positive Network": {
    kind: "prose",
    intro: [
      "Default Mode Network and Task Positive Network research supports one of the core ideas behind DPD: people shift between different cognitive modes depending on what the moment requires.",
      "The Default Mode Network is often associated with internally directed thinking, reflection, imagination, memory, social cognition, and thinking about the future. The Task Positive Network is often associated with externally directed attention, focus, problem-solving, and goal-directed action.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when they stop mixing modes.",
        "A Dreaming conversation needs space for exploration. A Planning conversation needs structure. A Doing conversation needs focus and execution.",
        "DPD helps teams name the mode before the meeting starts, activate the matching Cognitive Persona Posture, and align with the cognitive demands of the moment.",
      ],
    },
    research: {
      heading: "Read the Research",
      links: [
        {
          label:
            "Fox et al., The Human Brain Is Intrinsically Organized into Dynamic, Anticorrelated Functional Networks",
          href: "https://www.pnas.org/doi/10.1073/pnas.0504136102",
        },
        {
          label:
            "Menon, 20 Years of the Default Mode Network: A Review and Synthesis",
          href: "https://www.sciencedirect.com/science/article/pii/S0896627323003082",
        },
        {
          label: "Raichle, The Brain’s Default Mode Network",
          href: "https://www.annualreviews.org/content/journals/10.1146/annurev-neuro-071013-014030",
        },
      ],
    },
  },
};
