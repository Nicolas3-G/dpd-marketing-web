"use client";

import { ContactForm } from "./contact-form";

const bullets = [
  "See how the DPD Framework gives your team a shared language for dreaming, planning, and executing together.",
  "Get a tailored walkthrough based on your organization's goals and rollout timeline.",
  "Explore assessments, dashboards, and how leaders gain visibility into team dynamics.",
] as const;

export function ContactHero() {
  return (
    <section
      id="contact-hero"
      className="relative isolate min-h-[min(100vh,520px)] w-full lg:min-h-[calc(100vh-5rem)]"
    >
      <video
        src="/videos/contact-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex min-h-[min(100vh,520px)] w-full items-center py-16 sm:py-20 lg:min-h-[calc(100vh-5rem)]">
        <div className="mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,1fr)]">
            <div className="flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-12 lg:px-14 lg:py-14">
              <div className="relative mx-auto w-full max-w-xl lg:mx-0">
                <h1 className="custom-lg-title-bold text-black">
                  Contact us
                </h1>
                <p className="mt-5 max-w-prose custom-body text-black">
                  Ready to get started? We&apos;re excited to learn more about your
                  team and show how the DPD Framework helps people coordinate behavior in the AI
                  era. Fill out the form and our team will be in touch soon.
                </p>
                <ul className="mt-8 list-disc flex max-w-prose flex-col gap-4 pl-5">
                  {bullets.map((text) => (
                    <li key={text} className="custom-body-bold text-black">
                      {text}
                    </li>
                  ))}
                </ul>
                <p className="mt-10 custom-label text-custom-black">
                  For customer support, please email{" "}
                  <a
                    href="mailto:hello@DPDFramework.com"
                    className="custom-label text-custom-black underline decoration-custom-black/40 underline-offset-2 transition-colors hover:text-custom-black hover:decoration-custom-black"
                  >
                    hello@DPDFramework.com
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center px-8 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <div className="w-full max-w-xl rounded-2xl border border-gray-card-border bg-gray-card px-6 py-8 sm:px-8 sm:py-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
