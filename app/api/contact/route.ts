import { NextResponse } from "next/server";

import {
  isResendConfigured,
  sendContactEmail,
  type ContactPayload,
} from "@/lib/resend";

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const raw = body as Record<string, unknown>;
  const email = String(raw.email ?? "").trim();
  const firstName = String(raw.firstName ?? "").trim();
  const lastName = String(raw.lastName ?? "").trim();
  const jobTitle = String(raw.jobTitle ?? "").trim();
  const phone = String(raw.phone ?? "").trim();
  const company = String(raw.company ?? "").trim();

  if (!email || !firstName || !lastName || !jobTitle || !phone || !company || !email.includes("@")) {
    return null;
  }

  return { email, firstName, lastName, jobTitle, phone, company };
}

export async function POST(request: Request) {
  if (!isResendConfigured()) {
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      { error: isDev ? "Contact form is not configured. Missing: RESEND_API_KEY" : "Contact form is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  try {
    await sendContactEmail(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const isDev = process.env.NODE_ENV === "development";
    const message = error instanceof Error ? error.message : String(error);
    console.error("[api/contact] Resend send failed:", error);
    return NextResponse.json(
      { error: isDev ? message : "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
