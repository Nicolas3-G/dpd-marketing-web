"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const DPD_HOLD_MS = 1200;
const REAMING_SUFFIX = "reaming";
const ECIDING_SUFFIX = "eciding";
const DOING_SUFFIX = "oing";
const ING_SUFFIX = "ing";
const CHAR_DELAY_MS = 90;
const WORD_HOLD_MS = 1200;
const TAGLINE_FADE_MS = 800;
const TAGLINE_PART_STAGGER_MS = 420;
const TAGLINE_HOLD_MS = 2400;
const FADE_MS = 700;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type HeroPhase =
  | "splash"
  | "typing-reaming"
  | "holding-reaming"
  | "untyping-reaming"
  | "typing-eciding"
  | "holding-eciding"
  | "untyping-eciding"
  | "typing-oing"
  | "holding-oing"
  | "untyping-oing"
  | "typing-ing"
  | "show-tagline"
  | "reveal"
  | "done";

const TAGLINE_PREFIX = "See how";
const TAGLINE_SUFFIX_LINE_1 = "can improve";
const TAGLINE_SUFFIX_LINE_2 = "your business";

const splashWordClass =
  "text-2xl font-bold tracking-[-0.06em] sm:text-4xl lg:text-5xl";

const taglineRowClass = `inline-flex flex-nowrap items-baseline gap-x-3 sm:gap-x-4 ${splashWordClass}`;

const taglinePartClass =
  "shrink-0 text-custom-black transition-[opacity,transform] ease-out motion-reduce:transition-none";

function taglinePartVisibilityClass(visible: boolean) {
  return visible
    ? "translate-x-0 opacity-100"
    : "-translate-x-3 opacity-0";
}

function animateChars(options: {
  text: string;
  direction: "forward" | "backward";
  startLength: number;
  delayMs: number;
  onTick: (length: number) => void;
  onComplete: () => void;
}) {
  const { text, direction, startLength, delayMs, onTick, onComplete } =
    options;
  let length = startLength;
  let timer: ReturnType<typeof setTimeout>;

  const tick = () => {
    if (direction === "forward") {
      length += 1;
      onTick(length);
      if (length < text.length) {
        timer = setTimeout(tick, delayMs);
      } else {
        onComplete();
      }
    } else {
      length -= 1;
      onTick(length);
      if (length > 0) {
        timer = setTimeout(tick, delayMs);
      } else {
        onComplete();
      }
    }
  };

  timer = setTimeout(tick, delayMs);
  return () => clearTimeout(timer);
}

function getBlackSuffix(phase: HeroPhase, typedLength: number) {
  switch (phase) {
    case "splash":
      return "";
    case "typing-reaming":
    case "holding-reaming":
    case "untyping-reaming":
      return REAMING_SUFFIX.slice(0, typedLength);
    case "typing-eciding":
    case "holding-eciding":
    case "untyping-eciding":
      return ECIDING_SUFFIX.slice(0, typedLength);
    case "typing-oing":
    case "holding-oing":
    case "untyping-oing":
      return DOING_SUFFIX.slice(0, typedLength);
    case "typing-ing":
      return ING_SUFFIX.slice(0, typedLength);
    case "show-tagline":
    case "reveal":
      return ING_SUFFIX;
    default:
      return "";
  }
}

/** Suffix types to the right of DPD inside a fixed-width slot. */
function DpdWordmark({ suffix }: { suffix: string }) {
  return (
    <span className="inline-flex items-baseline whitespace-nowrap">
      <span className="shrink-0 text-brand-orange">DPD</span>
      <span className="text-left text-custom-black">{suffix}</span>
    </span>
  );
}

function TaglineRow({
  suffix,
  prefixVisible,
  suffixVisible,
  rowWidth,
  wordmarkWidth,
}: {
  suffix: string;
  prefixVisible: boolean;
  suffixVisible: boolean;
  rowWidth?: number;
  wordmarkWidth?: number;
}) {
  return (
    <div
      data-tagline-row
      className={taglineRowClass}
      style={rowWidth !== undefined ? { width: rowWidth } : undefined}
    >
      <span
        className={`${taglinePartClass} ${taglinePartVisibilityClass(prefixVisible)}`}
        style={{ transitionDuration: `${TAGLINE_FADE_MS}ms` }}
        aria-hidden={!prefixVisible}
      >
        {TAGLINE_PREFIX}
      </span>
      <span
        data-wordmark-slot
        className="inline-block shrink-0 overflow-visible whitespace-nowrap"
        style={
          wordmarkWidth !== undefined ? { width: wordmarkWidth } : undefined
        }
      >
        <DpdWordmark suffix={suffix} />
      </span>
      <span
        className={`${taglinePartClass} relative shrink-0 whitespace-nowrap leading-none pb-[1em] sm:pb-0 sm:leading-normal ${taglinePartVisibilityClass(suffixVisible)}`}
        style={{ transitionDuration: `${TAGLINE_FADE_MS}ms` }}
        aria-hidden={!suffixVisible}
      >
        {TAGLINE_SUFFIX_LINE_1}
        <span className="hidden sm:inline">
          {"\u00a0"}
          {TAGLINE_SUFFIX_LINE_2}
        </span>
        <span
          className="absolute top-[1em] left-0 whitespace-nowrap sm:hidden"
          aria-hidden={!suffixVisible}
        >
          {TAGLINE_SUFFIX_LINE_2}
        </span>
      </span>
    </div>
  );
}

export function HomeHero() {
  const [phase, setPhase] = useState<HeroPhase>("splash");
  const [typedLength, setTypedLength] = useState(0);
  const [taglinePrefixVisible, setTaglinePrefixVisible] = useState(false);
  const [taglineSuffixVisible, setTaglineSuffixVisible] = useState(false);
  const [taglineLayout, setTaglineLayout] = useState<{
    rowWidth: number;
    wordmarkWidth: number;
  } | null>(null);
  const taglineMeasureRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const measureRoot = taglineMeasureRef.current;
    if (!measureRoot) return;

    const updateLayout = () => {
      const row = measureRoot.querySelector<HTMLElement>("[data-tagline-row]");
      const wordmarkSlot = measureRoot.querySelector<HTMLElement>(
        "[data-wordmark-slot]",
      );
      if (!row || !wordmarkSlot) return;

      setTaglineLayout({
        rowWidth: row.getBoundingClientRect().width,
        wordmarkWidth: wordmarkSlot.getBoundingClientRect().width,
      });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase("done");
      return;
    }

    const dreamingTimer = window.setTimeout(() => {
      setPhase("typing-reaming");
      setTypedLength(0);
    }, DPD_HOLD_MS);

    return () => window.clearTimeout(dreamingTimer);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cleanup: (() => void) | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    switch (phase) {
      case "typing-reaming":
        cleanup = animateChars({
          text: REAMING_SUFFIX,
          direction: "forward",
          startLength: 0,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => setPhase("holding-reaming"),
        });
        break;
      case "holding-reaming":
        holdTimer = setTimeout(() => setPhase("untyping-reaming"), WORD_HOLD_MS);
        break;
      case "untyping-reaming":
        cleanup = animateChars({
          text: REAMING_SUFFIX,
          direction: "backward",
          startLength: REAMING_SUFFIX.length,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => {
            setTypedLength(0);
            setPhase("typing-eciding");
          },
        });
        break;
      case "typing-eciding":
        cleanup = animateChars({
          text: ECIDING_SUFFIX,
          direction: "forward",
          startLength: 0,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => setPhase("holding-eciding"),
        });
        break;
      case "holding-eciding":
        holdTimer = setTimeout(() => setPhase("untyping-eciding"), WORD_HOLD_MS);
        break;
      case "untyping-eciding":
        cleanup = animateChars({
          text: ECIDING_SUFFIX,
          direction: "backward",
          startLength: ECIDING_SUFFIX.length,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => {
            setTypedLength(0);
            setPhase("typing-oing");
          },
        });
        break;
      case "typing-oing":
        cleanup = animateChars({
          text: DOING_SUFFIX,
          direction: "forward",
          startLength: 0,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => setPhase("holding-oing"),
        });
        break;
      case "holding-oing":
        holdTimer = setTimeout(() => setPhase("untyping-oing"), WORD_HOLD_MS);
        break;
      case "untyping-oing":
        cleanup = animateChars({
          text: DOING_SUFFIX,
          direction: "backward",
          startLength: DOING_SUFFIX.length,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => {
            setTypedLength(0);
            setPhase("typing-ing");
          },
        });
        break;
      case "typing-ing":
        cleanup = animateChars({
          text: ING_SUFFIX,
          direction: "forward",
          startLength: 0,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => setPhase("show-tagline"),
        });
        break;
      default:
        break;
    }

    return () => {
      cleanup?.();
      if (holdTimer) clearTimeout(holdTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "show-tagline") {
      if (
        phase === "splash" ||
        phase.startsWith("typing") ||
        phase.startsWith("untyping")
      ) {
        setTaglinePrefixVisible(false);
        setTaglineSuffixVisible(false);
      }
      return;
    }

    setTaglinePrefixVisible(false);
    setTaglineSuffixVisible(false);

    if (prefersReducedMotion()) {
      setTaglinePrefixVisible(true);
      setTaglineSuffixVisible(true);
      const revealTimer = window.setTimeout(
        () => setPhase("reveal"),
        TAGLINE_HOLD_MS,
      );
      return () => window.clearTimeout(revealTimer);
    }

    const fadeFrame = requestAnimationFrame(() => setTaglinePrefixVisible(true));
    const suffixTimer = window.setTimeout(
      () => setTaglineSuffixVisible(true),
      TAGLINE_PART_STAGGER_MS,
    );
    const revealTimer = window.setTimeout(
      () => setPhase("reveal"),
      TAGLINE_PART_STAGGER_MS + TAGLINE_FADE_MS + TAGLINE_HOLD_MS,
    );

    return () => {
      cancelAnimationFrame(fadeFrame);
      window.clearTimeout(suffixTimer);
      window.clearTimeout(revealTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "reveal") return;

    const doneTimer = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  const splashVisible = phase !== "done";
  const blackSuffix = getBlackSuffix(phase, typedLength);
  const taglinePrefixShown =
    (phase === "show-tagline" || phase === "reveal") && taglinePrefixVisible;
  const taglineSuffixShown =
    (phase === "show-tagline" || phase === "reveal") && taglineSuffixVisible;
  const contentVisible = phase === "reveal" || phase === "done";

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-white text-custom-black"
    >
      {splashVisible ? (
        <div
          className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity ease-in-out motion-reduce:transition-none ${
            phase === "reveal" ? "opacity-0" : "opacity-100"
          }`}
          style={{ transitionDuration: `${FADE_MS}ms` }}
          aria-hidden
        >
          <div
            ref={taglineMeasureRef}
            className="pointer-events-none invisible absolute inset-0 flex items-center justify-center px-4"
            aria-hidden
          >
            <TaglineRow
              suffix={ING_SUFFIX}
              prefixVisible
              suffixVisible
            />
          </div>
          <div
            className={`flex w-full justify-center px-4 motion-reduce:transition-none ${
              taglineLayout ? "visible" : "invisible"
            }`}
          >
            <TaglineRow
              suffix={blackSuffix}
              prefixVisible={taglinePrefixShown}
              suffixVisible={taglineSuffixShown}
              rowWidth={taglineLayout?.rowWidth}
              wordmarkWidth={taglineLayout?.wordmarkWidth}
            />
          </div>
        </div>
      ) : null}

      <div
        className={`relative z-10 ${pageInset} flex flex-col items-center justify-center py-20 text-center transition-opacity ease-in-out motion-reduce:transition-none sm:py-24 lg:py-28 ${
          contentVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
        aria-hidden={!contentVisible}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-custom-black/55">
          Discover your persona
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          Behavior Coordination for{" "}
          <span className="text-brand-orange">
            individuals, coaches, and teams.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-custom-black/75 sm:text-lg">
          Only 10 minutes to gain practical insight into how your team
          collaborates, communicates, and works best together.
        </p>
        <a
          href="/survey"
          className="mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-brand-orange px-8 text-sm font-bold text-white shadow-[0_14px_30px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
          tabIndex={contentVisible ? undefined : -1}
        >
          Take DPD Survey
          <span aria-hidden="true" className="text-xl leading-none">
            &#8594;
          </span>
        </a>
      </div>
    </section>
  );
}
