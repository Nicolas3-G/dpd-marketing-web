"use client";

import { useState } from "react";

const fieldClass =
  "w-full rounded-lg border-[1.5px] border-gray-card-border bg-form-input-background px-3 py-2.5 text-sm text-custom-black outline-none transition-shadow placeholder:text-gray-card-text/50 focus:border-gray-card-border focus:ring-2 focus:ring-gray-card-border/20";

const labelClass = "custom-label capitalize text-gray-card-text";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (status === "success") {
    return (
      <p className="text-center custom-body text-gray-card-text">
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
          phone: String(data.get("phone") ?? "").trim(),
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
          Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
          placeholder="you@example.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-first" className={labelClass}>
          First name
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
          Last name
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
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-phone" className={labelClass}>
          Phone number <span className="text-gray-card-text/60 custom-label font-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
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
        className="mt-1 w-full rounded-full bg-custom-black py-3 custom-label-bold tracking-tight text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
