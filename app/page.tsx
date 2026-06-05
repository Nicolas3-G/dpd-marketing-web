import Image from "next/image";
import { FaChartLine, FaFingerprint, FaUsers } from "react-icons/fa";

import { createPageMetadata } from "@/lib/metadata";
import { HomeHero } from "./home-hero";
import { ParallaxBackground, ParallaxImage } from "./parallax-background";
import { ScrollCardStrip } from "./scroll-card-strip";

export const metadata = createPageMetadata("Home");

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

export default function Home() {
  const scrollCards = [
    {
      src: "/scroll-cards/card-1.jpg",
      alt: "DPD scroll card 1",
    },
    {
      src: "/scroll-cards/card-2.jpg",
      alt: "DPD scroll card 2",
    },
    {
      src: "/scroll-cards/card-3.jpg",
      alt: "DPD scroll card 3",
    },
    {
      src: "/scroll-cards/card-4.jpg",
      alt: "DPD scroll card 4",
    },
    {
      src: "/scroll-cards/card-5.jpg",
      alt: "DPD scroll card 5",
    },
    {
      src: "/scroll-cards/card-6.jpg",
      alt: "DPD scroll card 6",
    },
    {
      src: "/scroll-cards/card-7.jpg",
      alt: "DPD scroll card 7",
    },
    {
      src: "/scroll-cards/card-8.jpg",
      alt: "DPD scroll card 8",
    },
  ];
  const strategySteps = [
    {
      title: "Discover every team member's persona profile",
      description:
        "Members complete the DPD assessment to uncover their tendencies, building self-awareness and a understanding of how they naturally contribute.",
      Icon: FaFingerprint,
    },
    {
      title: "Create a shared language for better collaboration",
      description:
        "DPD gives teams a simple framework to align in real time - knowing when to dream, when to plan, and when to execute together.",
      Icon: FaUsers,
    },
    {
      title: "Give leaders visibility into team dynamics",
      description:
        "The DPD dashboard helps managers understand team strengths, identify gaps, and guide teams toward stronger communication, better coordination, and faster execution.",
      Icon: FaChartLine,
    },
  ];
  const transformationMetrics = [
    {
      direction: "up",
      value: "75",
      suffix: "%",
      label: "Improvement in team behavior coordination",
    },
    {
      direction: "up",
      value: "50",
      suffix: "%",
      label: "Reduction in decision latency",
    },
    {
      direction: "down",
      value: "60",
      suffix: "%",
      label: "Improvement in communication efficiency",
    },
    {
      direction: "up",
      value: "70",
      suffix: "%",
      label: "Improvement in team alignment",
    },
  ];
  const platformOptions = [
    {
      tag: "SCIENCE",
      title: "Priming Theory",
      image: "/science-cards/card-1.jpg",
      imageAlt: "Priming Theory",
      description:
        "Activated by: Dreaming, Planning, Doing cues, meeting mode priming, and persona prompts.",
    },
    {
      tag: "SCIENCE",
      title: "Game Theory",
      image: "/science-cards/card-2.jpg",
      imageAlt: "Game Theory",
      description:
        "Activated by: shared team cues, coordinated behavior, role clarity, and aligned action.",
    },
    {
      tag: "SCIENCE",
      title: "Neuroplasticity",
      image: "/science-cards/card-3.jpg",
      imageAlt: "Neuroplasticity",
      description:
        "Activated by: repeated persona switching, deliberate practice, and behavioral reinforcement over time.",
    },
    {
      tag: "SCIENCE",
      title: "Embodied Cognition",
      image: "/science-cards/card-4.jpg",
      imageAlt: "Embodied Cognition",
      description:
        "Activated by: physical cues, posture, coins, and behavior-linked action.",
    },
  ];

  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <HomeHero />

      <SectionDivider />

      <section
        id="services"
        className="overflow-x-clip bg-background py-20 text-custom-black"
      >
        <div className={pageInset}>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-24">
            <h2 className="max-w-xl custom-lg-title">
              Dream. Plan. Do. Together in Flow.
            </h2>
            <div className="grid gap-5">
              <p className="max-w-xl text-base font-medium leading-6 text-custom-black/85 sm:text-lg sm:leading-7">
                DPD is not a personality test. It is a persona based behavior
                coordination system that helps people move in sync.
              </p>
              <p className="max-w-xl text-base font-medium leading-6 text-custom-black/85 sm:text-lg sm:leading-7">
                Personality describes tendencies. DPD coordinates behavior.
              </p>
            </div>
          </div>

          <ScrollCardStrip cards={scrollCards} />

          <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_0.95fr] lg:gap-24">
            <div />
            <div className="max-w-xl">
              <h3 className="text-base font-bold">
                DPD offers a more precise path:
              </h3>
              <p className="mt-5 text-base font-medium leading-6 text-custom-black/85 sm:text-lg sm:leading-7">
                Like an orchestra, everyone brings a different instrument. DPD
                gives the team the same sheet music. That is the power of
                DPDing. A word. A sound. A signal. A call to action for
                everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="about" className="bg-background py-20 text-custom-black">
        <div
          className={`${pageInset} grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24`}
        >
          <h2 className="max-w-2xl custom-lg-title">
            Coordinate how your team works - <span className="text-brand-orange">together.</span>
          </h2>

          <div className="relative space-y-14">
            {strategySteps.map((step, index) => (
              <div
                key={step.title}
                className="relative grid gap-5 sm:grid-cols-[3.5rem_1fr_1.1fr] sm:gap-7"
              >
                {index < strategySteps.length - 1 ? (
                  <div
                    className="absolute left-7 top-14 hidden h-[calc(100%+3.5rem)] w-px bg-custom-black/15 sm:block"
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-10 flex size-14 items-center justify-center self-start rounded-full bg-custom-black text-[0.68rem] font-bold tracking-widest text-white">
                  <step.Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="max-w-xs self-start text-lg font-bold leading-6">
                  {step.title}
                </h3>
                <p className="max-w-sm self-start text-sm font-medium leading-5 text-custom-black/80 sm:text-base sm:leading-6">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section
        id="transformation"
        className="relative overflow-hidden bg-custom-black text-white"
      >
        <ParallaxBackground />
        <div className={`relative z-10 ${pageInset} py-18 sm:py-20`}>
          <h2 className="custom-xs-title-medium text-white/95">
            What transformation looks like
          </h2>

          <div className="mt-6 grid border border-white/20 md:grid-cols-2">
            {transformationMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`grid min-h-44 gap-6 border-white/20 p-6 sm:grid-cols-[10rem_1fr] sm:items-start sm:p-8 lg:min-h-52 lg:grid-cols-[14rem_1fr] ${
                  index > 0 ? "border-t md:border-t-0" : ""
                } ${index > 1 ? "md:border-t" : ""} ${
                  index % 2 === 1 ? "md:border-l" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-3 text-3xl font-light text-[#d7ff44]">
                    {metric.direction === "up" ? "\u2191" : "\u2193"}
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
                <p className="max-w-sm text-sm font-bold leading-5 text-white/90 sm:pt-5 sm:text-base">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs font-normal italic leading-5 text-white/70 sm:text-sm">
            *Illustrative model of possibility. Results depend on adoption,
            leadership participation, and consistent DPDing.
          </p>
        </div>
      </section>

      <SectionDivider />

      <section className="bg-background py-20 text-custom-black">
        <div className={pageInset}>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-24">
            <div className="max-w-xl space-y-8">
              <p className="custom-lg-title-bold">
                Some tools describe people and never coordinate behavior.
              </p>
              <p className="custom-lg-title-bold">
                Others structure work and never align behavior.
              </p>
              <p className="custom-lg-title-bold">
                We do both.
              </p>
            </div>

            <div className="grid max-w-xl gap-5 pt-[50px]">
              <p className="text-lg font-normal leading-7 text-custom-black/85 sm:text-xl sm:leading-8">
                Personality assessments help people understand tendencies.
                Process frameworks help teams organize work. DPD fills the
                missing layer: behavior coordination.
              </p>
              <p className="text-lg font-normal leading-7 text-custom-black/85 sm:text-xl sm:leading-8">
                As a Persona Based Behavioral Operating System and GPS, DPD
                helps individuals, coaches, teams, and organizations know when
                to Dream, when to Plan, when to Do, and how to move together in
                flow.
              </p>
              <p className="text-lg font-normal leading-7 text-custom-black/85 sm:text-xl sm:leading-8">
                That is how DPD increases the ROI of the systems you already
                use.
              </p>
            </div>
          </div>

          <div className="relative mt-16 min-h-88 overflow-hidden bg-custom-black shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:min-h-112">
            <ParallaxImage
              src="/bg-2.jpg"
              alt="Abstract orange motion background representing the DPD platform"
              sizes="(min-width: 640px) calc(100vw - 90px), calc(100vw - 40px)"
              imageWrapperClassName="-inset-y-20"
              speed={0.12}
            />
            <div className="absolute inset-x-0 inset-y-5 flex items-center justify-center">
              <div className="flex h-full w-full flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-white/25 bg-white/12 px-8 py-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:gap-x-14 sm:py-10 lg:gap-x-20">
                <p className="shrink-0 leading-[1.12] custom-sm-title-semibold text-white">
                  Science that supports{" "}
                  <span className="text-brand-orange">DPD.</span>
                </p>
                <p className="shrink-0 custom-sm-title-semibold text-white">
                  <span className="text-brand-orange">Behavior coordination</span>{" "}
                  that scales.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {platformOptions.map((option) => (
              <article key={option.title}>
                <div className="relative aspect-[1.06] overflow-hidden bg-custom-black">
                  <Image
                    src={option.image}
                    alt={option.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute left-4 top-4 z-10 rounded-sm bg-custom-black/50 px-3 py-1 text-xs font-bold tracking-widest text-white backdrop-blur-sm">
                    {option.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-medium leading-7 tracking-tight">
                  {option.title}
                </h3>
                <p className="mt-4 text-sm font-medium leading-5 text-custom-black/85 sm:text-base sm:leading-6">
                  {option.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionDivider() {
  return (
    <div className="bg-background" aria-hidden="true">
      <div className={`${pageInset} h-px bg-custom-black/10`} />
    </div>
  );
}
