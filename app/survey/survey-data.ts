export const PERSONAS = ["Dreamer", "Planner", "Doer"] as const;
export type Persona = typeof PERSONAS[number];

export const QUESTIONS_PER_SEGMENT = 3;
export const MAX_SECTION_SCORE = QUESTIONS_PER_SEGMENT * 5;

export type ContentBlock = string | string[];

export const PERSONA_DESCRIPTIONS: Record<Persona, string[]> = {
  Dreamer: [
    "You are a human being with access to Dreaming, Planning, and Doing. This readout means Dreaming is likely one of your most natural, trusted, or frequently expressed behavioral persona postures. It may be the mode you return to when you are energized. It may be the language you speak most fluently. It may be the way you make sense of the world before you organize it or act on it.",
    "In the DPD Framework, the Dreamer is not a fixed personality type. The Dreamer is a behavioral and cognitive posture. It is a way of seeing, thinking, speaking, listening, imagining, relating, and creating meaning.",
    "The Dreamer Persona Posture is the part of you that sees possibility before proof, meaning before mechanics, and future before form. It is the cognitive and behavioral mode you enter when you are visioning, imagining, exploring, innovating, reframing, connecting ideas, and asking what could be possible beyond what currently exists.",
  ],
  Planner: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
  ],
  Doer: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
  ],
};

export const PERSONA_CORE_QUESTIONS: Record<Persona, string> = {
  Dreamer: "What could this become?",
  Planner: "Lorem ipsum dolor sit amet?",
  Doer: "Lorem ipsum consectetur adipiscing?",
};

export const PERSONA_CORE_QUESTION_BODY: Record<Persona, ContentBlock[]> = {
  Dreamer: [
    "That question is not a distraction.\n\nIt is a doorway.",
    `Where others may begin with, "How will this work?" or "What needs to happen now?" the Dreamer often begins with, "What could this become?"`,
    "That question opens the field of possibility before the group narrows into structure or action. It helps people look beyond the current limitation, the current process, the current fear, the current assumption, or the current reality.",
    ["Dreaming is not fantasy.", "Fantasy escapes reality.", "Dreaming expands reality."],
    "Healthy Dreaming does not deny constraints. It simply refuses to let current constraints become the final definition of what is possible.",
    [
      "Before anything can be built, it must first be imagined.",
      "Before a plan exists, there is a possibility.",
      "Before execution begins, there is a vision.",
      "Before teams align around work, they must align around meaning.",
      "The Dreamer is the beginning of movement because the Dreamer gives movement direction.",
    ],
  ],
  Planner: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ["Lorem ipsum dolor sit amet.", "Consectetur adipiscing elit.", "Sed do eiusmod tempor."],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    [
      "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      "Sed do eiusmod tempor incididunt ut labore.",
      "Ut enim ad minim veniam quis nostrud.",
      "Exercitation ullamco laboris nisi ut aliquip.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    ],
  ],
  Doer: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ["Lorem ipsum dolor sit amet.", "Consectetur adipiscing elit.", "Sed do eiusmod tempor."],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    [
      "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      "Sed do eiusmod tempor incididunt ut labore.",
      "Ut enim ad minim veniam quis nostrud.",
      "Exercitation ullamco laboris nisi ut aliquip.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    ],
  ],
};

export type GlanceRow = { dimension: string; value: string };

export const PERSONA_AT_A_GLANCE: Record<Persona, GlanceRow[]> = {
  Dreamer: [
    { dimension: "Dimension", value: "Dreamer Persona Posture" },
    { dimension: "Cognitive Mode", value: "Dreaming" },
    { dimension: "Action Descriptor", value: "Visioning" },
    { dimension: "Primary Contribution", value: "Possibility with meaning" },
    { dimension: "Core Question", value: "What could this become?" },
    { dimension: "Primary Gift", value: "Expanding what others believe is possible" },
    { dimension: "Primary Risk", value: "Staying in possibility too long without structure or action" },
    { dimension: "Reward Pathway", value: "Possibility" },
    { dimension: "Growth Edge", value: "Translating vision into shared language, structure, and movement" },
    { dimension: "Best Partners", value: "Planners who organize the vision and Doers who help build it" },
    { dimension: "Communication Need", value: "To be heard before being narrowed" },
    { dimension: "Meeting Need", value: "Space to explore before pressure to decide" },
    { dimension: "Conflict Risk", value: "Feeling dismissed, rushed, misunderstood, or constrained" },
  ],
  Planner: [
    { dimension: "Dimension", value: "Planner Persona Posture" },
    { dimension: "Cognitive Mode", value: "Lorem ipsum" },
    { dimension: "Action Descriptor", value: "Lorem ipsum dolor" },
    { dimension: "Primary Contribution", value: "Lorem ipsum dolor sit amet" },
    { dimension: "Core Question", value: "Lorem ipsum dolor sit amet?" },
    { dimension: "Primary Gift", value: "Lorem ipsum dolor sit amet consectetur" },
    { dimension: "Primary Risk", value: "Lorem ipsum dolor sit amet consectetur adipiscing" },
    { dimension: "Reward Pathway", value: "Lorem ipsum" },
    { dimension: "Growth Edge", value: "Lorem ipsum dolor sit amet consectetur adipiscing elit" },
    { dimension: "Best Partners", value: "Lorem ipsum dolor sit amet and consectetur adipiscing elit" },
    { dimension: "Communication Need", value: "Lorem ipsum dolor sit amet" },
    { dimension: "Meeting Need", value: "Lorem ipsum dolor sit amet consectetur" },
    { dimension: "Conflict Risk", value: "Lorem ipsum dolor sit amet consectetur adipiscing elit" },
  ],
  Doer: [
    { dimension: "Dimension", value: "Doer Persona Posture" },
    { dimension: "Cognitive Mode", value: "Lorem ipsum" },
    { dimension: "Action Descriptor", value: "Lorem ipsum dolor" },
    { dimension: "Primary Contribution", value: "Lorem ipsum dolor sit amet" },
    { dimension: "Core Question", value: "Lorem ipsum dolor sit amet?" },
    { dimension: "Primary Gift", value: "Lorem ipsum dolor sit amet consectetur" },
    { dimension: "Primary Risk", value: "Lorem ipsum dolor sit amet consectetur adipiscing" },
    { dimension: "Reward Pathway", value: "Lorem ipsum" },
    { dimension: "Growth Edge", value: "Lorem ipsum dolor sit amet consectetur adipiscing elit" },
    { dimension: "Best Partners", value: "Lorem ipsum dolor sit amet and consectetur adipiscing elit" },
    { dimension: "Communication Need", value: "Lorem ipsum dolor sit amet" },
    { dimension: "Meeting Need", value: "Lorem ipsum dolor sit amet consectetur" },
    { dimension: "Conflict Risk", value: "Lorem ipsum dolor sit amet consectetur adipiscing elit" },
  ],
};

export const PERSONA_WHAT_REPRESENTS: Record<Persona, ContentBlock[]> = {
  Dreamer: [
    "The Dreamer represents the human capacity to imagine, connect, reframe, envision, and create meaning. Dreamers are often the first to sense that something more is possible. They may not always know the exact path. They may not yet have the steps. They may not have the budget, timeline, operational plan, or proof. But they can often feel the direction before the direction becomes visible to others.",
    "The Dreamer often senses possibility before they can fully explain it. This can be powerful because innovation often begins as a felt sense, a pattern, a spark, a question, a story, a connection, or a vision that has not yet become fully rationalized.",
    "It can also be frustrating because other people may want proof before the Dreamer has language. They may ask for details before the Dreamer has structure. They may demand action before the Dreamer has fully explored the meaning of the idea. This is where Dreamers are often misunderstood.",
    [
      "A Dreamer may be called unrealistic when they are actually early.",
      "A Dreamer may be called scattered when they are actually connecting.",
      "A Dreamer may be called impractical when they are actually exploring the edges of what could become practical later.",
      "A Dreamer may be called emotional when they are actually tracking meaning and human impact.",
    ],
    [
      "This does not mean every Dreamer idea is right.",
      "It does not mean every possibility should be pursued.",
      "It means the Dreamer has a necessary role in the human system.",
    ],
    [
      "The Dreamer protects possibility.",
      "The Planner protects clarity.",
      "The Doer protects progress.",
    ],
    "When the Dreamer is absent, possibility shrinks. People may become overly practical, overly procedural, overly reactive, or overly focused on the immediate. They may solve what is in front of them without asking whether they are solving the right problem.",
    "The Dreamer reminds the system that motion is not the same as meaning.",
    [
      "A team can be busy and still be lost.",
      "A person can be productive and still be unfulfilled.",
      "A company can be profitable and still be uninspired.",
      "A family can be organized and still be emotionally disconnected.",
      "A life can look successful and still lack a compelling future.",
    ],
  ],
  Planner: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    [
      "Lorem ipsum dolor sit amet consectetur adipiscing.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    ],
    [
      "Lorem ipsum dolor sit amet, consectetur.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
    [
      "The Dreamer protects possibility.",
      "The Planner protects clarity.",
      "The Doer protects progress.",
    ],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
    [
      "Lorem ipsum dolor sit amet, consectetur.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.",
    ],
  ],
  Doer: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    [
      "Lorem ipsum dolor sit amet consectetur adipiscing.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    ],
    [
      "Lorem ipsum dolor sit amet, consectetur.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
    [
      "The Dreamer protects possibility.",
      "The Planner protects clarity.",
      "The Doer protects progress.",
    ],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
    [
      "Lorem ipsum dolor sit amet, consectetur.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.",
    ],
  ],
};

export const PERSONA_CORE_ROLE: Record<Persona, ContentBlock[]> = {
  Dreamer: [
    "The core role of the Dreamer is to expand possibility. The Dreamer does this by imagining futures, generating ideas, reframing problems, naming purpose, connecting meaning, and helping others see beyond the current reality.",
    "The Dreamer is especially valuable when people are stuck in limitation, repetition, fear, stale thinking, cynicism, burnout, or execution without meaning.",
    `When a team says, "We have tried everything," the Dreamer asks, "Have we questioned the assumptions underneath everything we tried?"`,
    `When a person says, "This is just how I am," the Dreamer asks, "Who else could you become if you practiced differently?"`,
    `When a leader says, "We need people to execute," the Dreamer asks, "Do people understand the purpose behind what they are executing?"`,
    `When a family says, "We always have this same conflict," the Dreamer asks, "What new conversation are we avoiding?"`,
    [
      "The Dreamer is not against reality.",
      "The Dreamer is against premature surrender to reality.",
    ],
    "Healthy Dreamers are not trying to ignore the world as it is. They are trying to imagine the world as it could be improved, healed, redesigned, reconnected, or transformed.",
  ],
  Planner: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing. Sed do eiusmod tempor incididunt ut labore, lorem ipsum dolor sit amet consectetur?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing. Sed do eiusmod tempor incididunt ut labore, lorem ipsum dolor sit amet consectetur?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing. Sed do eiusmod tempor incididunt ut labore, lorem ipsum dolor sit amet consectetur?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing. Sed do eiusmod tempor incididunt ut labore, lorem ipsum dolor sit amet consectetur?",
    ["Lorem ipsum dolor sit amet, consectetur adipiscing.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do."],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  ],
  Doer: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing. Sed do eiusmod tempor incididunt ut labore, lorem ipsum dolor sit amet consectetur?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing. Sed do eiusmod tempor incididunt ut labore, lorem ipsum dolor sit amet consectetur?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing. Sed do eiusmod tempor incididunt ut labore, lorem ipsum dolor sit amet consectetur?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing. Sed do eiusmod tempor incididunt ut labore, lorem ipsum dolor sit amet consectetur?",
    ["Lorem ipsum dolor sit amet, consectetur adipiscing.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do."],
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
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
