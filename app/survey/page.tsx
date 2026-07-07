import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";
import { SurveyAssessment } from "./survey-assessment";
import { SurveyStepsBand } from "./survey-steps-band";

export const metadata = createPageMetadata("Take the Survey", {
  description:
    "Complete the DPD persona assessment, view your results, and unlock practical guidance for how you dream, plan, and do.",
});

const pageInset =
  "mx-auto w-full max-w-6xl px-5 sm:px-[45px] lg:px-8";

const heroInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

export default function SurveyPage() {
  return (
    <main className="relative flex-1 overflow-x-clip bg-background text-[#333a48]">
      <section className="relative flex min-h-[calc(var(--stable-vh,100svh)-4rem)] items-end overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-32 lg:pt-36">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/survey-hero-video.mov"
        />
        <div className={`${heroInset} relative z-10`}>
          <header className="flex max-w-1xl flex-col items-start text-left">
            <p
              className="custom-body-bold uppercase text-brand-orange"
              aria-label="DPD Framework"
            >
              DPD Framework
            </p>
            <h1 className="mt-4 custom-lg-title-bold">
              Quick Persona Check-In
            </h1>
            <p className="mt-3 custom-body-bold uppercase tracking-[0.08em] text-custom-black">
              Full survey in DPD App
            </p>
          </header>

          <div className="mt-14 flex flex-col items-start gap-4 sm:mt-16">
            <Link
              href="#assessment"
              className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-full bg-brand-orange px-10 custom-label-bold text-white shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#333a48]"
            >
              Get Started
            </Link>
            <p className="custom-label text-custom-black">
              About 5 minutes · No account required to start
            </p>
          </div>
        </div>
      </section>

      <div className={pageInset}>
        <SurveyStepsBand />
        <SurveyAssessment />
      </div>
    </main>
  );
}
