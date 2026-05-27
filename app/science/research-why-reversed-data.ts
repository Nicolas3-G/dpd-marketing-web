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
      "Executive Function and Cognitive Flexibility support one of the core ideas behind DPD: people can pause, organize thought, inhibit the wrong response, choose the right behavioral posture, and adapt when the moment changes.",
      "Executive functions are the brain’s higher order control processes. They help people hold information in mind, resist automatic reactions, think before acting, switch perspectives, and respond to new or complex situations. Adele Diamond’s review describes executive functions as mental processes needed when automatic behavior is not enough, especially when people must reason, plan, problem solve, or adjust behavior.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when people can stop reacting from habit and start responding to the moment.",
        "Executive function helps individuals resist the impulse to dominate the wrong mode. Cognitive flexibility helps teams move between Dreaming, Planning, and Doing without getting stuck.",
        "The result is better meeting discipline, clearer decisions, less premature execution, stronger planning, and faster behavioral alignment.",
      ],
    },
  },
  "Game Theory": {
    kind: "prose",
    intro: [
      "Game Theory studies strategic interaction, meaning situations where one person’s outcome depends not only on their own choices, but also on the choices of others. The Stanford Encyclopedia of Philosophy describes game theory as a way to analyze strategic interaction, including coordination problems where people must align behavior around shared expectations.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when they know what game they are playing.",
        "Research on shared team mental models shows that teams benefit when members share an understanding of tasks, roles, goals, and how to work together. Shared mental models are linked to team processes and team performance, and team effectiveness research consistently highlights communication, coordination, cooperation, and shared cognition as core features of effective teams.",
        "The result is less friction, faster alignment, clearer decision making, stronger collaboration, and better execution.",
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
      "Embodied Cognition supports one of the core ideas behind DPD: behavior is not only mental. The body, environment, posture, movement, physical cues, and situational context all influence how people think, feel, and act.",
      "Embodied cognition research argues that cognition is deeply connected to the body’s interaction with the world. Grounded cognition proposes that bodily states, situated action, and modal simulations help underlie cognition, rather than cognition being separated from perception, action, and bodily experience.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when behavior is not left as an abstract idea.",
        "If a team says, “We need to execute,” and everyone remains mentally scattered, emotionally defensive, or physically disengaged, execution will suffer. DPD helps teams make the mode visible and actionable through cues, posture, language, and ritual.",
        "The result is faster activation, stronger presence, clearer participation, and more coordinated behavior in the room.",
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
      "Default Mode Network and Task Positive Network research supports one of the core ideas behind DPD: the brain moves between different cognitive modes depending on what the moment requires.",
      "The Default Mode Network is often associated with internally directed thought, self reflection, memory, imagination, social cognition, mind wandering, and thinking about the future. The Task Positive Network is associated with externally directed, attention demanding, goal focused tasks. Fox and colleagues showed that the human brain is organized into dynamic, anti-correlated functional networks, including task positive regions and default mode regions.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when they stop mixing cognitive modes.",
        "A Dreaming conversation requires space for exploration. A Planning conversation requires structure. A Doing conversation requires focus and execution.",
        "DPD helps teams name the mode before the meeting starts, reducing confusion and helping people align their Persona Behavioral Posture with the cognitive demands of the moment.",
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
