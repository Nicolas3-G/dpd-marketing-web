import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";

import { createPageMetadata } from "@/lib/metadata";
import {
  AboutScrollCardStrip,
  type AboutScrollCard,
} from "../about-scroll-card-strip";

const aboutScrollCards: AboutScrollCard[] = [
  { src: "/scroll-cards-about/card-1.jpg", alt: "DPD about gallery 1" },
  { src: "/scroll-cards-about/card-2.jpg", alt: "DPD about gallery 2" },
  { src: "/scroll-cards-about/card-3.jpg", alt: "DPD about gallery 3" },
  { src: "/scroll-cards-about/card-4.jpg", alt: "DPD about gallery 4" },
  { src: "/scroll-cards-about/card-5.jpg", alt: "DPD about gallery 5" },
  { src: "/scroll-cards-about/card-6.jpg", alt: "DPD about gallery 6" },
  { src: "/scroll-cards-about/card-7.jpg", alt: "DPD about gallery 7" },
];

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

export const metadata = createPageMetadata("About", {
  description:
    "Learn who we are, what we do, and why behavior coordination for teams matters in the AI era.",
});

export default function AboutPage() {
  return (
    <main className="flex-1 bg-background">
      <section className="overflow-x-clip pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-36">
        <div className={pageInset}>
          <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
            <h1
              className={`${displaySerif.className} max-w-[18ch] custom-lg-title-bold lg:max-w-none`}
            >
              Persona-Based Cognitive Alignment for Teams in the AI Era
            </h1>

            <div className="flex w-full max-w-xl flex-col gap-4 lg:justify-self-end">
              <p className="custom-body text-custom-black">
                DPD works with organizations that need a shared language for how
                people dream, plan, and execute
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="inline-flex h-9 min-h-9 items-center justify-center rounded-full bg-brand-orange px-4 custom-label-bold text-white shadow-[0_8px_20px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
                >
                  Talk to our team
                </Link>
                <Link
                  href="/framework"
                  className="inline-flex h-9 min-h-9 items-center justify-center rounded-full border border-custom-black bg-transparent px-4 custom-label-bold text-custom-black transition hover:-translate-y-0.5 hover:bg-custom-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
                >
                  Explore the platform
                </Link>
              </div>
            </div>
          </div>

          <AboutScrollCardStrip cards={aboutScrollCards} />
        </div>
      </section>

      <section className="bg-[#f9f8f3]">
        <div className={pageInset}>
          <div className="h-px w-full bg-custom-black/6" aria-hidden />
        </div>
        <div
          className={`${pageInset} pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-28 lg:pt-12`}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-x-16 xl:gap-x-24">
            <h2 className="max-w-[20ch] custom-md-title-bold lg:col-start-1 lg:row-start-1 lg:max-w-[22ch]">
              It all started with a simple observation: teams perform
              better when people align how they think.
            </h2>

            <div className="flex flex-col gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-lg lg:pt-0.5">
              <p className="custom-body leading-relaxed text-custom-black">
                DPD began with founder Kokoro Robinson&apos;s study of
                Biological and Cognitive Psychology and one question: what
                if people could intentionally switch into the cognitive
                posture needed to align communication, reduce friction, and
                accelerate execution?
              </p>
              <p className="custom-body leading-relaxed text-custom-black">
                Today, DPD helps individuals, coaches, leaders, and teams
                create cognitive alignment by clarifying the mode of the
                moment — Are we Dreaming, Planning, or Doing? — and
                activating the matching Cognitive Persona Posture: The
                Dreamer Persona, The Planner Persona, or The Doer Persona.
              </p>
              <p className="custom-body leading-relaxed text-custom-black">
                By naming the mode, activating the matching persona, and
                following the rules of the moment, teams move in sync,
                reduce friction, and work in flow.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-custom-black/6 bg-[#ebe8df] lg:col-start-1 lg:row-start-2">
              <Image
                src="/about-page.jpg"
                alt="Team collaborating around a table reviewing plans and sketches"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f0]">
        <div className={pageInset}>
          <div className="h-px w-full bg-custom-black/6" aria-hidden />
        </div>
        <div
          className={`${pageInset} pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-28 lg:pt-10`}
        >
          <div className="flex max-w-4xl flex-col gap-6 sm:gap-8">
            <div className="flex items-center gap-2.5">
              <h2 className="custom-sm-title font-normal leading-none tracking-normal text-brand-orange sm:text-2xl">
                Our mission
              </h2>
            </div>
            <p className="custom-body-bold leading-relaxed text-custom-black">
              DPD helps people and teams build relational awareness,
              recognize what the moment needs, reduce friction, stay in
              sync, and move forward together.
            </p>
            <p className="custom-body-bold leading-relaxed text-custom-black">
              Like an orchestra, teams work better when everyone knows the
              rhythm, their role, and when to come in. DPD gives people a
              shared language for knowing when to dream, when to plan, and
              when to do.
            </p>
            <p className="custom-body-bold leading-relaxed text-custom-black">
              By naming the mode, activating the matching persona, and
              following the rules of the moment, people create greater
              clarity, alignment, and flow.
            </p>
            <p className="custom-body-bold leading-relaxed text-custom-black">
              Dreaming activates The Dreamer Persona.
              <br />
              Planning activates The Planner Persona.
              <br />
              Doing activates The Doer Persona.
            </p>
            <p className="custom-body-bold leading-relaxed text-custom-black">
              That mission shapes how we build our platform, design our
              training, develop our tools, and measure success.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
