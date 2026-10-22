import type { BlogPost, BlogPostBlock } from "./post-types";

type FrontmatterValue = string | boolean;

export type ArticleFrontmatter = {
  title: string;
  date?: string;
  author?: string;
  subtext?: string;
  image?: string;
  vimeo?: string;
  featured?: boolean;
};

export function parseFrontmatter(raw: string): {
  data: Record<string, FrontmatterValue>;
  body: string;
} {
  const source = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, body: source.trim() };
  }

  const data: Record<string, FrontmatterValue> = {};

  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();

    if (!key) {
      continue;
    }

    if (rawValue === "true" || rawValue === "false") {
      data[key] = rawValue === "true";
      continue;
    }

    data[key] = rawValue.replace(/^["']|["']$/g, "");
  }

  return { data, body: match[2].trim() };
}

function isStandaloneHeading(text: string): boolean {
  if (text.length < 8 || text.length > 140) {
    return false;
  }

  if (/^["“]/.test(text)) {
    return false;
  }

  if (text.includes(". ") && /\.\s+[A-Z]/.test(text) && /[.]$/.test(text)) {
    return text.split(/\s+/).length <= 16;
  }

  return !/[.!?]$/.test(text);
}

export function parseArticleBody(markdown: string): BlogPostBlock[] {
  const chunks = markdown
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n[ \t]*\n/);

  return chunks.flatMap<BlogPostBlock>((chunk) => {
    const text = chunk.replace(/[ \t]*\n[ \t]*/g, " ").trim();

    if (!text) {
      return [];
    }

    if (text.startsWith("## ")) {
      return [{ type: "heading", text: text.slice(3).trim() }];
    }

    const link = text.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (link) {
      return [{ type: "link", label: link[1], href: link[2] }];
    }

    if (isStandaloneHeading(text)) {
      return [{ type: "heading", text }];
    }

    return [{ type: "paragraph", text }];
  });
}

export function articleFromMarkdown(
  slug: string,
  raw: string,
): BlogPost | null {
  const { data, body } = parseFrontmatter(raw);
  const title = typeof data.title === "string" ? data.title : "";

  if (!title) {
    return null;
  }

  return {
    slug,
    title,
    date: typeof data.date === "string" ? data.date : undefined,
    author: typeof data.author === "string" ? data.author : undefined,
    subtext: typeof data.subtext === "string" ? data.subtext : undefined,
    image: typeof data.image === "string" ? data.image : undefined,
    vimeo: typeof data.vimeo === "string" ? data.vimeo : undefined,
    featured: data.featured === true,
    body: parseArticleBody(body),
  };
}
