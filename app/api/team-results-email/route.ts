import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getEmailDatabase } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const id = typeof body?.submissionId === "string" ? body.submissionId : "";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof body?.tipsOptIn !== "boolean" || !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(id)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  try {
    await getEmailDatabase().collection("devEmails").doc(id).create({
      email,
      tipsOptIn: body.tipsOptIn,
      source: "team-persona-posture-results",
      createdAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 6) {
      return NextResponse.json({ ok: true });
    }
    console.error("[team-results-email] Firebase write failed", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json({ error: "We couldn’t save your email. Please try again." }, { status: 503 });
  }
}
