"use client";

import { ParallaxImage } from "../parallax-background";

const featureSteps = [
  {
    step: 1,
    title: "Complete the Assessment",
    description:
      "Be yourself and answer honestly to discover how you naturally dream, plan, and do.",
  },
  {
    step: 2,
    title: "View Detailed Results",
    description:
      "Learn how your persona profile influences collaboration, communication, and execution.",
  },
  {
    step: 3,
    title: "Unlock Your Potential",
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
                className="bg-white/5 px-12 py-12 text-white/95 backdrop-blur-xl md:min-h-[280px] md:border-l md:border-white/25 md:px-20 md:py-16 first:md:border-l-0"
              >
                <p className="text-[16px] font-medium tracking-[-0.01em] text-white/75">
                  Step {step}
                </p>
                <h2 className="mt-2 max-w-[18ch] text-[26px] font-semibold leading-snug tracking-[-0.02em] text-white md:text-[28px] lg:text-[30px]">
                  {title}
                </h2>
                <p className="mt-5 max-w-[32ch] text-[15px] font-normal leading-relaxed tracking-[-0.01em] text-white/90 md:text-[15.5px] lg:text-[16px]">
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
