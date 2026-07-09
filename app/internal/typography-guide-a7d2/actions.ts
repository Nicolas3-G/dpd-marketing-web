"use server";

import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "internal_doc_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export type UnlockState = {
  error?: string;
};

export async function unlockInternalDoc(
  _prevState: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const expected = process.env.INTERNAL_DOC_PASSWORD;
  if (!expected) {
    return { error: "This page hasn't been configured yet." };
  }

  const password = String(formData.get("password") ?? "");
  if (password !== expected) {
    return { error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, hashPassword(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/internal",
    maxAge: COOKIE_MAX_AGE,
  });

  return {};
}

export async function isInternalDocUnlocked() {
  const expected = process.env.INTERNAL_DOC_PASSWORD;
  if (!expected) return false;

  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value === hashPassword(expected);
}
