export type BlogPostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "link"; label: string; href: string };

export type BlogPost = {
  slug: string;
  date?: string;
  title: string;
  author?: string;
  subtext?: string;
  image?: string;
  /** Vimeo ID, URL, or `"placeholder"` until the video is ready. */
  vimeo?: string;
  /** Shown in the blog index hero when true. Falls back to the first post. */
  featured?: boolean;
  body: readonly BlogPostBlock[];
};
