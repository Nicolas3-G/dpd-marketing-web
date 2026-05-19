import type { Metadata } from "next";

const SITE_NAME = "DPDing";

/** Browser tab title: `DPDing | {page}`. */
export function pageTitle(page: string): string {
  return `${SITE_NAME} | ${page}`;
}

export function createPageMetadata(
  page: string,
  options?: Omit<Metadata, "title">,
): Metadata {
  return {
    title: pageTitle(page),
    ...options,
  };
}
