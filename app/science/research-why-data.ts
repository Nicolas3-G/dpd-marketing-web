export type ResearchWorkshopPanelLink = {
  label: string;
  href: string;
};

export type ResearchWorkshopProsePanel = {
  kind: "prose";
  intro: readonly string[];
  whyItMatters: {
    heading: string;
    paragraphs: readonly string[];
  };
  research?: {
    heading: string;
    links: readonly ResearchWorkshopPanelLink[];
  };
};

export type ResearchWorkshopPanelContent = ResearchWorkshopProsePanel;

/** “Why teams choose us” split section — edit copy here (research page). */
export const researchWhyContent = {
  heading: "See the research behind the DPD Framework",
  workshops: [
    "Neuroscience & Neuroplasticity",
    "Flow Theory & Performance Psychology",
    "Cognitive Behavioral Science",
    "Habit Formation and Deliberate Practice",
  ] as const,
} as const;

export type ResearchWorkshopId = (typeof researchWhyContent.workshops)[number];

/** Right-panel content per workshop — edit copy here. */
export const researchWorkshopPanels: Record<
  ResearchWorkshopId,
  ResearchWorkshopPanelContent
> = {
  "Flow Theory & Performance Psychology": {
    kind: "prose",
    intro: [
      "Flow Theory and Performance Psychology support one of the core ideas behind DPD: people and teams perform better when attention, skill, challenge, goals, feedback, and action are aligned.",
      "Flow is commonly described as a state of deep absorption, focused attention, and optimal experience. Recent research describes flow as a highly engaging state that often occurs when people are fully involved in an activity, especially when challenge and skill are well matched.",
      "Performance psychology extends this idea into practical performance environments, including sport, leadership, music, work, and high demand situations. The goal is not just to understand performance, it is to improve preparation, focus, confidence, resilience, and execution when it matters.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when they are not fighting the mode.",
        "Flow requires alignment. In team settings, that means people need shared expectations, shared timing, and a clear understanding of what kind of behavior the moment requires.",
        "DPD helps teams stop mixing modes and start coordinating them. The result is smoother collaboration, faster decisions, better communication, stronger execution, and more momentum.",
      ],
    },
    research: {
      heading: "Read the Research",
      links: [
        {
          label:
            "Abuhamdeh, Investigating the Flow Experience: Key Conceptual and Operational Issues",
          href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7033418/",
        },
        {
          label:
            "Harris et al., A Systematic Review and Meta Analysis of the Relationship Between Flow States and Performance",
          href: "https://www.tandfonline.com/doi/full/10.1080/1750984X.2021.1929402",
        },
        {
          label: "Csikszentmihalyi, Flow: The Psychology of Optimal Experience",
          href: "https://files.blogs.baruch.cuny.edu/wp-content/blogs.dir/2418/files/2013/04/Mihaly-Csikszentmihalyi-Flow.pdf",
        },
      ],
    },
  },
  "Neuroscience & Neuroplasticity": {
    kind: "prose",
    intro: [
      "Neuroscience and neuroplasticity support one of the core ideas behind DPD: the brain can strengthen new patterns through repeated practice.",
      "Neuroplasticity refers to the brain’s ability to change through experience, training, and repeated activation. Research on brain plasticity shows how structured, repeated training can shape neural function and support new patterns of performance.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams improve when new behavior becomes easier to repeat.",
        "If a team only talks about better collaboration once, behavior may not change. If the team repeatedly names the mode, assumes the right Persona Behavioral Posture, follows the rules, and switches together when the mission changes, the behavior becomes more natural over time.",
        "The result is faster switching, stronger adaptability, lower friction, and more consistent team coordination.",
      ],
    },
    research: {
      heading: "Read the Research",
      links: [
        {
          label: "Michael Merzenich, Brain Plasticity Based Therapeutics",
          href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4072971/",
        },
        {
          label: "Hebbian Activity Dependent Plasticity in White Matter",
          href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9376741/",
        },
      ],
    },
  },
  "Cognitive Behavioral Science": {
    kind: "prose",
    intro: [
      "Cognitive Behavioral Science supports one of the core ideas behind DPD: how people interpret a moment influences how they feel, how they respond, and how they behave.",
      "In Cognitive Behavioral Therapy, thoughts, emotions, and behaviors are understood as connected. When people learn to recognize and adjust their interpretations, they can develop more adaptive responses and behaviors.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams perform better when they are not guessing what kind of conversation they are in.",
        "DPD reduces cognitive load by clarifying the mode, aligning expectations, and giving people a shared behavioral language for how to participate.",
        "The result is less misinterpretation, less ego friction, clearer communication, and faster coordinated action.",
      ],
    },
    research: {
      heading: "Read the Research:",
      links: [
        {
          label:
            "Fenn & Byrne, The Key Principles of Cognitive Behavioral Therapy",
          href: "https://journals.sagepub.com/doi/full/10.1177/1755738012471029",
        },
        {
          label: "NCBI Bookshelf, Cognitive Behavior Therapy",
          href: "https://www.ncbi.nlm.nih.gov/books/NBK470241/",
        },
      ],
    },
  },
  "Habit Formation and Deliberate Practice": {
    kind: "prose",
    intro: [
      "Habit Formation and Deliberate Practice support one of the core ideas behind DPD: repeated behavior, practiced intentionally and reinforced over time, becomes easier to access and more automatic.",
      "Habit research shows that people tend to repeat behaviors in recurring contexts, and that habits develop through repeated action connected to stable cues.",
      "Deliberate Practice research adds another important layer. Research shows that expert performance improves through structured, effortful practice designed to improve specific aspects of performance.",
    ],
    whyItMatters: {
      heading: "Why It Matters",
      paragraphs: [
        "Teams improve when the desired behavior becomes repeatable.",
        "Without habit formation, new language fades after training. Without deliberate practice, teams may understand DPD intellectually and still fail to use it under pressure. DPD turns the desired behavior into a repeatable rhythm.",
        "The result is stronger team habits, faster adoption, better meeting discipline, cleaner execution, and sustained behavior change.",
      ],
    },
    research: {
      heading: "Read the Research",
      links: [
        {
          label: "Wood and Rünger, Psychology of Habit",
          href: "https://pubmed.ncbi.nlm.nih.gov/26361052/",
        },
        {
          label:
            "Gardner et al., Making Health Habitual: The Psychology of Habit Formation and General Practice",
          href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3505409/",
        },
        {
          label:
            "Ericsson, Krampe, and Tesch-Römer, The Role of Deliberate Practice in the Acquisition of Expert Performance",
          href: "https://web.mit.edu/6.969/www/readings/expertise.pdf",
        },
      ],
    },
  },
};
