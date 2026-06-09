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

export default function SurveyPage() {
  return (
    <main className="relative flex-1 overflow-x-clip bg-background text-[#333a48]">
      <section className="relative pb-20 pt-28 sm:pb-28 sm:pt-32 lg:pt-36">
        <div className={`${pageInset} relative`}>
          <header className="mx-auto flex max-w-1xl flex-col items-center text-center">
            <p
              className="custom-sm-title text-brand-orange"
              aria-label="DPD Framework"
            >
              DPD Framework
            </p>
            <h1 className="mt-4 custom-lg-title-bold">
              Free Persona Survey
            </h1>
            <p className="mt-3 custom-body-bold uppercase tracking-[0.08em] text-light">
              DPD Persona Explorer®
            </p>
          </header>

          <div className="mt-14 flex flex-col items-center gap-4 sm:mt-16">
            <Link
              href="#assessment"
              className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-full bg-brand-orange px-10 custom-label-bold text-white shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#333a48]"
            >
              Get Started
            </Link>
            <p className="text-center custom-label text-light">
              About 5 minutes · No account required to start
            </p>
          </div>

          <SurveyStepsBand />

          <SurveyAssessment />
        </div>
      </section>
    </main>
  );
}
