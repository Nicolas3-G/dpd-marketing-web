"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";

const UNLOCK_KEY = "dpd-team-email-unlocked";
const UNLOCK_EVENT = "dpd-team-email-unlocked-change";
function subscribeUnlock(notify: () => void) {
  window.addEventListener(UNLOCK_EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(UNLOCK_EVENT, notify);
    window.removeEventListener("storage", notify);
  };
}
function readUnlock() {
  try { return sessionStorage.getItem(UNLOCK_KEY) === "true"; }
  catch { return false; }
}

export function EmailGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const rememberedUnlock = useSyncExternalStore(subscribeUnlock, readUnlock, () => false);
  const isUnlocked = unlocked || rememberedUnlock;
  const [validEmail, setValidEmail] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const submissionId = useRef<string | null>(null);
  const submitting = useRef(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isUnlocked || readUnlock()) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal?.showModal();
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isUnlocked]);

  return <>
    <div inert={!isUnlocked} aria-hidden={!isUnlocked} className={isUnlocked ? "" : "select-none blur-sm"}>{children}</div>
    {!isUnlocked ? <dialog
      ref={dialog}
      aria-labelledby="team-email-title"
      aria-describedby="team-email-description"
      onCancel={event => event.preventDefault()}
      className="m-auto max-h-[calc(100dvh-40px)] w-[calc(100%-40px)] max-w-lg overflow-y-auto rounded-2xl border-0 bg-white p-6 text-custom-black shadow-2xl backdrop:bg-custom-black/25 backdrop:backdrop-blur-sm sm:px-10 sm:py-8"
    >
      <h2 id="team-email-title" className="custom-sm-title text-center">Enter your email address to view your results</h2>
      <p id="team-email-description" className="custom-body mt-5 text-center text-light">Explore your team’s persona posture, strengths, and practical next steps.</p>
      <form className="mt-8" onSubmit={async event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity() || submitting.current) return;
        const data = new FormData(form);
        submissionId.current ??= crypto.randomUUID();
        submitting.current = true;
        setSaving(true);
        setError("");
        try {
          const response = await fetch("/api/team-results-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.get("email"), tipsOptIn: data.get("tips") === "on", submissionId: submissionId.current }),
          });
          if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || "Unable to save your email. Please try again.");
          }
          try {
            sessionStorage.setItem(UNLOCK_KEY, "true");
            window.dispatchEvent(new Event(UNLOCK_EVENT));
          } catch { /* Still unlock this view if browser storage is unavailable. */ }
          form.reset();
          setUnlocked(true);
        } catch (error) {
          setError(error instanceof Error ? error.message : "Unable to save your email. Please try again.");
        } finally {
          submitting.current = false;
          setSaving(false);
        }
      }}>
        <label htmlFor="team-results-email" className="custom-body-bold">Email</label>
        <div className="relative mt-3">
          <input id="team-results-email" name="email" type="email" required autoFocus autoComplete="email" placeholder="your@email.com"
            onChange={event => setValidEmail(event.currentTarget.validity.valid)}
            className="h-12 w-full rounded-none border-0 border-b border-custom-black/50 bg-transparent px-1 custom-body text-custom-black placeholder:text-custom-black/25 outline-none transition-colors focus:border-brand-orange focus:ring-0" />
        </div>
        <label className="mt-6 flex cursor-pointer items-start gap-3 custom-label text-light">
          <input type="checkbox" name="tips" className="mt-0.5 size-5 shrink-0 accent-brand-orange" />
          <span>Send me occasional tips to help my team work better together.</span>
        </label>
        {error ? <p role="alert" className="custom-label mt-5 text-red-700">{error}</p> : null}
        <div className="mt-8 flex flex-col items-center gap-5">
          <button type="submit" disabled={!validEmail || saving} className="inline-flex h-14 w-full max-w-sm items-center justify-center rounded-full bg-brand-orange px-8 custom-label-bold text-white transition hover:bg-brand-orange-hover disabled:cursor-not-allowed disabled:opacity-40">{saving ? "Saving…" : "See results"}</button>
          <Link href="/team-persona-posture#team-calculator" className="custom-label-bold text-custom-black underline-offset-4 hover:underline">Go back</Link>
        </div>
      </form>
    </dialog> : null}
  </>;
}
