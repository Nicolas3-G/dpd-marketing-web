import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";

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

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-background">
      <section className="overflow-x-clip pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-36">
        <div className={pageInset}>
          <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
            <h1
              className={`${displaySerif.className} max-w-[18ch] text-[64px] leading-[1.08] tracking-[-0.02em] text-[#111111] lg:max-w-none`}
            >
              Behavior coordination for teams in the AI era.
            </h1>

            <div className="flex w-full max-w-xl flex-col gap-4 lg:justify-self-end">
              <p className="text-base font-medium leading-tight text-[#111111] sm:text-lg">
                DPD works with organizations that need a shared language for how
                people dream, plan, and execute
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/#contact"
                  className="inline-flex h-9 min-h-9 items-center justify-center rounded-full bg-[#b9075c] px-4 text-xs font-semibold leading-tight text-white transition hover:-translate-y-0.5 hover:bg-[#a00652] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
                >
                  Talk to our team
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex h-9 min-h-9 items-center justify-center rounded-full border border-[#111111] bg-transparent px-4 text-xs font-semibold leading-tight text-[#111111] transition hover:-translate-y-0.5 hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
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
          <div className="h-px w-full bg-black/6" aria-hidden />
        </div>
        <div
          className={`${pageInset} pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-28 lg:pt-12`}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-x-16 xl:gap-x-24">
            <h2 className="max-w-[20ch] text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] text-[#111111] sm:text-[2.5rem] lg:col-start-1 lg:row-start-1 lg:max-w-[22ch] lg:text-[2.75rem]">
              It all started with teams that could not stay in sync.
            </h2>

            <p className="text-base font-normal leading-relaxed text-[#111111]/85 sm:text-[17px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-lg lg:pt-0.5">
              DPD grew from watching smart groups stall: same goals, different
              instincts for when to dream, plan, and ship. Today, as tools and
              expectations change by the week, that problem only gets louder.
              This section is placeholder copy you can replace with your origin
              story, positioning, and proof points, grounded in how you help
              leaders coordinate behavior at scale.
            </p>

            <div
              className="flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-2xl border border-black/6 bg-[#ebe8df] text-sm font-medium tracking-wide text-[#111111]/40 lg:col-start-1 lg:row-start-2"
              aria-hidden
            >
              Image placeholder
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f0]">
        <div className={pageInset}>
          <div className="h-px w-full bg-black/6" aria-hidden />
        </div>
        <div
          className={`${pageInset} pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-28 lg:pt-10`}
        >
          <div className="flex max-w-4xl flex-col gap-6 sm:gap-8">
            <div className="flex items-center gap-2.5 text-[#111111]">
              <span
                className="mt-0.5 size-1 shrink-0 rounded-full bg-[#111111]"
                aria-hidden
              />
              <h2 className="text-sm font-normal leading-none tracking-normal">
                Our mission
              </h2>
            </div>
            <p className="text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] text-[#111111] sm:text-2xl sm:leading-[1.2] lg:text-[1.75rem] lg:leading-[1.22] xl:text-[2rem]">
              DPD exists to help people work with greater clarity about how they
              naturally dream, plan, and execute, and to help organizations turn
              that shared language into steadier coordination and performance.
              That mission shows up in how we build the assessment, how teams
              use the dashboard, and how leaders measure progress together.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
