"use client";

import { useState } from "react";

import { SLIDE_MS, useSlideCarousel } from "../framework/use-slide-carousel";

const surveyQuestions = [
  "I often find myself imagining new possibilities and creative ideas.",
  "I prefer to map out details and timelines before taking action.",
  "I feel most energized when I am actively executing and finishing tasks.",
  "I enjoy exploring many options before committing to a single direction.",
  "I naturally help others align on clear next steps and ownership.",
  "I tend to pause and reflect before committing to a major decision.",
  "I like breaking complex goals into clear milestones and checkpoints.",
  "I stay focused on outcomes even when the work becomes repetitive.",
  "I adapt quickly when priorities shift on a team or project.",
  "I communicate expectations clearly so others know what success looks like.",
  "I draw energy from brainstorming sessions and open-ended exploration.",
  "I value structure and predictability when coordinating with others.",
  "I prefer to test ideas in the real world rather than over-planning.",
  "I notice patterns and connections that others sometimes overlook.",
  "I take ownership when something needs to get done, even without being asked.",
] as const;

const SCALE_OPTIONS = [
  { value: 0, lines: ["Strongly", "Disagree"] },
  { value: 1, lines: ["Disagree"] },
  { value: 2, lines: ["Neutral"] },
  { value: 3, lines: ["Agree"] },
  { value: 4, lines: ["Strongly", "Agree"] },
] as const;

const PROGRESS_BAR_COUNT = 3;
const QUESTIONS_PER_SEGMENT = 5;
const TOTAL_SURVEY_QUESTIONS = PROGRESS_BAR_COUNT * QUESTIONS_PER_SEGMENT;
const RESULTS_PAGE_INDEX = PROGRESS_BAR_COUNT;
const SLIDE_COUNT = PROGRESS_BAR_COUNT + 1;

const questionPages = Array.from({ length: PROGRESS_BAR_COUNT }, (_, pageIndex) =>
  surveyQuestions.slice(
    pageIndex * QUESTIONS_PER_SEGMENT,
    pageIndex * QUESTIONS_PER_SEGMENT + QUESTIONS_PER_SEGMENT,
  ),
);

function questionAnchorId(pageIndex: number, indexWithinPage: number) {
  return `survey-question-${pageIndex}-${indexWithinPage}`;
}

function getSlideAnimationDelay() {
  if (typeof window === "undefined") {
    return SLIDE_MS;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : SLIDE_MS;
}

function scrollToQuestion(pageIndex: number, indexWithinPage: number) {
  const element = document.getElementById(
    questionAnchorId(pageIndex, indexWithinPage),
  );

  if (!element) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  element.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "center",
  });
}

function scrollToQuestionAfterSlide(
  pageIndex: number,
  indexWithinPage: number,
) {
  window.setTimeout(() => {
    scrollToQuestion(pageIndex, indexWithinPage);
  }, getSlideAnimationDelay());
}

type QuestionFocusState = "active" | "completed" | "upcoming";

function getQuestionFocusState(
  pageIndex: number,
  indexWithinPage: number,
  answers: Record<number, number | null>,
): QuestionFocusState {
  const pageOffset = pageIndex * QUESTIONS_PER_SEGMENT;

  let firstUnanswered = QUESTIONS_PER_SEGMENT;
  for (let i = 0; i < QUESTIONS_PER_SEGMENT; i++) {
    if (answers[pageOffset + i] === null) {
      firstUnanswered = i;
      break;
    }
  }

  if (indexWithinPage < firstUnanswered) {
    return "completed";
  }

  if (
    indexWithinPage === firstUnanswered &&
    firstUnanswered < QUESTIONS_PER_SEGMENT
  ) {
    return "active";
  }

  return "upcoming";
}

function segmentFillPercent(answeredCount: number, segmentIndex: number) {
  const segmentStart = segmentIndex * QUESTIONS_PER_SEGMENT;
  const answeredInSegment = Math.max(
    0,
    Math.min(answeredCount - segmentStart, QUESTIONS_PER_SEGMENT),
  );

  return (answeredInSegment / QUESTIONS_PER_SEGMENT) * 100;
}

function SurveyProgressBar({
  answers,
}: {
  answers: Record<number, number | null>;
}) {
  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const percent = Math.round((answeredCount / TOTAL_SURVEY_QUESTIONS) * 100);

  return (
    <div className="mb-10 flex items-center gap-4 sm:mb-12 sm:gap-5">
      <div
        className="flex flex-1 items-center gap-2 sm:gap-2.5"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Survey progress"
      >
        {Array.from({ length: PROGRESS_BAR_COUNT }, (_, index) => {
          const fillPercent = segmentFillPercent(answeredCount, index);

          return (
            <div
              key={index}
              className="h-3 flex-1 overflow-hidden rounded-full bg-section-gray sm:h-3.5"
            >
              <div
                className="h-full rounded-full bg-brand-orange transition-[width] duration-200"
                style={{ width: `${fillPercent}%` }}
              />
            </div>
          );
        })}
      </div>
      <span className="shrink-0 text-base font-normal tabular-nums text-custom-black sm:text-lg">
        {percent}%
      </span>
    </div>
  );
}

function SurveyQuestion({
  questionId,
  statement,
  value,
  onChange,
  focusState,
}: {
  questionId: number;
  statement: string;
  value: number | null;
  onChange: (index: number) => void;
  focusState: QuestionFocusState;
}) {
  const isUpcoming = focusState === "upcoming";

  return (
    <fieldset className="border-0 p-0" disabled={isUpcoming}>
      <legend
        id={`question-${questionId}`}
        className={`mb-6 w-full text-left text-xl font-normal leading-snug sm:text-[1.65rem] sm:leading-tight ${
          isUpcoming ? "text-custom-black/30" : "text-custom-black"
        }`}
      >
        {statement}
      </legend>

      <div
        className={`px-6 py-4 sm:px-8 sm:py-5 ${
          isUpcoming
            ? "bg-[#ececec]"
            : "bg-white shadow-[0_4px_24px_rgba(51,58,72,0.06)]"
        }`}
      >
        <p
          className={`mb-5 text-sm ${
            isUpcoming ? "text-[#b8b8b8]" : "text-text-light"
          }`}
        >
          Select One
        </p>

        <div
          role="radiogroup"
          aria-labelledby={`question-${questionId}`}
          aria-disabled={isUpcoming}
          className="grid grid-cols-5 gap-2 sm:gap-4"
        >
          {SCALE_OPTIONS.map(({ value: optionValue, lines }) => {
            const selected = value === optionValue;
            const label = lines.join(" ");

            return (
              <button
                key={optionValue}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={label}
                disabled={isUpcoming}
                onClick={() => onChange(optionValue)}
                className="group flex w-full cursor-pointer flex-col items-center gap-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black disabled:cursor-not-allowed sm:gap-4"
              >
                <span
                  aria-hidden
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border-[3px] transition-colors sm:size-6 ${
                    isUpcoming
                      ? "border-[#c8c8c8]"
                      : selected
                        ? "border-brand-orange"
                        : "border-custom-black group-hover:border-brand-orange"
                  }`}
                >
                  {selected ? (
                    <span
                      className={`size-3.5 rounded-full sm:size-4 ${
                        isUpcoming ? "bg-[#c8c8c8]" : "bg-brand-orange"
                      }`}
                    />
                  ) : null}
                </span>
                <span
                  className={`text-center text-xs leading-tight transition-colors sm:text-sm ${
                    isUpcoming
                      ? "text-[#b0b0b0]"
                      : selected
                        ? "text-brand-orange"
                        : "text-custom-black/85 group-hover:text-brand-orange"
                  }`}
                >
                  {lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}

function SurveyPageIntro() {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="text-[1.75rem] font-normal leading-tight text-brand-orange sm:text-4xl sm:leading-[1.1]">
        How does each of the following
      </p>
      <p className="text-[1.75rem] font-normal leading-tight text-brand-orange sm:text-4xl sm:leading-[1.1]">
        statements describe you?
      </p>
    </div>
  );
}

function SurveyQuestionPage({
  pageIndex,
  answers,
  onAnswer,
  registerAnchors = true,
}: {
  pageIndex: number;
  answers: Record<number, number | null>;
  onAnswer: (questionIndex: number, option: number) => void;
  registerAnchors?: boolean;
}) {
  const pageOffset = pageIndex * QUESTIONS_PER_SEGMENT;
  const questions = questionPages[pageIndex];

  return (
    <div className="flex flex-col">
      <SurveyPageIntro />

      {questions.map((statement, index) => {
        const questionId = pageOffset + index;

        return (
          <div
            key={questionId}
            id={
              registerAnchors
                ? questionAnchorId(pageIndex, index)
                : undefined
            }
            className={index === 0 ? "pb-10 sm:pb-14" : "py-10 sm:py-14"}
          >
            <SurveyQuestion
              questionId={questionId}
              statement={statement}
              value={answers[questionId] ?? null}
              focusState={getQuestionFocusState(
                pageIndex,
                index,
                answers,
              )}
              onChange={(option) => onAnswer(questionId, option)}
            />
          </div>
        );
      })}
    </div>
  );
}

function SurveyResultsPage() {
  return (
    <div className="flex min-h-[200px] items-center justify-center py-16 sm:min-h-[240px] sm:py-20">
      <h2 className="text-4xl font-bold tracking-tight text-custom-black sm:text-5xl">
        Results
      </h2>
    </div>
  );
}

function SurveySlideContent({
  pageIndex,
  answers,
  onAnswer,
  registerAnchors = true,
}: {
  pageIndex: number;
  answers: Record<number, number | null>;
  onAnswer: (questionIndex: number, option: number) => void;
  registerAnchors?: boolean;
}) {
  if (pageIndex === RESULTS_PAGE_INDEX) {
    return <SurveyResultsPage />;
  }

  return (
    <SurveyQuestionPage
      pageIndex={pageIndex}
      answers={answers}
      onAnswer={onAnswer}
      registerAnchors={registerAnchors}
    />
  );
}

function SurveyPageHeightSizer() {
  return (
    <div
      className="pointer-events-none grid select-none opacity-0"
      aria-hidden
      inert
    >
      {Array.from({ length: SLIDE_COUNT }, (_, pageIndex) => (
        <div key={`sizer-${pageIndex}`} className="col-start-1 row-start-1">
          <SurveySlideContent
            pageIndex={pageIndex}
            answers={{}}
            onAnswer={() => {}}
            registerAnchors={false}
          />
        </div>
      ))}
    </div>
  );
}

export function SurveyAssessment() {
  const [answers, setAnswers] = useState<Record<number, number | null>>(() =>
    Object.fromEntries(
      Array.from({ length: TOTAL_SURVEY_QUESTIONS }, (_, i) => [i, null]),
    ),
  );
  const [activePage, setActivePage] = useState(0);

  const { displayIndex, isSliding, transition, enterX, exitX, animate } =
    useSlideCarousel(activePage, SLIDE_COUNT);

  const isResultsPage = activePage === RESULTS_PAGE_INDEX;
  const isQuestionPage = activePage < PROGRESS_BAR_COUNT;
  const pageOffset = activePage * QUESTIONS_PER_SEGMENT;
  const isCurrentPageComplete =
    isQuestionPage &&
    Array.from(
      { length: QUESTIONS_PER_SEGMENT },
      (_, index) => answers[pageOffset + index] !== null,
    ).every(Boolean);
  const isFirstPage = activePage === 0;
  const isLastQuestionPage = activePage === PROGRESS_BAR_COUNT - 1;

  const setAnswer = (questionIndex: number, option: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }));

    const pageIndex = Math.floor(questionIndex / QUESTIONS_PER_SEGMENT);
    const indexWithinPage = questionIndex % QUESTIONS_PER_SEGMENT;
    const nextIndexWithinPage = indexWithinPage + 1;

    if (nextIndexWithinPage >= QUESTIONS_PER_SEGMENT) {
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToQuestion(pageIndex, nextIndexWithinPage);
      });
    });
  };

  const scrollToAssessment = () => {
    document.getElementById("assessment")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePrevious = () => {
    if (isFirstPage || isSliding) {
      return;
    }

    setActivePage((page) => page - 1);
    scrollToAssessment();
  };

  const handleNext = () => {
    if (!isCurrentPageComplete || isLastQuestionPage || isSliding) {
      return;
    }

    const nextPage = activePage + 1;
    setActivePage(nextPage);
    scrollToQuestionAfterSlide(nextPage, 0);
  };

  const handleFinish = () => {
    if (!isCurrentPageComplete || !isLastQuestionPage || isSliding) {
      return;
    }

    setActivePage(RESULTS_PAGE_INDEX);
    scrollToAssessment();
  };

  return (
    <section
      id="assessment"
      className="mx-auto mt-16 max-w-4xl scroll-mt-28 sm:mt-20"
    >
      <SurveyProgressBar answers={answers} />

      {!isFirstPage ? (
        <div className="mb-6 mt-4 sm:mb-8 sm:mt-5">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={isSliding}
            className="inline-flex h-11 items-center justify-center rounded-full border border-custom-black/20 px-6 text-sm font-semibold text-custom-black transition hover:border-custom-black/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
        </div>
      ) : null}

      <div className="relative">
        <SurveyPageHeightSizer />

        <div className="absolute inset-0 overflow-hidden">
          {isSliding && transition ? (
            <>
              <div
                className="absolute inset-0 transition-transform ease-in-out motion-reduce:transition-none"
                style={{
                  transform: `translateX(${exitX}%)`,
                  transitionDuration: animate ? `${SLIDE_MS}ms` : "0ms",
                }}
                aria-hidden
              >
                <SurveySlideContent
                  pageIndex={transition.from}
                  answers={answers}
                  onAnswer={setAnswer}
                />
              </div>

              <div
                className="absolute inset-0 transition-transform ease-in-out motion-reduce:transition-none"
                style={{
                  transform: `translateX(${enterX}%)`,
                  transitionDuration: animate ? `${SLIDE_MS}ms` : "0ms",
                }}
              >
                <SurveySlideContent
                  pageIndex={displayIndex}
                  answers={answers}
                  onAnswer={setAnswer}
                />
              </div>
            </>
          ) : (
            <SurveySlideContent
              pageIndex={displayIndex}
              answers={answers}
              onAnswer={setAnswer}
            />
          )}
        </div>
      </div>

      {isQuestionPage ? (
        <div className="mt-4 flex justify-center sm:mt-6">
          {isLastQuestionPage ? (
            <button
              type="button"
              onClick={handleFinish}
              disabled={!isCurrentPageComplete || isSliding}
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-full bg-brand-orange px-10 text-base font-bold text-white shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              Finish
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentPageComplete || isSliding}
              className="inline-flex h-14 min-w-[200px] items-center justify-center rounded-full bg-brand-orange px-10 text-base font-bold text-white shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              Next
            </button>
          )}
        </div>
      ) : null}
    </section>
  );
}
