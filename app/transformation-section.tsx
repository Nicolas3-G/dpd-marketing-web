"use client";

import { useScrollScrubVideo } from "@/lib/use-scroll-scrub-video";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const transformationMetrics = [
  {
    direction: "up",
    value: "75",
    suffix: "%",
    label: "Improvement in team alignment",
  },
  {
    direction: "down",
    value: "50",
    suffix: "%",
    label: "Reduction in decision latency",
  },
  {
    direction: "up",
    value: "60",
    suffix: "%",
    label: "Improvement in communication efficiency",
  },
  {
    direction: "up",
    value: "70",
    suffix: "%",
    label: "Improvement in cross-functional clarity",
  },
] as const;

export function TransformationSection() {
  const { triggerRef: sectionRef, videoRef } = useScrollScrubVideo<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="transformation"
      className="relative overflow-hidden bg-custom-black text-white"
    >
      <video
        ref={videoRef}
        src="/videos/orange-lights.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-custom-black/20" />
      <div className={`relative z-10 ${pageInset} py-18 sm:py-20`}>
        <h2 className="custom-xs-title text-white">
          What we deliver
        </h2>

        <div className="mt-6 grid border border-white/20 bg-black/20 md:grid-cols-2">
          {transformationMetrics.map((metric, index) => (
            <div
              key={index}
              className={`grid min-h-44 gap-6 border-white/20 p-6 sm:grid-cols-[10rem_1fr] sm:items-start sm:p-8 lg:min-h-52 lg:grid-cols-[14rem_1fr] ${
                index > 0 ? "border-t md:border-t-0" : ""
              } ${index > 1 ? "md:border-t" : ""} ${
                index % 2 === 1 ? "md:border-l" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-3 text-3xl font-light text-white">
                  {metric.direction === "up" ? "↑" : "↓"}
                </span>
                <p className="flex items-start text-[clamp(4.5rem,10vw,7rem)] font-medium leading-none tracking-tighter">
                  {metric.value}
                  {metric.suffix ? (
                    <span className="ml-1 mt-3 text-3xl tracking-tight sm:text-4xl">
                      {metric.suffix}
                    </span>
                  ) : null}
                </p>
              </div>
              <p className="max-w-sm custom-body-bold text-white-light sm:pt-5">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 custom-label italic text-white-light">
          *Illustrative model of possibility. Results depend on adoption,
          leadership participation, and consistent DPDing.
        </p>
      </div>
    </section>
  );
}
