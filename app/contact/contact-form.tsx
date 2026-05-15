"use client";

import { useState } from "react";

const fieldClass =
  "w-full rounded border border-black/15 bg-white px-3 py-2.5 text-sm text-[#111111] outline-none transition-shadow placeholder:text-black/35 focus:border-black/40 focus:ring-2 focus:ring-black/10";

const labelClass = "text-sm font-bold text-[#111111]";

export function ContactForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="text-center text-base leading-relaxed text-black/70">
        Thanks — we received your message and will follow up soon.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
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
      <button
        type="submit"
        className="mt-1 w-full rounded bg-black py-3 text-sm font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
      >
        Send message
      </button>
    </form>
  );
}
