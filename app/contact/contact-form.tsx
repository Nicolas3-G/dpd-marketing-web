"use client";

import { useState } from "react";

const fieldClass =
  "w-full rounded border border-black/15 bg-white px-3 py-2.5 text-sm text-[#111111] outline-none transition-shadow placeholder:text-black/35 focus:border-black/40 focus:ring-2 focus:ring-black/10";

const labelClass = "text-sm font-bold text-[#111111]";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (status === "success") {
    return (
      <p className="text-center text-base leading-relaxed text-black/70">
        Thanks — we received your message and will follow up soon.
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? "").trim(),
          firstName: String(data.get("firstName") ?? "").trim(),
          lastName: String(data.get("lastName") ?? "").trim(),
          jobTitle: String(data.get("jobTitle") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
        }),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("error");
        setErrorMessage(
          json?.error ??
            "Something went wrong sending your message. Please try again or email us directly.",
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your message. Please try again or email us directly.",
      );
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className={labelClass}>
          Work email <span className="text-rose-600">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
          placeholder="you@company.com"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-first" className={labelClass}>
            First name <span className="text-rose-600">*</span>
          </label>
          <input
            id="contact-first"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-last" className={labelClass}>
            Last name <span className="text-rose-600">*</span>
          </label>
          <input
            id="contact-last"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-title" className={labelClass}>
          Job title <span className="text-rose-600">*</span>
        </label>
        <input
          id="contact-title"
          name="jobTitle"
          type="text"
          required
          autoComplete="organization-title"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-phone" className={labelClass}>
          Phone number <span className="text-rose-600">*</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-company" className={labelClass}>
          Company <span className="text-rose-600">*</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          className={fieldClass}
        />
      </div>
      {errorMessage ? (
        <p className="text-center text-sm text-rose-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 w-full rounded bg-black py-3 text-sm font-semibold tracking-tight text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
