import fs from "node:fs";
import path from "node:path";
import "server-only";

import { articleFromMarkdown } from "./parse-article";
import type { BlogPost } from "./post-types";

const markdownDirectory = path.join(process.cwd(), "content/blog");

function parseSortableDate(date: string | undefined): number {
  if (!date) {
    return 0;
  }

  const match = date.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  if (!match) {
    return 0;
  }

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = match[3].length === 2 ? 2000 + Number(match[3]) : Number(match[3]);

  return Date.UTC(year, month - 1, day);
}

export function sortPostsByDate(posts: readonly BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const dateDelta = parseSortableDate(b.date) - parseSortableDate(a.date);
    if (dateDelta !== 0) {
      return dateDelta;
    }

    return a.slug.localeCompare(b.slug);
  });
}

export function loadMarkdownPosts(): BlogPost[] {
  if (!fs.existsSync(markdownDirectory)) {
    return [];
  }

  return fs
    .readdirSync(markdownDirectory)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .flatMap((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(
        path.join(markdownDirectory, fileName),
        "utf8",
      );
      const post = articleFromMarkdown(slug, raw);
      return post ? [post] : [];
    });
}
