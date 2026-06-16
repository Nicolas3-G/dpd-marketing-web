import { HiLockClosed } from "react-icons/hi";
import { redirect } from "next/navigation";

import { createPageMetadata } from "@/lib/metadata";
import {
  computeScores,
  ContentBlock,
  dominantPersonaFromScores,
  MAX_SECTION_SCORE,
  Persona,
  PERSONA_AT_A_GLANCE,
  PERSONA_CORE_ROLE,
  PERSONA_WHAT_REPRESENTS,
  PERSONA_CORE_QUESTION_BODY,
  PERSONA_CORE_QUESTIONS,
  PERSONA_DESCRIPTIONS,
  PERSONAS,
  QUESTIONS_PER_SEGMENT,
} from "../survey-data";

export const metadata = createPageMetadata("Your DPD Persona", {
  description:
    "Discover your DPD persona and learn how your natural strengths align with the DPD Framework.",
});

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

      <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden bg-white">
        <div className="mx-5 w-[calc(100%-40px)] py-24 sm:mx-[45px] sm:w-[calc(100%-90px)] lg:py-32">
          <p className="custom-body mb-5 text-custom-black">
            Your current persona posture is
          </p>

          <h1 className="mb-8 custom-lg-title-bold leading-none text-custom-black sm:mb-10">
            {dominantPersona}
          </h1>

          <div className="h-px w-14 bg-brand-orange mb-8 sm:mb-10" />

          <p className="custom-body max-w-2xl text-custom-black">
            {paragraphs[0]}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-custom-black/10" />
      </section>

      <div className="mx-5 w-[calc(100%-40px)] py-24 sm:mx-[45px] sm:w-[calc(100%-90px)] sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_360px] lg:gap-12">

        {/* Left: content */}
        <div>

      <div className="mb-16 flex flex-col gap-5 sm:mb-20">
        {paragraphs.map((text, i) => (
          <p key={i} className="custom-body text-custom-black">
            {text}
          </p>
        ))}
      </div>

      <div className="mt-16 sm:mt-20">
        <div id="section-1" className="flex items-baseline gap-4 mb-8 sm:mb-10">
          <span className="custom-lg-title-bold text-brand-orange">1</span>
          <h2 className="custom-sm-title text-custom-black">The Core Question</h2>
        </div>

        <blockquote className="border-l-4 border-brand-orange pl-6 sm:pl-8">
          <p className="custom-md-title text-custom-black">
            &ldquo;{PERSONA_CORE_QUESTIONS[dominantPersona]}&rdquo;
          </p>
        </blockquote>

        <div className="mt-10 flex flex-col gap-6 sm:mt-12">
          {PERSONA_CORE_QUESTION_BODY[dominantPersona].map((block: ContentBlock, i: number) =>
            Array.isArray(block) ? (
              <div key={i} className="flex flex-col gap-1.5 pl-1">
                {block.map((line: string) => (
                  <p key={line} className="custom-body-bold text-custom-black">
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <div key={i} className="flex flex-col gap-4">
                {block.split("\n\n").map((para: string) => (
                  <p key={para} className="custom-body text-custom-black">
                    {para}
                  </p>
                ))}
              </div>
            )
          )}
        </div>

        <div className="mt-16 sm:mt-20">
          <h3 className="mb-8 custom-xs-title-bold text-custom-black">Your Stats</h3>
          <div className="relative">
            <div className="select-none blur-sm pointer-events-none -mx-8 px-8 sm:-mx-16 sm:px-16" aria-hidden>
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
                  Premium
                </p>
                <p className="mb-6 custom-xxs-title-bold text-custom-black">
                  Full results are locked
                </p>
                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-8 custom-label-bold text-white shadow-[0_8px_24px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
                >
                  Unlock Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <div id="section-2" className="flex items-baseline gap-4 mb-8 sm:mb-10">
          <span className="custom-lg-title-bold text-brand-orange">2</span>
          <h2 className="custom-sm-title text-custom-black">At a Glance</h2>
        </div>

        {(() => {
          const [header, ...rows] = PERSONA_AT_A_GLANCE[dominantPersona];
          return (
            <>
              <div className="mb-3 flex gap-6 px-6 sm:px-8">
                <p className="w-40 shrink-0 custom-label text-gray-light sm:w-48">{header.dimension}</p>
                <p className="custom-label text-gray-light">{header.value}</p>
              </div>
              <div className="overflow-hidden border border-custom-black/10">
                {rows.map((row, i) => (
                  <div
                    key={row.dimension}
                    className={`flex gap-6 px-6 py-4 sm:px-8 sm:py-5 ${
                      i !== rows.length - 1 ? "border-b border-custom-black/[0.06]" : ""
                    } ${i % 2 === 0 ? "bg-white" : "bg-[#faf8f5]"}`}
                  >
                    <p className="w-40 shrink-0 custom-label text-light sm:w-48">{row.dimension}</p>
                    <p className="custom-label-bold text-custom-black">{row.value}</p>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
      </div>

      <div className="mt-16 sm:mt-20">
        <div id="section-3" className="flex items-baseline gap-4 mb-8 sm:mb-10">
          <span className="custom-lg-title-bold text-brand-orange">3</span>
          <h2 className="custom-sm-title text-custom-black">What the Persona Represents</h2>
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
      </div>

      <div className="mt-16 sm:mt-20">
        <div id="section-4" className="flex items-baseline gap-4 mb-8 sm:mb-10">
          <span className="custom-lg-title-bold text-brand-orange">4</span>
          <h2 className="custom-sm-title text-custom-black">The Core Role</h2>
        </div>

        <div className="flex flex-col gap-6">
          {PERSONA_CORE_ROLE[dominantPersona].map((block: ContentBlock, i: number) =>
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
                { num: 1, title: "The Core Question" },
                { num: 2, title: "At a Glance" },
                { num: 3, title: "What the Persona Represents" },
                { num: 4, title: "The Core Role" },
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
                <span className="custom-label-bold text-custom-black">Unlock full results</span>
              </button>
            </div>
          </div>
          </div>
        </div>

        </div>{/* end grid */}
      </div>
    </main>
  );
}
