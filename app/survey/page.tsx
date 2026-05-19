import type { SVGProps } from "react";
import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";
import {
  StepOneIllustration,
  StepThreeIllustration,
  StepTwoIllustration,
} from "./survey-illustrations";
import { SurveyAssessment } from "./survey-assessment";

export const metadata = createPageMetadata("Take the Survey", {
  description:
    "Complete the DPD persona assessment, view your results, and unlock practical guidance for how you dream, plan, and do.",
});

const steps = [
  {
    step: 1,
    accent: "#4ba3b4",
    title: "Complete the Assessment",
    description:
      "Be yourself and answer honestly to discover how you naturally dream, plan, and do.",
    Illustration: StepOneIllustration,
  },
  {
    step: 2,
    accent: "#47a877",
    title: "View Detailed Results",
    description:
      "Learn how your persona profile influences collaboration, communication, and execution.",
    Illustration: StepTwoIllustration,
  },
  {
    step: 3,
    accent: "#8860a2",
    title: "Unlock Your Potential",
    description:
      "Get practical guidance for teams, coaches, and leaders—aligned to how you actually show up.",
    Illustration: StepThreeIllustration,
  },
] as const;

const pageInset =
  "mx-auto w-full max-w-6xl px-5 sm:px-[45px] lg:px-8";

export default function SurveyPage() {
  return (
    <main className="relative flex-1 overflow-x-clip bg-[#f5f6f8] text-[#333a48]">
      <WaveBackdrop className="pointer-events-none absolute inset-x-0 top-[34%] z-0 h-[min(52vw,420px)] text-white" />

      <section className="relative z-10 pb-20 pt-28 sm:pb-28 sm:pt-32 lg:pt-36">
        <div className={`${pageInset} relative`}>
          <header className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p
              className="text-3xl font-extrabold tracking-[-0.04em] text-[#333a48] sm:text-4xl"
              aria-label="DPDing"
            >
              <span className="text-[#FF9900]">DPD</span>ing
            </p>
            <h1 className="mt-6 text-[2rem] font-bold leading-tight tracking-[-0.02em] text-[#333a48] sm:text-[2.35rem]">
              Free Persona Assessment
            </h1>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280] sm:text-[13px]">
              DPD Persona Explorer®
            </p>
          </header>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:mt-16 md:grid-cols-3 md:gap-5 lg:mt-20 lg:gap-7">
            {steps.map(
              ({ step, accent, title, description, Illustration }) => (
                <article
                  key={step}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(51,58,72,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(51,58,72,0.12)]"
                  style={{ borderTop: `4px solid ${accent}` }}
                >
                  <div
                    className="flex min-h-[148px] items-center justify-center px-6 pt-8 pb-2"
                    style={{ color: accent }}
                  >
                    <Illustration className="h-[120px] w-full max-w-[200px]" />
                  </div>

                  <div className="flex flex-1 flex-col px-7 pb-8 pt-4 text-center sm:px-8 sm:pb-9">
                    <span
                      className="mx-auto inline-flex items-center justify-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                      style={{ backgroundColor: accent }}
                    >
                      Step {step}
                    </span>
                    <h2 className="mt-5 text-lg font-bold leading-snug text-[#333a48] sm:text-xl">
                      {title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#666] sm:text-[15px]">
                      {description}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 sm:mt-16">
            <Link
              href="#assessment"
              className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-full bg-[#FF9900] px-10 text-sm font-bold text-[#111111] shadow-[0_12px_28px_rgba(255,153,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#e68a00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#333a48]"
            >
              Begin assessment
            </Link>
            <p className="text-center text-sm text-[#6b7280]">
              About 10 minutes · No account required to start
            </p>
          </div>

          <SurveyAssessment />
        </div>
      </section>
    </main>
  );
}

function WaveBackdrop({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path d="M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160 L1440,320 L0,320 Z" />
      <path
        d="M0,200 C300,120 540,260 840,200 C1080,150 1260,240 1440,200 L1440,320 L0,320 Z"
        opacity="0.55"
      />
    </svg>
  );
}
