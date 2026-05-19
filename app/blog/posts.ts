export type BlogPostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string };

export type BlogPost = {
  slug: string;
  date: string;
  title: string;
  subtext: string;
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

export function getReadTimeMinutes(post: BlogPost): number {
  const wordCount = post.body
    .map((block) => block.text)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
