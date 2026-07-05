export type BlogPostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "link"; label: string; href: string };

export type BlogPost = {
  slug: string;
  date: string;
  title: string;
  subtext?: string;
  image?: string;
  /** Shown in the blog index hero when true. Falls back to the first post. */
  featured?: boolean;
  body: readonly BlogPostBlock[];
};

const personaSwitching: BlogPost = {
  slug: "persona-switching",
  date: "2/26/26",
  title: "Persona Switching",
  subtext: "It All Begins Here",
  image: "/scroll-cards-about/card-1.jpg",
  featured: true,
  body: [
    {
      type: "paragraph",
      text: "Dynamic Persona Switching (DPS) is the skill of intentionally changing how you show up, communicate, and make decisions based on what the situation requires. It is the difference between reacting on autopilot and choosing your posture on purpose.",
    },
    {
      type: "paragraph",
      text: "Even if personality stays relatively stable over time, behavior is dynamic and situational. People switch modes all day long based on context, stakes, relationships, and goals. Dynamic Persona Switching turns that natural human ability into a repeatable professional skill.",
    },
    {
      type: "heading",
      text: "Dynamic Persona Switching to reach higher levels of performance",
    },
    {
      type: "paragraph",
      text: "Actors practice Dynamic Persona Switching for a living.",
    },
    {
      type: "paragraph",
      text: "Musicians practice Dynamic Persona Switching when they move from rehearsal to performance.",
    },
    {
      type: "paragraph",
      text: "Artists practice Dynamic Persona Switching when they shift from imagination to craft.",
    },
    {
      type: "paragraph",
      text: "Athletes practice Dynamic Persona Switching when they go from playful to fierce in seconds.",
    },
    {
      type: "paragraph",
      text: "Children practice Dynamic Persona Switching naturally.",
    },
    {
      type: "paragraph",
      text: "One minute they are Cinderella.",
    },
    {
      type: "paragraph",
      text: "The next minute they are a mermaid.",
    },
    {
      type: "paragraph",
      text: "Children do not need permission.",
    },
    {
      type: "paragraph",
      text: "Children do not need a training course.",
    },
    {
      type: "paragraph",
      text: "Children simply choose who they are going to be in the moment, and their behavior changes instantly.",
    },
    {
      type: "paragraph",
      text: "That is Dynamic Persona Switching in its purest form, and humans have been doing it for over 250,000 years.",
    },
    {
      type: "heading",
      text: "The hard science behind Dynamic Persona Switching",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching works because human performance is state based, context sensitive, and biologically trainable.",
    },
    {
      type: "heading",
      text: "Neuroscience: the brain is built to reconfigure itself by context",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching is supported by neuroscience because the brain continuously adjusts attention, emotion, language, and impulse control based on cues.",
    },
    {
      type: "paragraph",
      text: "When the situation changes, the brain updates what matters. When the goal changes, the brain reallocates attention. When the social environment changes, the brain shifts communication strategy.",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching becomes powerful when you make those switches intentional instead of accidental.",
    },
    {
      type: "paragraph",
      text: "Key neuroscience ideas that support Dynamic Persona Switching at a high level:",
    },
    {
      type: "paragraph",
      text: "Executive control and cognitive flexibility — The brain can select rules for the moment and inhibit competing impulses. This is the biological foundation of choosing a behavioral posture on purpose.",
    },
    {
      type: "paragraph",
      text: "Attention systems — Attention is not fixed. Attention is allocated. Dynamic Persona Switching trains deliberate allocation.",
    },
    {
      type: "paragraph",
      text: "Stress physiology — The nervous system switches between threat and safety states. Dynamic Persona Switching helps people regulate state so thinking stays clear under pressure.",
    },
    {
      type: "paragraph",
      text: "Neuroplasticity — Repeated, consistent practice changes the efficiency of neural pathways. Dynamic Persona Switching becomes faster and more automatic through repetition.",
    },
    {
      type: "heading",
      text: "Cognitive science: clarity reduces cognitive load and improves decisions",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching is supported by cognitive science because ambiguity is expensive.",
    },
    {
      type: "paragraph",
      text: "When people do not know what mode, behavioral posture and language, they are in, and what mode, behavioral posture and language, others expect, they burn mental energy decoding signals. That is cognitive load. High cognitive load reduces working memory, slows comprehension, and degrades decision quality. It is like having too many windows open on your computer. Everything slows because processing power is spread too thin.",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching reduces cognitive load by making the mode explicit. In the context of DPD, Dreaming, Planning, Doing, it asks directly and explicitly: are we dreaming up the future, planning it out, or executing the plan? Dynamic Persona Switching creates faster alignment because the brain can stop guessing and start executing the right pattern.",
    },
    {
      type: "paragraph",
      text: "Relevant cognitive mechanisms:",
    },
    {
      type: "paragraph",
      text: "Task switching and switching costs — Shifting between different types of thinking carries a real performance cost. Dynamic Persona Switching reduces random switching and replaces it with clean, intentional switching.",
    },
    {
      type: "paragraph",
      text: "Schema activation — Once a mode is named, Dreaming, Planning, or Doing, the brain activates the matching playbook, Dreamer Persona, Planner Persona, Doer Persona, for the right behavioral language, values, priorities, and decision rules.",
    },
    {
      type: "heading",
      text: "Behavioral science: cues and repetition shape behavior reliably",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching is supported by behavioral science because behavior responds to cues, reinforcement, and practice.",
    },
    {
      type: "paragraph",
      text: "When a team uses a shared cue to declare the current mode, behavior, language, and posture change faster.",
    },
    {
      type: "paragraph",
      text: "When a person rehearses a posture repeatedly, the posture becomes easier to access on demand. A consummate Dreamer learns to invoke and assume their Planner Persona or Doer Persona when the dynamic or situation demands it. Persona dexterity and persona fluency are the ultimate goals.",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching is strengthened by:",
    },
    {
      type: "paragraph",
      text: "Priming — Small cues change readiness and interpretation.",
    },
    {
      type: "paragraph",
      text: "Habit formation — Repeated cue to action loops make switching increasingly automatic.",
    },
    {
      type: "paragraph",
      text: "Embodied cognition — Posture, breath, pace, and tone influence state. Dynamic Persona Switching becomes easier when the body is trained as part of the switch.",
    },
    {
      type: "heading",
      text: "Game Theory: Dynamic Persona Switching improves coordination and reduces friction",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching is supported by Game Theory because teams are coordination systems.",
    },
    {
      type: "paragraph",
      text: "In coordination games, outcomes improve when players share signals, expectations, and rules of engagement. Misalignment creates waste, conflict, and slow execution.",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching helps teams coordinate by making the current rule set visible.",
    },
    {
      type: "paragraph",
      text: "When the mode is visible, teams know the behavioral mode, for example a Planner meeting. They learn to invoke and assume their Planner Persona and upload the values, insights, and language of a Planner. When this is done:",
    },
    {
      type: "paragraph",
      text: "People stop defaulting to personality and switch to persona, which improves communication and collaboration.",
    },
    {
      type: "paragraph",
      text: "People reduce misinterpretation and defensiveness.",
    },
    {
      type: "paragraph",
      text: "People make cleaner tradeoffs because the objective is shared.",
    },
    {
      type: "paragraph",
      text: "People build trust faster because behavior becomes predictable in a good way.",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching increases coordination efficiency, and coordination efficiency is one of the main drivers of team performance and competitive edge.",
    },
    {
      type: "heading",
      text: "Dynamic Persona Switching inside the DPD Framework",
    },
    {
      type: "paragraph",
      text: "In the DPD Framework, Dynamic Persona Switching is expressed through three core personas that exist in every team and every human being, regardless of location, language, culture, age, gender, or personality.",
    },
    {
      type: "heading",
      text: "Dreamer",
    },
    {
      type: "paragraph",
      text: "Creates possibilities, vision, and new options.",
    },
    {
      type: "heading",
      text: "Planner",
    },
    {
      type: "paragraph",
      text: "Creates structure, sequence, constraints, priorities, and clarity.",
    },
    {
      type: "heading",
      text: "Doer",
    },
    {
      type: "paragraph",
      text: "Creates execution, decisions, momentum, and measurable outcomes.",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching is the ability to move between Dreamer, Planner, and Doer quickly and cleanly so the team stays aligned with the purpose of the moment.",
    },
    {
      type: "heading",
      text: "Why Dynamic Persona Switching matters at work",
    },
    {
      type: "paragraph",
      text: "Most workplace friction is not about bad intentions. Most workplace friction is about mismatched modes.",
    },
    {
      type: "paragraph",
      text: "One person is exploring possibilities and another person is trying to lock scope. One person wants options and another person wants decisions. One person is ready to execute and another person is still defining the problem.",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching reduces that friction by giving teams a shared behavioral language and a repeatable method to choose the right behavioral mode, posture, and language at the right time.",
    },
    {
      type: "heading",
      text: "The result of Dynamic Persona Switching",
    },
    {
      type: "paragraph",
      text: "When Dynamic Persona Switching becomes an individual skill and a team norm:",
    },
    {
      type: "paragraph",
      text: "Meetings become clearer.",
    },
    {
      type: "paragraph",
      text: "Collaboration becomes faster.",
    },
    {
      type: "paragraph",
      text: "Execution becomes cleaner.",
    },
    {
      type: "paragraph",
      text: "Trust grows because expectations are visible.",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching is not about performing a fake identity. Dynamic Persona Switching is about choosing an effective posture on purpose.",
    },
    {
      type: "link",
      label: "DPD Framework book on Amazon",
      href: "https://www.amazon.com/DPD-Framework-Revolutionize-Collaboration-Personas/dp/B0DV5DNK9V",
    },
    {
      type: "link",
      label: "DPDing Mobile App on the Apple App Store",
      href: "https://apps.apple.com/us/app/dpding-dreamer-planner-doer/id6746777165",
    },
    {
      type: "link",
      label: "DPDing Mobile App on the Google Play Store",
      href: "https://play.google.com/store/apps/details?id=com.dpding.app",
    },
    {
      type: "link",
      label: "DPD: The Persona Switching Podcast on Spotify",
      href: "https://open.spotify.com/show/2DWXn7bgkJ0yEkS7FCBaTf",
    },
  ],
};

/** Add new posts to this array. Each slug becomes `/blog/[slug]`. */
export const blogPosts: readonly BlogPost[] = [personaSwitching];

export function getPostHref(slug: string): string {
  return `/blog/${slug}`;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((post) => post.featured) ?? blogPosts[0];
}

export function getLatestPosts(): readonly BlogPost[] {
  return blogPosts;
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

const WORDS_PER_MINUTE = 200;

function getBlockText(block: BlogPostBlock): string {
  if (block.type === "link") {
    return block.label;
  }

  return block.text;
}

export function getReadTimeMinutes(post: BlogPost): number {
  const wordCount = post.body
    .map(getBlockText)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
