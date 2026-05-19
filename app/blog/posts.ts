export type BlogPostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "link"; label: string; href: string };

export type BlogPost = {
  slug: string;
  date: string;
  title: string;
  subtext?: string;
  image: string;
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

const personaBehaviorCoordination: BlogPost = {
  slug: "persona-behavior-coordination",
  date: "5/28/19",
  title: "Persona Behavior Coordination",
  image: "/scroll-cards-about/card-2.jpg",
  body: [
    {
      type: "heading",
      text: "A Science Forward Persona Behavioral Operating System",
    },
    {
      type: "paragraph",
      text: "When you travel to Japan, you instinctively prime your mind to speak Japanese. You do not default to Dutch or English if you want to be understood. You adjust your language to match the environment. Behavioral posture works the same way. Different missions require different cognitive and communicative modes. Everything that evolves switches behavior dynamically. Biological systems adapt. Neural pathways reorganize. The brain shifts operating modes depending on task demand. Athletes regulate physiology under pressure. Performers elevate presence on cue. High performing professionals adjust internal state to serve the moment. Organizations rarely do.",
    },
    {
      type: "paragraph",
      text: "Inside most companies, we manage processes, timelines, artifacts, and deliverables. What we rarely manage is behavioral posture alignment. We assume shared cognitive mode. That assumption fails daily.",
    },
    {
      type: "paragraph",
      text: "DPD is a science forward Persona Behavioral Operating System designed to align behavioral posture with mission demand. It does not replace personality frameworks or project management methodologies. It activates them. It does not add complexity. It adds synchronization.",
    },
    {
      type: "paragraph",
      text: "If collaboration feels harder than it should, the issue may not be talent, intelligence, or methodology.",
    },
    {
      type: "paragraph",
      text: "It may be posture. And nowhere is posture alignment structured more clearly than in multiplayer role playing games.",
    },
    {
      type: "heading",
      text: "What Roleplay Games Understand That Companies Often Forget",
    },
    {
      type: "paragraph",
      text: "One environment structures behavioral alignment exceptionally well: collaborative role playing games.",
    },
    {
      type: "paragraph",
      text: "In Dungeons and Dragons, players commit to defined roles with clear strengths and limitations. A facilitator presents challenges. The group works toward a shared objective. Success depends on disciplined alignment to mission, not individual dominance.",
    },
    {
      type: "paragraph",
      text: "Players assume a role. They understand the mission. They respect turn structure. They coordinate strengths.",
    },
    {
      type: "paragraph",
      text: "Structure reduces chaos. Constraints focus creativity. Role clarity sharpens contribution.",
    },
    {
      type: "paragraph",
      text: "Success depends on:",
    },
    {
      type: "paragraph",
      text: "Clear mission",
    },
    {
      type: "paragraph",
      text: "Explicit structure",
    },
    {
      type: "paragraph",
      text: "Shared behavioral language",
    },
    {
      type: "paragraph",
      text: "Alignment of strengths",
    },
    {
      type: "paragraph",
      text: "Humility toward the objective",
    },
    {
      type: "paragraph",
      text: "Ego does not drive the table. The mission does. Now compare that to how most organizations operate.",
    },
    {
      type: "paragraph",
      text: "Inside Agile, Waterfall, SAFe, and stage gate systems, the process is defined. Ceremonies exist. Artifacts exist. Roles exist. Timelines exist.",
    },
    {
      type: "paragraph",
      text: "What rarely exists is behavioral posture regulation. These systems manage workflow. They do not regulate cognitive alignment.",
    },
    {
      type: "paragraph",
      text: "In sprint planning, Dreamers expand possibility, Planners surface risk, and Doers prepare for execution.",
    },
    {
      type: "paragraph",
      text: "In ideation sessions, evaluation interrupts imagination and risk language narrows creative range prematurely.",
    },
    {
      type: "paragraph",
      text: "In execution reviews, solved problems reopen, new contingencies appear, and momentum slows.",
    },
    {
      type: "paragraph",
      text: "These are not personality flaws. They are mode collisions.",
    },
    {
      type: "paragraph",
      text: "Behavioral science shows that when divergent thinking and convergent evaluation occur simultaneously, innovation quality drops and tension rises. When execution bias collides with risk analysis, decision cycles extend.",
    },
    {
      type: "paragraph",
      text: "Agile manages workflow. Waterfall manages sequencing. Stage gate manages approvals.",
    },
    {
      type: "paragraph",
      text: "None are designed to synchronize behavioral posture.",
    },
    {
      type: "paragraph",
      text: "The result is predictable:",
    },
    {
      type: "paragraph",
      text: "Fragmented communication",
    },
    {
      type: "paragraph",
      text: "Innovation friction",
    },
    {
      type: "paragraph",
      text: "Rework cycles",
    },
    {
      type: "paragraph",
      text: "Meeting fatigue",
    },
    {
      type: "paragraph",
      text: "Muted performance",
    },
    {
      type: "paragraph",
      text: "This is not a methodology failure. It is a synchronization failure.",
    },
    {
      type: "heading",
      text: "Ego Versus Mission",
    },
    {
      type: "paragraph",
      text: "In role playing environments, the mission determines the role. The role determines the posture. The posture determines the language. Mission first. Ego second.",
    },
    {
      type: "paragraph",
      text: "In many organizations, this sequence reverses. Comfort determines posture. Habit determines language. Ego determines dominance. The loudest voice defaults to Doer. The most analytical defaults to Planner. The most imaginative defaults to Dreamer. Not because the mission requires it. Because it feels natural.",
    },
    {
      type: "paragraph",
      text: "Personality frameworks such as the Big Five and the Enneagram reveal these tendencies with clarity. DPD does not replace them. It operationalizes them. DPD asks a different question:",
    },
    {
      type: "paragraph",
      text: "What posture does the mission require now?",
    },
    {
      type: "paragraph",
      text: "When a mission governs posture, collaboration accelerates. When ego governs posture, friction multiplies.",
    },
    {
      type: "paragraph",
      text: "High performing teams regulate ego. They align behavior to objective.",
    },
    {
      type: "heading",
      text: "The Missing Layer",
    },
    {
      type: "paragraph",
      text: "DPD is a mission aligned Persona Behavioral Operating System built around three universal postures:",
    },
    {
      type: "paragraph",
      text: "Dreamer",
    },
    {
      type: "paragraph",
      text: "Planner",
    },
    {
      type: "paragraph",
      text: "Doer",
    },
    {
      type: "paragraph",
      text: "These are not identities. They are trainable behavioral states. Research in priming theory, embodied cognition, executive regulation, and habit formation demonstrates that declared context shifts behavioral expression.",
    },
    {
      type: "paragraph",
      text: "When a leader says, “We are in Dreamer mode,” divergent thinking expands. When a team commits to Planner posture, risk awareness sharpens. When a group enters Doer mode, execution clarity increases.",
    },
    {
      type: "paragraph",
      text: "DPD activates what is already human. The capacity to switch behavior intentionally. You are already role playing at work. The difference is whether you do it consciously, collectively, and in flow.",
    },
    {
      type: "heading",
      text: "When Posture Matches Mission",
    },
    {
      type: "paragraph",
      text: "When vision is required, the team steps into Dreamer. When sequencing and ownership are required, the team steps into Planner. When delivery is required, the team steps into Doer. When posture aligns with mission:",
    },
    {
      type: "paragraph",
      text: "Cognitive load decreases",
    },
    {
      type: "paragraph",
      text: "Communication simplifies",
    },
    {
      type: "paragraph",
      text: "Energy concentrates",
    },
    {
      type: "paragraph",
      text: "Momentum builds",
    },
    {
      type: "paragraph",
      text: "When posture misaligns with mission:",
    },
    {
      type: "paragraph",
      text: "Confusion spreads",
    },
    {
      type: "paragraph",
      text: "Energy fragments",
    },
    {
      type: "paragraph",
      text: "Decision velocity slows",
    },
    {
      type: "paragraph",
      text: "Competitors advance",
    },
    {
      type: "paragraph",
      text: "High performing teams win because structure is explicit and behavioral synchronization is intentional.",
    },
    {
      type: "heading",
      text: "Evolution Is Adaptive Range",
    },
    {
      type: "paragraph",
      text: "Adaptive range predicts long term success in complex systems. The broader a team’s behavioral range, the stronger its resilience and execution capacity. DPD trains:",
    },
    {
      type: "paragraph",
      text: "Range",
    },
    {
      type: "paragraph",
      text: "Switching",
    },
    {
      type: "paragraph",
      text: "Fluency",
    },
    {
      type: "paragraph",
      text: "Posture discipline",
    },
    {
      type: "paragraph",
      text: "Mission alignment",
    },
    {
      type: "paragraph",
      text: "It does not add personality. It activates behavioral intelligence. Every product launch is a campaign.",
    },
    {
      type: "paragraph",
      text: "Every strategy session is a campaign. Every major decision is a campaign. Campaigns are not won by personality alone. They are won when teams consciously align posture to mission.",
    },
    {
      type: "paragraph",
      text: "Dreamer when possibility is required.",
    },
    {
      type: "paragraph",
      text: "Planner when precision is required.",
    },
    {
      type: "paragraph",
      text: "Doer when execution is required.",
    },
    {
      type: "paragraph",
      text: "With humility. With respect. With trust. With commitment. That is DPDing together in flow.",
    },
    {
      type: "paragraph",
      text: "Always be dreaming.",
    },
    {
      type: "paragraph",
      text: "Always be planning.",
    },
    {
      type: "paragraph",
      text: "Always be doing.",
    },
    {
      type: "paragraph",
      text: "Always be DPDing together in flow.",
    },
  ],
};

const roleplayGamesDpding: BlogPost = {
  slug: "roleplay-games-dpding",
  date: "5/28/19",
  title: "Roleplay Games & DPDing!",
  image: "/scroll-cards-about/card-3.jpg",
  body: [
    {
      type: "heading",
      text: "Why Roles Playing Games (RPGs), Are the Blueprint for High-Performing Teams — Today, Tomorrow, and Beyond. And How the DPD Framework and DPDing-Together With Flow (and No Ego) Make It Work in Real Life",
    },
    {
      type: "paragraph",
      text: "If you’ve ever stepped into a multiplayer role-playing game or watched your kids build entire empires in Minecraft, you’ve witnessed something extraordinary.",
    },
    {
      type: "paragraph",
      text: "Not just fun.",
    },
    {
      type: "paragraph",
      text: "Not just play.",
    },
    {
      type: "paragraph",
      text: "But behavioral mastery and Persona Dexterity, that most workplaces can’t touch.",
    },
    {
      type: "paragraph",
      text: "And here’s the kicker, gaming worlds operate with the behavioral precision that modern teams aspire to, but have never been trained in. It’s wild when you think about it.",
    },
    {
      type: "paragraph",
      text: "In a game, a 12-year-old in Kansas, a 28-year-old in Lagos, a 16-year-old in Tokyo, and a 42-year-old in London can unite instantly, switch roles seamlessly, coordinate a mission, adapt to chaos, problem-solve under pressure, and execute — all without ego friction.",
    },
    {
      type: "paragraph",
      text: "But put 12 adults in a conference room on a Tuesday morning and suddenly:",
    },
    {
      type: "paragraph",
      text: "No one knows the mission",
    },
    {
      type: "paragraph",
      text: "Two people talk too much",
    },
    {
      type: "paragraph",
      text: "Three wish they weren’t there",
    },
    {
      type: "paragraph",
      text: "One person is planning something completely different",
    },
    {
      type: "paragraph",
      text: "Someone derails the agenda",
    },
    {
      type: "paragraph",
      text: "People argue about the process",
    },
    {
      type: "paragraph",
      text: "Everyone leaves exhausted",
    },
    {
      type: "paragraph",
      text: "It’s the difference between behavioral clarity and behavioral chaos. And this is exactly why the DPD Framework exists. Because video games already solved the problem companies are still struggling with. Let’s break down how gaming cultures naturally excel at the behaviors that high-performance teams desperately need, and how the DPD Persona Behavioral Operating System™ translates that magic into the workplace.",
    },
    {
      type: "heading",
      text: "Dynamic Persona Switching: Gamers Do It Naturally",
    },
    {
      type: "paragraph",
      text: "In an RPG (Role Playing Game):",
    },
    {
      type: "paragraph",
      text: "You’re a strategist one moment",
    },
    {
      type: "paragraph",
      text: "A healer the next",
    },
    {
      type: "paragraph",
      text: "A tank when the team needs one",
    },
    {
      type: "paragraph",
      text: "A scout when the environment shifts",
    },
    {
      type: "paragraph",
      text: "No one says: “Hold on… switching roles makes me uncomfortable. It’s not my personality.” Why? Because the mission dictates the behavior, not one’s individual personality traits.",
    },
    {
      type: "paragraph",
      text: "Not ego.",
    },
    {
      type: "paragraph",
      text: "Not comfort.",
    },
    {
      type: "paragraph",
      text: "Not personality labels.",
    },
    {
      type: "paragraph",
      text: "Gamers instinctively do what the moment requires. That is exactly what Dynamic Persona Switching™ in the DPD Framework trains teams to do:",
    },
    {
      type: "paragraph",
      text: "Dreamer when vision is needed",
    },
    {
      type: "paragraph",
      text: "Planner when the structure is unclear",
    },
    {
      type: "paragraph",
      text: "Doer when it’s time to execute",
    },
    {
      type: "paragraph",
      text: "In gaming, switching is instant. In business, switching is the missing skill.",
    },
    {
      type: "paragraph",
      text: "DPDing gives teams the language and the behavioral OS to make switching normal.",
    },
    {
      type: "heading",
      text: "Ego Minimization: Gaming Is Mission-First, Not Me-First",
    },
    {
      type: "paragraph",
      text: "In a game:",
    },
    {
      type: "paragraph",
      text: "Nobody argues about titles.",
    },
    {
      type: "paragraph",
      text: "Nobody says, “That’s not my job.”",
    },
    {
      type: "paragraph",
      text: "Nobody protects their turf.",
    },
    {
      type: "paragraph",
      text: "If the boss battle starts and you're in the wrong class at the wrong moment, you switch. You adapt. You serve the mission.",
    },
    {
      type: "paragraph",
      text: "Compare that to the workplace, where:",
    },
    {
      type: "paragraph",
      text: "The Dreamer pushes vision at the wrong moment",
    },
    {
      type: "paragraph",
      text: "The Planner slows everything down",
    },
    {
      type: "paragraph",
      text: "The Doer charges ahead without alignment",
    },
    {
      type: "paragraph",
      text: "And no one switches",
    },
    {
      type: "paragraph",
      text: "DPDing removes ego friction by giving teams a shared persona language for how to show up, not who they are.",
    },
    {
      type: "paragraph",
      text: "Gaming shows us the truth: Teams don’t fail from skill gaps, they fail from posture gaps.",
    },
    {
      type: "heading",
      text: "Collective Flow: Gamers Sync Instantly",
    },
    {
      type: "paragraph",
      text: "Watch a coordinated raid or co-op mission and you’ll see:",
    },
    {
      type: "paragraph",
      text: "Distributed cognition",
    },
    {
      type: "paragraph",
      text: "Shared attention",
    },
    {
      type: "paragraph",
      text: "Smooth hand-offs",
    },
    {
      type: "paragraph",
      text: "Perfect sequencing",
    },
    {
      type: "paragraph",
      text: "Zero confusion about roles",
    },
    {
      type: "paragraph",
      text: "That’s collective flow.",
    },
    {
      type: "paragraph",
      text: "In the workplace, this is rare, not because people are slow, but because they’re unaligned.",
    },
    {
      type: "paragraph",
      text: "DPDing creates collective flow the same way games do:",
    },
    {
      type: "paragraph",
      text: "Clear mission",
    },
    {
      type: "paragraph",
      text: "Clear posture",
    },
    {
      type: "paragraph",
      text: "Clear switch points",
    },
    {
      type: "paragraph",
      text: "Zero judgment",
    },
    {
      type: "paragraph",
      text: "Just execution",
    },
    {
      type: "paragraph",
      text: "Gaming cultures proved it’s possible. DPDing-together, with flow (and no ego) makes it repeatable.",
    },
    {
      type: "heading",
      text: "Multigenerational and Multicultural Cohesion",
    },
    {
      type: "paragraph",
      text: "In real life, generational differences create friction. In games? Gen Z, Millennials, Gen X, and Boomers play side by side without:",
    },
    {
      type: "paragraph",
      text: "Conflict",
    },
    {
      type: "paragraph",
      text: "Drama",
    },
    {
      type: "paragraph",
      text: "Misunderstanding",
    },
    {
      type: "paragraph",
      text: "Sensitivity",
    },
    {
      type: "paragraph",
      text: "Resistance",
    },
    {
      type: "paragraph",
      text: "Because the persona is the universal language. Roles transcend age, culture, and communication style. DPDing™ applies the same logic.",
    },
    {
      type: "paragraph",
      text: "It gives companies a universal behavioral language that bridges:",
    },
    {
      type: "paragraph",
      text: "Generations",
    },
    {
      type: "paragraph",
      text: "Communication styles",
    },
    {
      type: "paragraph",
      text: "Cultures",
    },
    {
      type: "paragraph",
      text: "Personalities",
    },
    {
      type: "paragraph",
      text: "Leadership levels",
    },
    {
      type: "paragraph",
      text: "Gaming already proved this works. DPDing™ integrates it into professional life.",
    },
    {
      type: "heading",
      text: "Rapid Decision-Making Under Pressure",
    },
    {
      type: "paragraph",
      text: "Gamers make thousands of micro-decisions in minutes:",
    },
    {
      type: "paragraph",
      text: "Assess",
    },
    {
      type: "paragraph",
      text: "Switch",
    },
    {
      type: "paragraph",
      text: "Adapt",
    },
    {
      type: "paragraph",
      text: "Execute",
    },
    {
      type: "paragraph",
      text: "Iterate",
    },
    {
      type: "paragraph",
      text: "No committee meetings. No 47-slide decks. No passive-aggressive Slack threads.",
    },
    {
      type: "paragraph",
      text: "Just… action.",
    },
    {
      type: "paragraph",
      text: "DPDing™ helps teams remember how to:",
    },
    {
      type: "paragraph",
      text: "Avoid analysis paralysis",
    },
    {
      type: "paragraph",
      text: "Switch personas on cue",
    },
    {
      type: "paragraph",
      text: "Use clear behavioral signals",
    },
    {
      type: "paragraph",
      text: "Sequence work like a mission flow",
    },
    {
      type: "paragraph",
      text: "Real-time adaptability is the new competitive advantage. Gaming mastered it first. DPDing™ operationalizes it.",
    },
    {
      type: "heading",
      text: "Psychological Safety: Failure Is Not Identity",
    },
    {
      type: "paragraph",
      text: "In games:",
    },
    {
      type: "paragraph",
      text: "You try → You fail → You learn → You retry.",
    },
    {
      type: "paragraph",
      text: "No shame.",
    },
    {
      type: "paragraph",
      text: "No gossip.",
    },
    {
      type: "paragraph",
      text: "No self-protection.",
    },
    {
      type: "paragraph",
      text: "No covering mistakes.",
    },
    {
      type: "paragraph",
      text: "Imagine that in the workplace. Imagine an org where:",
    },
    {
      type: "paragraph",
      text: "Failure is information",
    },
    {
      type: "paragraph",
      text: "Feedback is neutral",
    },
    {
      type: "paragraph",
      text: "Learning is the norm",
    },
    {
      type: "paragraph",
      text: "Teams grow together",
    },
    {
      type: "paragraph",
      text: "DPDing™ builds this through:",
    },
    {
      type: "paragraph",
      text: "Egoless speaking",
    },
    {
      type: "paragraph",
      text: "Egoless listening",
    },
    {
      type: "paragraph",
      text: "Persona switching",
    },
    {
      type: "paragraph",
      text: "Shared mission language",
    },
    {
      type: "paragraph",
      text: "It’s the psychological safety gaming communities built, now translated into a corporate operating system.",
    },
    {
      type: "heading",
      text: "DPDing Translates Gaming Instincts Into a Workplace-Ready System",
    },
    {
      type: "paragraph",
      text: "Here’s the simple truth:",
    },
    {
      type: "paragraph",
      text: "Gamers have been training dynamic persona switching their whole lives.",
    },
    {
      type: "paragraph",
      text: "Workplaces just haven’t had the Behavioral OS and GPS to support it until now.",
    },
    {
      type: "paragraph",
      text: "DPDing-together with flow is the bridge between play behavior and professional behavior:",
    },
    {
      type: "paragraph",
      text: "Dynamic Persona Switching™ = role switching in games",
    },
    {
      type: "paragraph",
      text: "Persona Posture = class/build alignment",
    },
    {
      type: "paragraph",
      text: "Team Persona Map = raid composition",
    },
    {
      type: "paragraph",
      text: "Meeting Priming = mission briefing",
    },
    {
      type: "paragraph",
      text: "DPD Coins = behavioral activators",
    },
    {
      type: "paragraph",
      text: "Team Flow = co-op synchronization",
    },
    {
      type: "paragraph",
      text: "When you look at it this way, work becomes less like “performance management” and more like… play priming and activation. Not childish play.",
    },
    {
      type: "paragraph",
      text: "Not recreational play.",
    },
    {
      type: "paragraph",
      text: "But purposeful, high-engagement, high-performance play. The kind elite teams operate in every day.",
    },
    {
      type: "heading",
      text: "This Is What We Mean When We Say: Evolutionizing Work Into Play",
    },
    {
      type: "paragraph",
      text: "Work doesn’t need to be boring. It needs to be behaviorally aligned.",
    },
    {
      type: "paragraph",
      text: "It needs:",
    },
    {
      type: "paragraph",
      text: "clear personas",
    },
    {
      type: "paragraph",
      text: "clear missions",
    },
    {
      type: "paragraph",
      text: "instant switching",
    },
    {
      type: "paragraph",
      text: "ego minimization",
    },
    {
      type: "paragraph",
      text: "flow behavior",
    },
    {
      type: "paragraph",
      text: "collective intelligence",
    },
    {
      type: "paragraph",
      text: "Gaming has shown us the future. DPDing™ makes it deployable.",
    },
    {
      type: "paragraph",
      text: "DPDing™ is the world's first Persona-Based Behavioral OS & GPS™, the system that turns play-level performance into workplace-level results.",
    },
    {
      type: "paragraph",
      text: "This is how we: Beat the competition, not each other.",
    },
    {
      type: "paragraph",
      text: "Always be Dreaming.",
    },
    {
      type: "paragraph",
      text: "Always be Planning.",
    },
    {
      type: "paragraph",
      text: "Always be Doing.",
    },
    {
      type: "paragraph",
      text: "Always be DPDing™ — together with flow and no ego.",
    },
  ],
};

/** Add new posts to this array. Each slug becomes `/blog/[slug]`. */
export const blogPosts: readonly BlogPost[] = [
  personaSwitching,
  personaBehaviorCoordination,
  roleplayGamesDpding,
];

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
