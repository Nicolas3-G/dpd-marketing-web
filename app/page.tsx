import Image from "next/image";
import Link from "next/link";
import { FaChartLine, FaFingerprint, FaUsers } from "react-icons/fa";

import { createPageMetadata } from "@/lib/metadata";
import { HomeHero } from "./home-hero";
import { ParallaxImage } from "./parallax-background";
import { ScienceBanner } from "./science-banner";
import { ScrollCardStrip } from "./scroll-card-strip";
import { TransformationSection } from "./transformation-section";

export const metadata = createPageMetadata("Home", {
  description:
    "DPD Framework helps teams coordinate behavior, build alignment, and perform with clarity and purpose in the AI era.",
});

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
      title: "Understand each team member's current thinking posture.",
      description:
        "Members complete the DPD Persona Survey to identify their current posture, build self-awareness, and understand how they can contribute with greater clarity and intention.",
      Icon: FaFingerprint,
    },
    {
      title: "Create a shared language for how your team works together.",
      description:
        "DPD gives teams a simple framework to align in real time - knowing when to dream, when to plan, and when to execute together.",
      Icon: FaUsers,
    },
    {
      title: "Help leaders see team posture and alignment gaps.",
      description:
        "The DPD Team Persona Posture Report helps managers see how the team is showing up, identify alignment gaps, and guide stronger communication, coordination, and execution.",
      Icon: FaChartLine,
    },
  ];
  const platformOptions = [
    {
      tag: "SCIENCE",
      title: "Flow Theory",
      image: "/science-cards/card-1.jpg",
      imageAlt: "Flow Theory",
      description:
        "Reinforced through DPD: clear meeting modes, persona alignment, shared purpose, and synchronized action.",
      href: "/science?tab=Flow+Theory&section=research-why#research-why",
    },
    {
      tag: "SCIENCE",
      title: "Game Theory",
      image: "/science-cards/card-2.jpg",
      imageAlt: "Game Theory",
      description:
        "How DPD Applies It: DPD helps teams create shared cues, clarify roles, coordinate action, and move toward the same outcome together.",
      href: "/science?tab=Game+Theory&section=research-why-reversed#research-why-reversed",
    },
    {
      tag: "SCIENCE",
      title: "Neuroplasticity",
      image: "/science-cards/card-3.jpg",
      imageAlt: "Neuroplasticity",
      description:
        "Reinforced through DPD: by repeated cognitive posture switching, deliberate practice, and new patterns of thinking over time.",
      href: "/science?tab=Neuroplasticity&section=research-why#research-why",
    },
    {
      tag: "SCIENCE",
      title: "Embodied Cognition",
      image: "/science-cards/card-4.jpg",
      imageAlt: "Embodied Cognition",
      description:
        "Reinforced through DPD: physical cues, posture, coins, and behavior-linked action.",
      href: "/science?tab=Embodied+Cognition&section=research-why-reversed#research-why-reversed",
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
              <p className="max-w-xl custom-body text-custom-black">
                DPD is not a personality test. It is a Persona-Based Cognitive
                Alignment practice that helps people think, work, and move
                together in sync.
              </p>
              <p className="max-w-xl custom-body text-custom-black">
                Personality describes tendencies. DPD aligns people in real time.
              </p>
            </div>
          </div>

          <ScrollCardStrip cards={scrollCards} />

          <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_0.95fr] lg:gap-24">
            <div />
            <div className="max-w-xl">
              <h3 className="custom-body-bold">
                DPD offers a more precise path:
              </h3>
              <p className="mt-5 custom-body text-custom-black">
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
            Align how your team works{" "}
            <span className="text-brand-orange">together.</span>
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
                <h3 className="max-w-xs self-start custom-body-bold">
                  {step.title}
                </h3>
                <p className="max-w-sm self-start custom-body text-custom-black">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <TransformationSection />

      <SectionDivider />

      <section className="bg-background py-20 text-custom-black">
        <div className={pageInset}>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-24">
            <div className="max-w-xl space-y-8">
              <p className="custom-lg-title-bold">
                Most tools describe people. DPD helps people align in real time.
              </p>
              <p className="custom-lg-title-bold">
                Other tools structure the work. DPD aligns the people doing it.
              </p>
            </div>

            <div className="grid max-w-xl gap-5 pt-[50px]">
              <p className="custom-body text-custom-black">
                Personality assessments help people understand tendencies.
                Process frameworks help teams organize work. DPD fills the
                missing layer between the two: cognitive alignment in real
                time.
              </p>
              <p className="custom-body text-custom-black">
                DPD is a Persona-Based Cognitive Alignment practice that helps
                individuals, coaches, teams, and organizations recognize when
                to dream, when to plan, when to do, and how to move together
                in flow.
              </p>
              <p className="custom-body text-custom-black">
                That is how DPD increases the ROI of the systems you already
                use.
              </p>
            </div>
          </div>

          <ScienceBanner />

          <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {platformOptions.map((option) => (
              <Link key={option.title} href={option.href} className="group">
                <article>
                  <div className="relative aspect-[1.06] overflow-hidden bg-custom-black">
                    <Image
                      src={option.image}
                      alt={option.imageAlt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute left-4 top-4 z-10 rounded-sm bg-custom-black/50 px-3 py-1 custom-label-bold text-white backdrop-blur-sm tracking-widest">
                      {option.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 custom-xxs-title leading-7 transition group-hover:text-brand-orange">
                    {option.title}
                  </h3>
                  <p className="mt-4 custom-body text-custom-black">
                    {(() => {
                      const prefixMatch = option.description.match(/^[^:]+:/);
                      if (!prefixMatch) return option.description;
                      const prefix = prefixMatch[0];
                      return (
                        <>
                          <span className="custom-body-bold text-brand-orange">{prefix}</span>
                          {option.description.slice(prefix.length)}
                        </>
                      );
                    })()}
                  </p>
                </article>
              </Link>
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
