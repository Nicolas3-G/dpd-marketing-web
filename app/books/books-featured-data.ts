export const BOOK_AMAZON_URL =
  "https://www.amazon.com/DPD-Framework-Revolutionize-Collaboration-Personas/dp/B0DV5DNK9V";

/** Featured publication — single book for now; add entries here when more ship. */
export const booksFeaturedContent = {
  overline: "Now available",
  title: "The DPD Framework",
  subtitle: "Revolutionize Collaboration with Personas",
  author: "Kokoro V. Robinson",
  authorHref: "/team",
  format: "Paperback & Kindle",
  coverImage: "/scroll-cards/card-6.jpg",
  coverAlt: "The DPD Framework book cover",
  description:
    "The definitive guide to the Dreamer–Planner–Doer Framework—a science-forward behavioral operating system that goes beyond personality assessments. Learn how teams name their modes, switch personas on purpose, and coordinate behavior in real time.",
  primaryCta: {
    label: "Get it on Amazon",
    href: BOOK_AMAZON_URL,
  },
  secondaryCta: {
    label: "Explore the framework online",
    href: "/framework",
  },
} as const;
