"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const AGREE_COLOR = "#47a877";
const DISAGREE_COLOR = "#8860a2";
const NEUTRAL_COLOR = "#b8bec8";

const placeholderQuestions = [
  "Question 1 placeholder text.",
  "Question 2 placeholder text.",
  "Question 3 placeholder text.",
  "Question 4 placeholder text.",
  "Question 5 placeholder text.",
] as const;

/** 0 = strongly agree … 6 = strongly disagree */
const SCALE_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const;

const circleSizes: Record<number, string> = {
  0: "size-12 sm:size-[52px]",
  1: "size-10 sm:size-11",
  2: "size-8 sm:size-9",
  3: "size-6 sm:size-7",
  4: "size-8 sm:size-9",
  5: "size-10 sm:size-11",
  6: "size-12 sm:size-[52px]",
};

function optionColor(index: number): string {
  if (index < 3) return AGREE_COLOR;
  if (index > 3) return DISAGREE_COLOR;
  return NEUTRAL_COLOR;
}

function SurveyQuestion({
  statement,
  value,
  onChange,
}: {
  statement: string;
  value: number | null;
  onChange: (index: number) => void;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-8 w-full text-left text-lg font-semibold leading-snug text-[#333a48] sm:text-xl">
        {statement}
      </legend>

      <div
        role="radiogroup"
        aria-label={`Response scale for: ${statement}`}
        className="flex items-center justify-between gap-2 sm:gap-4"
      >
        <span
          className="w-14 shrink-0 text-sm font-bold sm:w-16 sm:text-base"
          style={{ color: AGREE_COLOR }}
        >
          Agree
        </span>

        <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2.5">
          {SCALE_OPTIONS.map((index) => {
            const color = optionColor(index);
            const selected = value === index;

            return (
              <button
                key={index}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(index)}
                className={`${circleSizes[index]} flex shrink-0 items-center justify-center rounded-full border-2 transition-[transform,background-color,border-color] duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333a48]`}
                style={{
                  borderColor: color,
                  backgroundColor: selected ? color : "transparent",
                }}
              >
                {selected ? (
                  <FaCheck className="size-3 text-white sm:size-3.5" aria-hidden />
                ) : null}
              </button>
            );
          })}
        </div>

        <span
          className="w-14 shrink-0 text-right text-sm font-bold sm:w-16 sm:text-base"
          style={{ color: DISAGREE_COLOR }}
        >
          Disagree
        </span>
      </div>
    </fieldset>
  );
}

export function SurveyAssessment() {
  const [answers, setAnswers] = useState<Record<number, number | null>>(() =>
    Object.fromEntries(placeholderQuestions.map((_, i) => [i, null])),
  );

  return (
    <section
      id="assessment"
      className="mx-auto mt-16 max-w-3xl scroll-mt-28 sm:mt-20"
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(51,58,72,0.06)]">
        {placeholderQuestions.map((statement, index) => (
          <div
            key={statement}
            className="px-6 py-10 sm:px-10 sm:py-12 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-[#e5e7eb]"
          >
            <SurveyQuestion
              statement={statement}
              value={answers[index] ?? null}
              onChange={(option) =>
                setAnswers((prev) => ({ ...prev, [index]: option }))
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
