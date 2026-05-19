import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { Instrument_Serif } from "next/font/google";

import { createPageMetadata } from "@/lib/metadata";
import { ContactForm } from "./contact-form";

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = createPageMetadata("Contact");

const bullets = [
  "See how DPDing gives your team a shared language for dreaming, planning, and executing together.",
  "Get a tailored walkthrough based on your organization’s goals and rollout timeline.",
  "Explore assessments, dashboards, and how leaders gain visibility into team dynamics.",
] as const;

export default function ContactPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="h-20 w-full bg-background" aria-hidden />
      <section className="relative isolate min-h-[min(100vh,520px)] w-full lg:min-h-[calc(100vh-5rem)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 grid min-h-[min(100vh,520px)] w-full grid-cols-1 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)]">
          {/* Left: hero + copy */}
          <div className="flex min-h-[min(100vh,520px)] flex-col justify-end px-6 pb-12 pt-28 sm:px-10 sm:pb-14 sm:pt-32 lg:min-h-[calc(100vh-5rem)] lg:justify-center lg:px-12 lg:pb-20 lg:pt-24 xl:px-16">
            <div className="relative mx-auto w-full max-w-xl lg:mx-0">
              <h1
                className={`${displaySerif.className} text-4xl leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px]`}
              >
                Contact us
              </h1>
              <p className="mt-5 max-w-prose text-base leading-relaxed text-white/90 sm:text-lg">
                Ready to get started? We&apos;re excited to learn more about your
                team and show how DPDing helps people coordinate behavior in the AI
                era. Fill out the form and our team will be in touch soon.
              </p>
              <ul className="mt-8 flex max-w-prose flex-col gap-4">
                {bullets.map((text) => (
                  <li key={text} className="flex gap-3 text-sm leading-snug text-white/95 sm:text-base">
                    <span
                      className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-white"
                      aria-hidden
                    >
                      <FaCheck className="size-2.5" />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-sm leading-relaxed text-white/75">
                For customer support, please email{" "}
                <a
                  href="mailto:hello@dpding.com"
                  className="font-medium text-white underline decoration-white/40 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
                >
                  hello@dpding.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right: form card */}
          <div className="flex justify-center px-6 pb-16 pt-8 sm:px-10 lg:-ml-12 lg:mr-6 lg:min-h-[calc(100vh-5rem)] lg:items-center lg:justify-center lg:px-0 lg:pb-20 lg:pt-24 xl:-ml-16 xl:mr-10">
            <div className="w-full max-w-md border-t-4 border-fuchsia-500 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:px-8 sm:py-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
