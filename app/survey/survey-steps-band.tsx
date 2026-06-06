"use client";

import { ParallaxImage } from "../parallax-background";

const featureSteps = [
  {
    step: 1,
    title: "Complete the Survey",
    description:
      "Be yourself and answer honestly to discover your current behavioral posture.",
  },
  {
    step: 2,
    title: "View Detailed Results",
    description:
      "Learn how your persona profile influences collaboration, communication, and execution.",
  },
  {
    step: 3,
    title: "Unlock Team Alignment",
    description:
      "Get practical guidance for teams, coaches, and leaders—aligned to how you actually show up.",
  },
] as const;

export function SurveyStepsBand() {
  return (
    <section className="relative left-1/2 mt-14 w-screen -translate-x-1/2 sm:mt-16">
      <div className="relative isolate overflow-hidden">
        <ParallaxImage
          src="/bg-2.jpg"
          alt=""
          sizes="100vw"
          speed={0.16}
          imageWrapperClassName="-inset-y-24"
        />
        <div className="absolute inset-0 bg-[#071423]/55" aria-hidden />

        <div className="relative w-full py-12 sm:py-16 lg:py-20">
          <div className="grid overflow-hidden border-y border-white/25 md:grid-cols-3">
            {featureSteps.map(({ step, title, description }) => (
              <article
                key={step}
                className="bg-white/5 px-12 py-12 text-white backdrop-blur-xl md:min-h-[280px] md:border-l md:border-white/25 md:px-20 md:py-16 first:md:border-l-0"
              >
                <p className="custom-body-sm tracking-[-0.01em] text-white">
                  Step {step}
                </p>
                <h2 className="mt-2 max-w-[18ch] custom-sm-title text-white">
                  {title}
                </h2>
                <p className="mt-5 max-w-[32ch] custom-body tracking-[-0.01em] text-white">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
