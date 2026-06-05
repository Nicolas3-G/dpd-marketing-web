"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const DPD_HOLD_MS = 1200;
const REAMING_SUFFIX = "reaming";
const LANNING_SUFFIX = "lanning";
const DOING_SUFFIX = "oing";
const ING_SUFFIX = "ing";
const CHAR_DELAY_MS = 90;
const WORD_HOLD_MS = 1200;
const LETTER_APPEAR_DELAY_MS = 500;
const LETTER_FADE_MS = 400;
const LETTER_PAUSE_MS = 1200;
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
  | "holding-dreaming"
  | "untyping-reaming"
  | "adding-p"
  | "typing-lanning"
  | "holding-planning"
  | "untyping-lanning"
  | "adding-d"
  | "typing-oing"
  | "holding-doing"
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
  return visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0";
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

function getPrefixLength(phase: HeroPhase): 1 | 2 | 3 {
  switch (phase) {
    case "splash":
    case "typing-reaming":
    case "holding-dreaming":
    case "untyping-reaming":
      return 1;
    case "adding-p":
    case "typing-lanning":
    case "holding-planning":
    case "untyping-lanning":
      return 2;
    default:
      return 3;
  }
}

function getBlackSuffix(phase: HeroPhase, typedLength: number) {
  switch (phase) {
    case "splash":
    case "adding-p":
    case "adding-d":
      return "";
    case "typing-reaming":
    case "untyping-reaming":
      return REAMING_SUFFIX.slice(0, typedLength);
    case "holding-dreaming":
      return REAMING_SUFFIX;
    case "typing-lanning":
    case "untyping-lanning":
      return LANNING_SUFFIX.slice(0, typedLength);
    case "holding-planning":
      return LANNING_SUFFIX;
    case "typing-oing":
    case "untyping-oing":
      return DOING_SUFFIX.slice(0, typedLength);
    case "holding-doing":
      return DOING_SUFFIX;
    case "typing-ing":
      return ING_SUFFIX.slice(0, typedLength);
    case "show-tagline":
    case "reveal":
      return ING_SUFFIX;
    default:
      return "";
  }
}

/**
 * The newest letter of the prefix fades in via direct DOM manipulation when
 * animatingIn=true, avoiding CSS transition race conditions from React state.
 */
function DpdWordmark({
  suffix,
  prefixLength,
  animatingIn = false,
  animKey = "",
}: {
  suffix: string;
  prefixLength: number;
  animatingIn?: boolean;
  animKey?: string;
}) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const establishedPrefix = "DPD".slice(0, prefixLength - 1);
  const newLetter = prefixLength > 0 ? "DPD"[prefixLength - 1] : "";

  useLayoutEffect(() => {
    const el = letterRef.current;
    if (!el) return;

    if (!animatingIn) {
      el.style.transition = "none";
      el.style.opacity = "1";
      return;
    }

    // Set invisible before browser paints so there is no flash
    el.style.transition = "none";
    el.style.opacity = "0";

    const timer = setTimeout(() => {
      if (!letterRef.current) return;
      letterRef.current.style.transition = `opacity ${LETTER_FADE_MS}ms ease-out`;
      letterRef.current.style.opacity = "1";
    }, LETTER_APPEAR_DELAY_MS);

    return () => clearTimeout(timer);
  // animKey ensures effect re-runs when switching adding-p → adding-d
  }, [animatingIn, animKey]);

  return (
    <span className="inline-flex items-baseline whitespace-nowrap">
      <span className="shrink-0 text-brand-orange">
        {establishedPrefix}
        <span ref={letterRef}>{newLetter}</span>
      </span>
      <span className="text-left text-custom-black">{suffix}</span>
    </span>
  );
}

function TaglineRow({
  suffix,
  prefixLength,
  animatingIn = false,
  animKey = "",
  prefixVisible,
  suffixVisible,
  suffixLine2Visible = suffixVisible,
  rowWidth,
  wordmarkWidth,
}: {
  suffix: string;
  prefixLength: number;
  animatingIn?: boolean;
  animKey?: string;
  prefixVisible: boolean;
  suffixVisible: boolean;
  suffixLine2Visible?: boolean;
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
        <DpdWordmark
          suffix={suffix}
          prefixLength={prefixLength}
          animatingIn={animatingIn}
          animKey={animKey}
        />
      </span>
      <span className="relative shrink-0 whitespace-nowrap leading-none pb-[1em] sm:pb-0 sm:leading-normal">
        <span
          className={`${taglinePartClass} ${taglinePartVisibilityClass(suffixVisible)}`}
          style={{ transitionDuration: `${TAGLINE_FADE_MS}ms` }}
          aria-hidden={!suffixVisible}
        >
          {TAGLINE_SUFFIX_LINE_1}
          <span className="hidden sm:inline">
            {" "}
            {TAGLINE_SUFFIX_LINE_2}
          </span>
        </span>
        <span
          className={`${taglinePartClass} absolute top-[1em] left-0 whitespace-nowrap sm:hidden ${taglinePartVisibilityClass(suffixLine2Visible)}`}
          style={{ transitionDuration: `${TAGLINE_FADE_MS}ms` }}
          aria-hidden={!suffixLine2Visible}
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
  const [taglineSuffixLine2Visible, setTaglineSuffixLine2Visible] =
    useState(false);
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
          onComplete: () => setPhase("holding-dreaming"),
        });
        break;
      case "holding-dreaming":
        holdTimer = setTimeout(
          () => setPhase("untyping-reaming"),
          WORD_HOLD_MS,
        );
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
            setPhase("adding-p");
          },
        });
        break;
      case "adding-p":
        holdTimer = setTimeout(
          () => setPhase("typing-lanning"),
          LETTER_PAUSE_MS,
        );
        break;
      case "typing-lanning":
        cleanup = animateChars({
          text: LANNING_SUFFIX,
          direction: "forward",
          startLength: 0,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => setPhase("holding-planning"),
        });
        break;
      case "holding-planning":
        holdTimer = setTimeout(
          () => setPhase("untyping-lanning"),
          WORD_HOLD_MS,
        );
        break;
      case "untyping-lanning":
        cleanup = animateChars({
          text: LANNING_SUFFIX,
          direction: "backward",
          startLength: LANNING_SUFFIX.length,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => {
            setTypedLength(0);
            setPhase("adding-d");
          },
        });
        break;
      case "adding-d":
        holdTimer = setTimeout(
          () => setPhase("typing-oing"),
          LETTER_PAUSE_MS,
        );
        break;
      case "typing-oing":
        cleanup = animateChars({
          text: DOING_SUFFIX,
          direction: "forward",
          startLength: 0,
          delayMs: CHAR_DELAY_MS,
          onTick: setTypedLength,
          onComplete: () => setPhase("holding-doing"),
        });
        break;
      case "holding-doing":
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
      if (phase !== "reveal" && phase !== "done") {
        setTaglinePrefixVisible(false);
        setTaglineSuffixVisible(false);
        setTaglineSuffixLine2Visible(false);
      }
      return;
    }

    setTaglinePrefixVisible(false);
    setTaglineSuffixVisible(false);
    setTaglineSuffixLine2Visible(false);

    if (prefersReducedMotion()) {
      setTaglinePrefixVisible(true);
      setTaglineSuffixVisible(true);
      setTaglineSuffixLine2Visible(true);
      const revealTimer = window.setTimeout(
        () => setPhase("reveal"),
        TAGLINE_HOLD_MS,
      );
      return () => window.clearTimeout(revealTimer);
    }

    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    const fadeFrame = requestAnimationFrame(() => setTaglinePrefixVisible(true));
    const suffixTimer = window.setTimeout(
      () => setTaglineSuffixVisible(true),
      TAGLINE_PART_STAGGER_MS,
    );
    const suffixLine2Timer = isMobile
      ? window.setTimeout(
          () => setTaglineSuffixLine2Visible(true),
          TAGLINE_PART_STAGGER_MS * 2,
        )
      : undefined;
    const revealDelayMs = isMobile
      ? TAGLINE_PART_STAGGER_MS * 2 + TAGLINE_FADE_MS + TAGLINE_HOLD_MS
      : TAGLINE_PART_STAGGER_MS + TAGLINE_FADE_MS + TAGLINE_HOLD_MS;
    const revealTimer = window.setTimeout(
      () => setPhase("reveal"),
      revealDelayMs,
    );

    return () => {
      cancelAnimationFrame(fadeFrame);
      window.clearTimeout(suffixTimer);
      if (suffixLine2Timer) window.clearTimeout(suffixLine2Timer);
      window.clearTimeout(revealTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "reveal") return;

    const doneTimer = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  const splashVisible = phase !== "done";
  const prefixLength = getPrefixLength(phase);
  const blackSuffix = getBlackSuffix(phase, typedLength);
  const isAddingLetter = phase === "adding-p" || phase === "adding-d";
  const taglinePrefixShown =
    (phase === "show-tagline" || phase === "reveal") && taglinePrefixVisible;
  const taglineSuffixShown =
    (phase === "show-tagline" || phase === "reveal") && taglineSuffixVisible;
  const taglineSuffixLine2Shown =
    (phase === "show-tagline" || phase === "reveal") &&
    taglineSuffixLine2Visible;
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
              prefixLength={3}
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
              prefixLength={prefixLength}
              animatingIn={isAddingLetter}
              animKey={phase}
              prefixVisible={taglinePrefixShown}
              suffixVisible={taglineSuffixShown}
              suffixLine2Visible={taglineSuffixLine2Shown}
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
        <p className="custom-caption-2-bold uppercase text-light">
          Discover your persona
        </p>
        <h1 className="mt-6 max-w-4xl custom-lg-title-bold leading-tight">
          Behavior Coordination for{" "}
          <span className="text-brand-orange">
            individuals, coaches, and teams.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl custom-body text-custom-black">
          Only 10 minutes to gain practical insight into how your team
          collaborates, communicates, and works best together.
        </p>
        <a
          href="/survey"
          className="mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-brand-orange px-8 custom-label-bold text-white shadow-[0_14px_30px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
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
