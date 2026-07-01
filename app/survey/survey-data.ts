import type {
  PerceptionIconKey,
  StrengthIconKey,
  TeamDynamicsIconKey,
} from "./survey-strength-icons";

export const PERSONAS = ["Dreamer", "Planner", "Doer"] as const;
export type Persona = typeof PERSONAS[number];

export const QUESTIONS_PER_SEGMENT = 3;
export const MAX_SECTION_SCORE = QUESTIONS_PER_SEGMENT * 5;

export type ContentBlock = string | string[];

/** Locked/blurred placeholder content — same lorem ipsum for every persona pairing. */
export const PERSONA_PERCEPTION_ITEMS: { label: string; body: string; icon: PerceptionIconKey }[] = [
  { label: "Constriction", body: "“Lorem ipsum dolor sit amet consectetur.”", icon: "constriction" },
  { label: "Judgment", body: "“Lorem ipsum dolor sit amet, consectetur adipiscing.”", icon: "judgment" },
  { label: "Stress Signal", body: "“Lorem ipsum dolor sit amet consectetur adipiscing elit.”", icon: "stress" },
  { label: "Misread Strength", body: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.", icon: "misread" },
];

export type TeamDynamicsItem = { title: string; body: string; icon: TeamDynamicsIconKey };
export type TeamDynamicsGroup = { lead: string; items: TeamDynamicsItem[] };

/** Static for now (same across all personas) while the Section 4 layout is being designed. */
export const TEAM_DYNAMICS_CONTENT: { intro: string; groups: TeamDynamicsGroup[] } = {
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  groups: [
    {
      lead: "Lorem ipsum dolor sit amet, consectetur adipiscing elit:",
      items: [
        {
          title: "Lorem Ipsum Dolor",
          body: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          icon: "translate",
        },
        {
          title: "Sit Amet Consectetur",
          body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
          icon: "direct",
        },
        {
          title: "Adipiscing Elit Sed",
          body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
          icon: "system",
        },
      ],
    },
    {
      lead: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua:",
      items: [
        {
          title: "Eiusmod Tempor",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
          icon: "open",
        },
        {
          title: "Incididunt Ut Labore",
          body: "Ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
          icon: "momentum",
        },
      ],
    },
  ],
};

export const PERSONA_DESCRIPTIONS: Record<Persona, string[]> = {
  Dreamer: [
    "The Dreamer Persona embodies a visionary, they thrive on exploring possibilities and imagining what could be rather than being constrained by what currently exists. Dreamers are creative thinkers and idea generators, often serving as the spark that ignites innovation and sets the stage for progress. They are at their best when given the freedom to think expansively, connect the seemingly unconnected, and articulate bold visions that inspire others.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
  ],
  Planner: [
    "The Planner Persona is a strategist, this persona thrives on creating order and clarity out of chaos. Planners are the architects of success, ensuring that big ideas don’t remain abstract by organizing them into actionable steps. They bring structure, processes, and direction to teams, guiding them toward their goals with precision and focus. While Dreamers imagine what could be, Planners make those visions feasible by designing the systems and strategies needed to bring them to life.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
  ],
  Doer: [
    "The Doer Persona is an implementer; they turn plans into action and ensure that projects are completed efficiently and effectively. Doers are the driving force behind execution, propelling teams forward with their energy, focus, and results-oriented willset and mindset. They thrive on tangible outcomes and measurable achievements, often becoming the “go-to” individuals when progress needs to be made.",
    "Doers bring a bias for action that keeps momentum alive, preventing teams from getting stuck in endless ideation or planning. They excel in high-pressure environments where decisions must be made quickly, and tasks require immediate attention.",
  ],
};

export type StrengthItem = { subtitle: string; body: string; icon: StrengthIconKey };

export const PERSONA_STRENGTHS: Record<Persona, StrengthItem[]> = {
  Dreamer: [
    {
      subtitle: "Creativity and Innovation",
      body: "Dreamers excel at thinking outside the box, generating ideas that are often unique, unexpected, and transformative. Their ability to approach challenges with originality makes them invaluable in brainstorming and strategy sessions.",
      icon: "organize",
    },
    {
      subtitle: "Visionary Thinking",
      body: "Dreamers see the big picture and understand how various elements can come together to create something extraordinary. They can chart long-term goals and articulate the “why” behind an idea, helping teams align with a shared purpose.",
      icon: "solve",
    },
    {
      subtitle: "Inspiration",
      body: "Dreamers are natural motivators. Their enthusiasm for what’s possible energizes those around them, encouraging teams to dream bigger and embrace ambitious challenges. They have the ability to articulate visions in a way that resonates emotionally, building excitement and buy-in.",
      icon: "complexity",
    },
    {
      subtitle: "Seeing Connections Others Miss",
      body: "Dreamers have a unique ability to see relationships between ideas, trends, or concepts that others might overlook. This skill allows them to identify opportunities and potential solutions that are often groundbreaking.",
      icon: "precision",
    },
    {
      subtitle: "Reframing Challenges",
      body: "Dreamers can reframe problems into opportunities, helping teams approach obstacles with a sense of possibility rather than limitation.",
      icon: "anticipate",
    },
  ],
  Planner: [
    {
      subtitle: "Organizational Mastery",
      body: "Planners excel at creating structure and clarity, particularly in environments with competing priorities or ambiguous goals. They can take a broad vision and translate it into a well-defined plan that includes timelines, milestones, and deliverables.",
      icon: "organize",
    },
    {
      subtitle: "Problem-Solving Expertise",
      body: "Planners are analytical thinkers who enjoy dissecting challenges and identifying solutions. They excel at spotting potential obstacles before they arise and crafting strategies to overcome them, ensuring the team stays on track.",
      icon: "solve",
    },
    {
      subtitle: "Managing Complexity",
      body: "Where others might feel overwhelmed, Planners thrive. They can break down complex projects into manageable tasks, ensuring that even the most ambitious goals feel achievable. Their ability to manage details without losing sight of the bigger picture is invaluable.",
      icon: "complexity",
    },
    {
      subtitle: "Consistency and Precision",
      body: "Planners bring stability to teams by ensuring that processes are repeatable and reliable. Their focus on precision reduces errors and increases efficiency, making them a cornerstone of any high-functioning team.",
      icon: "precision",
    },
    {
      subtitle: "Anticipation of Needs",
      body: "Planners excel at thinking ahead, anticipating what resources, steps, or adjustments will be required to meet future demands. Their foresight minimizes surprises and prepares the team for success.",
      icon: "anticipate",
    },
  ],
  Doer: [
    {
      subtitle: "Speed and Efficiency",
      body: "Doers have a natural ability to get things done quickly without overcomplicating the process. Their focus on action ensures that teams don’t lose time or opportunities due to unnecessary delays.",
      icon: "organize",
    },
    {
      subtitle: "Results-Oriented",
      body: "Doers prioritize outcomes over process. They set clear, measurable goals and work tirelessly to achieve them, making them highly effective in roles that demand accountability and deliverables.",
      icon: "solve",
    },
    {
      subtitle: "Decisiveness",
      body: "Doers are quick to make decisions, even in uncertain situations. Their confidence and clarity minimize bottlenecks and keep projects moving forward, especially when time is critical.",
      icon: "complexity",
    },
    {
      subtitle: "Problem-Solving in Action",
      body: "Doers excel at tackling obstacles as they arise, relying on their resourcefulness and adaptability to find solutions in the moment.",
      icon: "precision",
    },
    {
      subtitle: "Focus and Determination",
      body: "Once a goal is set, Doers are relentless in their pursuit of completion. Their ability to prioritize and concentrate on key tasks ensures steady progress.",
      icon: "anticipate",
    },
  ],
};

export type ChallengeItem = { subtitle: string; body: string };

export const PERSONA_CHALLENGES_INTRO: Record<Persona, string> = {
  Dreamer:
    "While Dreamers bring incredible value to teams and organizations, their strengths can also present challenges if not balanced with the contributions of others:",
  Planner:
    "While Planners bring essential skills to the table, their strengths can sometimes present challenges if not balanced by the contributions of Dreamers and Doers:",
  Doer:
    "While Doers are invaluable for execution, their action oriented willset and mindset can sometimes lead to challenges if not balanced by other personas:",
};

export const PERSONA_CHALLENGES: Record<Persona, ChallengeItem[]> = {
  Dreamer: [
    {
      subtitle: "Difficulty with Execution",
      body: "Dreamers often struggle with translating their ideas into actionable steps. They may lose interest once the focus shifts to implementation or details, leaving plans incomplete.",
    },
    {
      subtitle: "Overlooking Practical Constraints",
      body: "In their pursuit of big ideas, Dreamers may underestimate time, resources, or other practical limitations, creating friction when others try to ground their vision in reality.",
    },
    {
      subtitle: "Distracted by New Ideas",
      body: "Dreamers can become so captivated by new possibilities that they leave existing projects unfinished, shifting focus before previous ideas have been fully developed or executed.",
    },
    {
      subtitle: "Fear of Criticism",
      body: "Dreamers may hesitate to share their ideas in environments that feel overly critical or dismissive, stifling their creativity and reducing their contribution to the team.",
    },
  ],
  Planner: [
    {
      subtitle: "Overthinking and Analysis Paralysis",
      body: "Planners can become so focused on perfecting every detail that they delay action. This over analysis can slow the team’s momentum, particularly in fast-paced environments that require agility.",
    },
    {
      subtitle: "Resistance to Change",
      body: "Planners often prefer structure and predictability, which can make them resistant to sudden changes or shifts in strategy. This rigidity can sometimes conflict with the adaptability needed in dynamic teams.",
    },
    {
      subtitle: "Micromanagement Tendencies",
      body: "Planners’ attention to detail can sometimes lead to micromanagement, which may stifle creativity and autonomy in their teammates.",
    },
    {
      subtitle: "Struggles with Ambiguity",
      body: "Planners may feel uncomfortable in situations where goals are unclear or resources are limited. Their need for clarity can lead to frustration when working with Dreamers who favor abstract ideas or Doers who move quickly without thorough planning.",
    },
  ],
  Doer: [
    {
      subtitle: "Overlooking the Bigger Picture",
      body: "Doers may become so focused on completing tasks that they lose sight of the broader strategy or long-term goals. Without guidance, their efforts may lack alignment with the team’s vision.",
    },
    {
      subtitle: "Skipping Planning Steps",
      body: "In their eagerness to act, Doers might bypass essential planning or preparation, leading to inefficiencies or rework down the line.",
    },
    {
      subtitle: "Impatience with Delays",
      body: "Doers thrive on progress and may grow frustrated when projects require extensive discussion or planning. This impatience can create tension within teams that include slower paced Dreamers or Planners.",
    },
    {
      subtitle: "Resistance to Feedback",
      body: "Doers can sometimes view feedback or adjustments as disruptions to their workflow, preferring to stick to their own methods to maintain momentum.",
    },
  ],
};

export const PERSONA_WHAT_REPRESENTS: Record<Persona, ContentBlock[]> = {
  Dreamer: [
    "Dreamer Personas play a critical role in organizations, whether they’re reimagining the future of a product, brainstorming creative marketing campaigns, or inspiring teams to tackle ambitious goals. By recognizing and nurturing the unique strengths of the team’s Dreamer Personas, teams can unlock bold ideas that redefine what’s possible and pave the way for meaningful progress.",
    "Dreamer Personas are not just visionaries—they are the architects of possibility. With the right support and collaboration, they transform what could be into what is.",
  ],
  Planner: [
    "Planners are the foundation of any successful team. Their ability to align goals, resources, and efforts ensures that big ideas are not only pursued but achieved. With their foresight, organizational skills, and problem-solving expertise, Planners transform chaos into order and abstract visions into measurable success.",
    "Planners are not just strategists—they are the navigators who guide teams toward their destination. With the right support and collaboration, they ensure that progress is steady, purposeful, and impactful.",
  ],
  Doer: [
    "Doers are the heartbeat of execution, ensuring that ideas and plans don’t remain abstract. Their ability to take decisive action and deliver results is invaluable in dynamic and fast-paced environments. With the right support and collaboration, Doers turn potential energy into progress, ensuring that teams achieve their goals effectively and efficiently.",
    "Doers are not just implementers—they are the catalysts of momentum and progress. When aligned with Dreamers and Planners, they ensure that the team’s vision becomes reality.",
  ],
};


export function computeScores(answers: number[]): number[] {
  return PERSONAS.map((_, sectionIndex) => {
    const offset = sectionIndex * QUESTIONS_PER_SEGMENT;
    return answers.slice(offset, offset + QUESTIONS_PER_SEGMENT).reduce((a, b) => a + b, 0);
  });
}

export function dominantPersonaFromScores(scores: number[]): Persona {
  return PERSONAS[scores.indexOf(Math.max(...scores))];
}
