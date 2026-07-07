import Image from "next/image";
import { HiLockClosed } from "react-icons/hi";
import { redirect } from "next/navigation";

import { createPageMetadata } from "@/lib/metadata";
import {
  computeScores,
  ContentBlock,
  dominantPersonaFromScores,
  MAX_SECTION_SCORE,
  Persona,
  PERSONA_CHALLENGES,
  PERSONA_CHALLENGES_INTRO,
  PERSONA_PERCEPTION_ITEMS,
  PERSONA_WHAT_REPRESENTS,
  PERSONA_DESCRIPTIONS,
  PERSONA_STRENGTHS,
  PERSONAS,
  QUESTIONS_PER_SEGMENT,
  TEAM_DYNAMICS_CONTENT,
} from "../survey-data";
import { PERCEPTION_ICONS, TEAM_DYNAMICS_ICONS } from "../survey-strength-icons";
import { PersonaNameTyping } from "./persona-name-typing";
import { StrengthsList } from "./strengths-list";
import { UnlockBullets } from "./unlock-bullets";

export const metadata = createPageMetadata("Your DPD Persona", {
  description:
    "Discover your DPD persona and learn how your natural strengths align with the DPD Framework.",
});

const PERSONA_HERO_VIDEO: Partial<Record<Persona, string>> = {
  Dreamer: "/videos/book-hero-video.mp4",
  Planner: "/videos/webinars-hero.mp4",
  Doer: "/videos/science-hero.mp4",
};

export default async function SurveyResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const raw = typeof params.a === "string" ? params.a : null;
  const totalQuestions = PERSONAS.length * QUESTIONS_PER_SEGMENT;

  if (!raw) {
    redirect("/survey");
  }

  let decoded: string;
  try {
    decoded = atob(raw);
  } catch {
    redirect("/survey");
  }

  const parsed = decoded.split(",").map(Number);

  if (parsed.length !== totalQuestions || parsed.some((n) => isNaN(n) || n < 0 || n > 5)) {
    redirect("/survey");
  }

  const scores = computeScores(parsed);
  const dominantPersona = dominantPersonaFromScores(scores);
  const paragraphs = PERSONA_DESCRIPTIONS[dominantPersona];

  return (
    <main>

      <section className="relative isolate flex min-h-[calc(var(--stable-vh,100svh)-4rem)] flex-col justify-center overflow-hidden bg-white">
        {PERSONA_HERO_VIDEO[dominantPersona] ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            src={PERSONA_HERO_VIDEO[dominantPersona]}
          />
        ) : null}
        <div className="relative z-10 mx-5 w-[calc(100%-40px)] py-24 sm:mx-[45px] sm:w-[calc(100%-90px)] lg:py-32">
          <p className="custom-body mb-5 text-custom-black">
            Your current persona posture is
          </p>

          <h1 className="mb-8 custom-lg-title-bold leading-none text-custom-black sm:mb-10">
            <PersonaNameTyping text={dominantPersona} />
          </h1>

          <div className="h-px w-14 bg-brand-orange mb-8 sm:mb-10" />

          <p className="custom-body max-w-2xl text-custom-black">
            {paragraphs[0]}
          </p>
        </div>
      </section>

      <div className="mx-5 w-[calc(100%-40px)] py-24 sm:mx-[45px] sm:w-[calc(100%-90px)] sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_360px] lg:gap-12">

        {/* Left: content */}
        <div>

      <div>
        <div id="section-1" className="flex items-baseline gap-4 mb-8 sm:mb-10">
          <span className="custom-lg-title-bold text-brand-orange">1</span>
          <h2 className="custom-sm-title text-custom-black">Persona Strengths</h2>
        </div>

        <StrengthsList items={PERSONA_STRENGTHS[dominantPersona]} />

        <div className="mt-16 sm:mt-20">
          <h3 className="mb-8 custom-xs-title-bold text-custom-black">Your Stats</h3>
          <div className="relative">
            <div className="select-none blur-md pointer-events-none -mx-5 px-5 sm:-mx-16 sm:px-16" aria-hidden>
              <div className="flex flex-col gap-8">
                {PERSONAS.map((persona: Persona, i: number) => (
                  <div key={persona} className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <p className="custom-body-bold text-custom-black">{persona}</p>
                      <p className="custom-body-bold tabular-nums text-custom-black">
                        {scores[i]} / {MAX_SECTION_SCORE}
                      </p>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-section-gray">
                      <div
                        className="h-full rounded-full bg-brand-orange"
                        style={{ width: `${(scores[i] / MAX_SECTION_SCORE) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl bg-white px-10 py-8 shadow-[0_8px_40px_rgba(51,58,72,0.12)] text-center">
                <p className="mb-1 custom-caption uppercase text-brand-orange tracking-widest">
                  In The App
                </p>
                <p className="mb-6 custom-xxs-title-bold text-custom-black">
                  See your full results in the DPD app
                </p>
                <a
                  href="#unlock-app"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-8 custom-label-bold text-white shadow-[0_8px_24px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
                >
                  Get the App
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <div id="section-2" className="flex items-baseline gap-4 mb-8 sm:mb-10">
          <span className="custom-lg-title-bold text-brand-orange">2</span>
          <h2 className="custom-sm-title text-custom-black">Persona Challenges</h2>
        </div>

        <p className="custom-body max-w-3xl text-custom-black">
          {PERSONA_CHALLENGES_INTRO[dominantPersona]}
        </p>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2">
          {PERSONA_CHALLENGES[dominantPersona].map((item, i) => {
            const mobileAlt = i % 2 === 1;
            const desktopAlt = (Math.floor(i / 2) + (i % 2)) % 2 === 1;
            return (
              <div
                key={item.subtitle}
                className={`group flex flex-col gap-2 rounded-2xl border p-6 sm:p-7 ${
                  mobileAlt
                    ? "border-custom-black bg-custom-black"
                    : "border-custom-black/10 bg-white"
                } ${
                  desktopAlt
                    ? "sm:border-custom-black sm:bg-custom-black"
                    : "sm:border-custom-black/10 sm:bg-white"
                }`}
              >
                <h3
                  className={`custom-body-bold ${mobileAlt ? "text-white" : "text-custom-black"} ${
                    desktopAlt ? "sm:text-white" : "sm:text-custom-black"
                  }`}
                >
                  {item.subtitle}
                </h3>
                <div className="h-px w-full origin-left scale-x-100 bg-brand-orange transition-transform duration-300 ease-out group-hover:scale-x-75" />
                <p
                  className={`custom-body ${mobileAlt ? "text-white" : "text-custom-black"} ${
                    desktopAlt ? "sm:text-white" : "sm:text-custom-black"
                  }`}
                >
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <div id="section-3" className="flex items-baseline gap-4 mb-8 sm:mb-10">
          <span className="custom-lg-title-bold text-brand-orange">3</span>
          <h2 className="custom-sm-title text-custom-black">Unique Value</h2>
        </div>

        <div className="flex flex-col gap-6">
          {PERSONA_WHAT_REPRESENTS[dominantPersona].map((block: ContentBlock, i: number) =>
            Array.isArray(block) ? (
              <div key={i} className="flex flex-col gap-1.5 pl-1">
                {block.map((line: string) => (
                  <p key={line} className="custom-body-bold text-custom-black">
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <p key={i} className="custom-body text-custom-black">
                {block}
              </p>
            )
          )}
        </div>

        <div className="mt-16 sm:mt-20">
          <h3 className="mb-8 custom-xs-title-bold text-custom-black">
            How {dominantPersona}s Are Perceived By Other Personas
          </h3>
          <div className="relative">
            <div className="select-none blur-md pointer-events-none -mx-5 px-5 sm:-mx-16 sm:px-16" aria-hidden>
              <div className="flex flex-col gap-10">
                {PERSONAS.filter((p) => p !== dominantPersona).map((otherPersona) => (
                  <div key={otherPersona} className="flex flex-col gap-4">
                    <p className="custom-body-bold text-custom-black">
                      How {otherPersona}s Often Perceive {dominantPersona}s
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {PERSONA_PERCEPTION_ITEMS.map((item) => {
                        const Icon = PERCEPTION_ICONS[item.icon];
                        return (
                          <div
                            key={item.label}
                            className="flex items-center gap-4 rounded-xl border border-custom-black/10 bg-white p-4"
                          >
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
                              <Icon className="size-5" aria-hidden />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <p className="custom-body-bold text-custom-black">{item.label}</p>
                              <p className="custom-body text-custom-black">{item.body}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl bg-white px-10 py-8 shadow-[0_8px_40px_rgba(51,58,72,0.12)] text-center">
                <p className="mb-1 custom-caption uppercase text-brand-orange tracking-widest">
                  In The App
                </p>
                <p className="mb-6 custom-xxs-title-bold text-custom-black">
                  See your full results in the DPD app
                </p>
                <a
                  href="#unlock-app"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-8 custom-label-bold text-white shadow-[0_8px_24px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
                >
                  Get the App
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <div id="section-4" className="flex items-baseline gap-4 mb-8 sm:mb-10">
          <span className="custom-lg-title-bold text-brand-orange">4</span>
          <h2 className="custom-sm-title text-custom-black">Team Dynamics</h2>
        </div>

        <div className="relative">
          <div className="select-none blur-md pointer-events-none -mx-5 px-5 sm:-mx-16 sm:px-16" aria-hidden>
            <p className="custom-body max-w-3xl text-custom-black">
              {TEAM_DYNAMICS_CONTENT.intro}
            </p>

            <div className="mt-8 flex flex-col gap-10 sm:mt-10">
              {TEAM_DYNAMICS_CONTENT.groups.map((group) => (
                <div key={group.lead} className="flex flex-col gap-6">
                  <p className="custom-body text-custom-black">{group.lead}</p>
                  <div className="grid gap-x-6 gap-y-10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => {
                      const Icon = TEAM_DYNAMICS_ICONS[item.icon];
                      return (
                        <div
                          key={item.title}
                          className="relative rounded-2xl bg-custom-black px-6 pb-6 pt-10"
                        >
                          <div className="absolute -top-7 left-6 flex size-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-[0_8px_20px_var(--brand-orange-glow)]">
                            <Icon className="size-6" aria-hidden />
                          </div>
                          <h3 className="custom-body-bold text-white">{item.title}</h3>
                          <p className="mt-2 custom-body text-white/70">{item.body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-white px-10 py-8 shadow-[0_8px_40px_rgba(51,58,72,0.12)] text-center">
              <p className="mb-1 custom-caption uppercase text-brand-orange tracking-widest">
                In The App
              </p>
              <p className="mb-6 custom-xxs-title-bold text-custom-black">
                See your full results in the DPD app
              </p>
              <a
                href="#unlock-app"
                className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-8 custom-label-bold text-white shadow-[0_8px_24px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
              >
                Get the App
              </a>
            </div>
          </div>
        </div>
      </div>

        </div>{/* end left column */}

        {/* Right: sticky sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
          <div className="overflow-hidden rounded-2xl border border-custom-black/10 bg-white">
            <div className="border-b border-custom-black/10 px-6 py-5">
              <p className="custom-label text-light mb-1">Your current persona</p>
              <p className="custom-xxs-title-bold text-custom-black">{dominantPersona}</p>
            </div>

            <div className="border-b border-custom-black/10 px-6 py-4">
              <p className="custom-caption uppercase text-gray-light">On This Page</p>
            </div>

            <div className="divide-y divide-custom-black/6">
              {[
                { num: 1, title: "Persona Strengths" },
                { num: 2, title: "Persona Challenges" },
                { num: 3, title: "Unique Value" },
                { num: 4, title: "Team Dynamics" },
              ].map(({ num, title }) => (
                <a
                  key={num}
                  href={`#section-${num}`}
                  className="flex items-baseline gap-3 px-6 py-4 transition hover:bg-section-gray"
                >
                  <span className="custom-label-bold text-brand-orange">{num}.</span>
                  <span className="custom-label text-custom-black">{title}</span>
                </a>
              ))}
            </div>

            <div className="border-t border-custom-black/10 px-6 py-4">
              <button
                type="button"
                className="flex w-full items-center gap-2.5 transition hover:opacity-70"
              >
                <HiLockClosed className="shrink-0 text-brand-orange" />
                <span className="custom-label-bold text-custom-black">Get full results in the app</span>
              </button>
            </div>
          </div>
          </div>
        </div>

        </div>{/* end grid */}
      </div>

      <section id="unlock-app" className="bg-background py-20 sm:py-24">
        <div className="mx-5 sm:mx-[45px]">
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_24px_70px_rgba(0,0,0,0.08)] lg:grid-cols-[1fr_520px]">
            <div className="p-8 sm:p-12 lg:p-16">
              <span className="inline-flex rounded-full bg-brand-orange/10 px-4 py-1.5 custom-caption-bold uppercase text-brand-orange">
                Unlock Now
              </span>

              <h2 className="mt-6 max-w-2xl custom-md-title-bold text-custom-black">
                Don&rsquo;t Forget Your Secondary and Tertiary Personas
              </h2>

              <p className="mt-6 max-w-2xl custom-body text-custom-black">
                This overview reflects your dominant persona posture. But no
                one operates from a single mode all the time — your full
                results reveal how your secondary and tertiary personas show
                up, when they activate, and how they shape the way you think,
                lead, and collaborate.
              </p>

              <p className="mt-5 hidden max-w-2xl custom-body text-custom-black sm:block">
                In the app, you&rsquo;ll take an{" "}
                <span className="custom-body-bold">expanded, more accurate version of this survey</span>{" "}
                to <span className="custom-body-bold">view the full details of your persona readout</span>,
                including your secondary and tertiary personas. You can also{" "}
                <span className="custom-body-bold">share your results with your team</span> via
                DPD meeting cards, so everyone knows the right posture to bring
                into the room.
              </p>
            </div>

            <div className="flex flex-col items-start justify-center bg-custom-black p-8">
              <p className="max-w-[26rem] custom-md-title-bold text-left text-white">
                Unlock your full results{" "}
                <span className="text-brand-orange">in the app</span>
              </p>

              <UnlockBullets
                items={[
                  "View the details of your full persona readout.",
                  "Share results with your team via DPD meeting cards.",
                  "Unlock insights into your secondary and tertiary personas.",
                ]}
              />

              <div className="mt-5 flex flex-row flex-wrap items-center justify-start gap-3">
                <a href="#" className="transition hover:-translate-y-0.5 hover:opacity-90">
                  <Image
                    src="/store-badges/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                    alt="Download on the App Store"
                    width={120}
                    height={40}
                    className="h-11 w-auto"
                  />
                </a>
                <a href="#" className="transition hover:-translate-y-0.5 hover:opacity-90">
                  <Image
                    src="/store-badges/GetItOnGooglePlay_Badge_Web_color_English.svg"
                    alt="Get it on Google Play"
                    width={239}
                    height={71}
                    className="h-11 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
