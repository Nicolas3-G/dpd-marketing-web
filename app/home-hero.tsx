"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const DPD_HOLD_MS = 600;
const REAMING_SUFFIX = "reaming";
const LANNING_SUFFIX = "lanning";
const DOING_SUFFIX = "oing";
const ING_SUFFIX = "ing";
const CHAR_DELAY_MS = 90;
const WORD_HOLD_MS = 1200;
const LETTER_APPEAR_DELAY_MS = 500;
const LETTER_FADE_MS = 400;
const LETTER_PAUSE_MS = 600;
const TAGLINE_FADE_MS = 1200;
const TAGLINE_PART_STAGGER_MS = 700;
const TAGLINE_HOLD_MS = 2400;
const SUFFIX_FADE_MS = 600;
const FADE_MS = 700;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type HeroPhase =
  | "splash"
  | "typing-reaming"
  | "holding-dreaming"
  | "adding-p"
  | "typing-lanning"
  | "holding-planning"
  | "adding-d"
  | "typing-oing"
  | "holding-doing"
  | "show-tagline"
  | "reveal"
  | "done";

const TAGLINE_PREFIX = "See how";
const TAGLINE_SUFFIX_LINE_1 = "can improve";
const TAGLINE_SUFFIX_LINE_2 = "your business";

const splashWordClass = "text-2xl tracking-tighter font-medium sm:text-3xl lg:text-5xl";

const taglineRowClass = `inline-flex flex-nowrap items-baseline justify-center gap-x-1.5 sm:justify-start sm:gap-x-4 ${splashWordClass}`;

const taglinePartClass =
  "shrink-0 text-custom-black transition-[opacity,transform] ease-out motion-reduce:transition-none";

function taglinePartVisibilityClass(visible: boolean) {
  return visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0";
}


function getPrefixLength(phase: HeroPhase): 1 | 2 | 3 {
  switch (phase) {
    case "splash":
    case "typing-reaming":
    case "holding-dreaming":
      return 1;
    case "adding-p":
    case "typing-lanning":
    case "holding-planning":
      return 2;
    default:
      return 3;
  }
}

function getBlackSuffix(phase: HeroPhase) {
  switch (phase) {
    case "splash":
    case "adding-p":
    case "adding-d":
      return "";
    case "typing-reaming":
    case "holding-dreaming":
      return REAMING_SUFFIX;
    case "typing-lanning":
    case "holding-planning":
      return LANNING_SUFFIX;
    case "typing-oing":
    case "holding-doing":
      return DOING_SUFFIX;
    case "show-tagline":
    case "reveal":
      return ING_SUFFIX;
    default:
      return "";
  }
}

/**
 * The newest prefix letter fades in via direct DOM manipulation when
 * animatingIn=true, avoiding CSS transition race conditions from React state.
 * The suffix uses a clip-path sweep when suffixRevealing=true, and an opacity
 * fade when suffixFading=true — these two states never overlap.
 */
function DpdWordmark({
  suffix,
  prefixLength,
  animatingIn = false,
  animKey = "",
  suffixFading = false,
  suffixRevealing = false,
  suffixTaglineVisible,
}: {
  suffix: string;
  prefixLength: number;
  animatingIn?: boolean;
  animKey?: string;
  suffixFading?: boolean;
  suffixRevealing?: boolean;
  suffixTaglineVisible?: boolean;
}) {
  const letterRef = useRef<HTMLSpanElement>(null);
  const suffixRevealRef = useRef<HTMLSpanElement>(null);
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

  useLayoutEffect(() => {
    const el = suffixRevealRef.current;
    if (!el) return;

    if (!suffixRevealing) {
      el.style.transition = "none";
      el.style.clipPath = "";
      return;
    }

    const duration = suffix.length * CHAR_DELAY_MS;

    el.style.transition = "none";
    el.style.clipPath = "inset(0 100% 0 0)";
    // Force reflow so the browser commits the initial clip-path before the
    // transition starts — without this, the first and final values can be
    // coalesced and no animation fires.
    void el.getBoundingClientRect();

    let innerId: number;
    const outerId = requestAnimationFrame(() => {
      innerId = requestAnimationFrame(() => {
        if (!suffixRevealRef.current) return;
        suffixRevealRef.current.style.transition = `clip-path ${duration}ms ease-in-out`;
        suffixRevealRef.current.style.clipPath = "inset(0 0% 0 0)";
      });
    });

    return () => {
      cancelAnimationFrame(outerId);
      cancelAnimationFrame(innerId);
    };
  }, [suffixRevealing, suffix]);

  return (
    <span className="inline-flex items-baseline whitespace-nowrap">
      <span className="shrink-0 font-bold text-brand-orange">
        {establishedPrefix}
        <span ref={letterRef}>{newLetter}</span>
      </span>
      <span ref={suffixRevealRef} className="inline-block">
        <span
          className="text-left text-custom-black"
          style={
            suffixFading
              ? { opacity: 0, transition: `opacity ${SUFFIX_FADE_MS}ms ease-out` }
              : suffixTaglineVisible !== undefined
              ? {
                  opacity: suffixTaglineVisible ? 1 : 0,
                  transform: suffixTaglineVisible ? "translateX(0)" : "translateX(-0.75rem)",
                  transition: `opacity ${TAGLINE_FADE_MS}ms ease-out, transform ${TAGLINE_FADE_MS}ms ease-out`,
                }
              : {}
          }
        >
          {suffix}
        </span>
      </span>
    </span>
  );
}

function TaglineRow({
  suffix,
  prefixLength,
  animatingIn = false,
  animKey = "",
  suffixFading = false,
  suffixRevealing = false,
  suffixTaglineVisible,
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
  suffixFading?: boolean;
  suffixRevealing?: boolean;
  suffixTaglineVisible?: boolean;
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
          suffixFading={suffixFading}
          suffixRevealing={suffixRevealing}
          suffixTaglineVisible={suffixTaglineVisible}
        />
      </span>
      <span className="relative shrink-0 sm:whitespace-nowrap sm:leading-normal">
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
          className={`${taglinePartClass} block sm:hidden ${taglinePartVisibilityClass(suffixLine2Visible)}`}
          style={{
            transitionDuration: `${TAGLINE_FADE_MS}ms`,
            ...(wordmarkWidth !== undefined
              ? { marginLeft: `calc(-${wordmarkWidth}px - 1.5rem)` }
              : {}),
          }}
          aria-hidden={!suffixLine2Visible}
        >
          {TAGLINE_SUFFIX_LINE_2}
        </span>
      </span>
    </div>
  );
}

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrubActive, setScrubActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    video.style.opacity = "1";

    if (!scrubActive) {
      if (!reducedMotion.matches) {
        video.play().catch(() => {});
      }
      return;
    }

    const ctx = gsap.context(() => {
      const setupScrub = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        video.pause();

        if (reducedMotion.matches) return;

        const playback = { time: video.currentTime };

        gsap.to(playback, {
          time: video.duration / 2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            video.currentTime = playback.time;
          },
        });
      };

      if (video.readyState >= 1) {
        setupScrub();
      } else {
        video.addEventListener("loadedmetadata", setupScrub, { once: true });
      }
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [scrubActive]);

  const [phase, setPhase] = useState<HeroPhase>("splash");
  const [suffixFading, setSuffixFading] = useState(false);
  const [suffixRevealing, setSuffixRevealing] = useState(false);
  const [suffixTaglineVisible, setSuffixTaglineVisible] = useState(false);
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
      setSuffixRevealing(true);
      setPhase("typing-reaming");
    }, DPD_HOLD_MS);

    return () => window.clearTimeout(dreamingTimer);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cleanup: (() => void) | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;

    switch (phase) {
      case "typing-reaming": {
        const duration = REAMING_SUFFIX.length * CHAR_DELAY_MS;
        holdTimer = setTimeout(() => {
          setSuffixRevealing(false);
          setPhase("holding-dreaming");
        }, duration);
        break;
      }
      case "holding-dreaming": {
        const fadeTimer = setTimeout(() => setSuffixFading(true), WORD_HOLD_MS);
        const advanceTimer = setTimeout(() => {
          setSuffixFading(false);
          setPhase("adding-p");
        }, WORD_HOLD_MS + SUFFIX_FADE_MS);
        cleanup = () => { clearTimeout(fadeTimer); clearTimeout(advanceTimer); };
        break;
      }
      case "adding-p":
        holdTimer = setTimeout(() => {
          setSuffixRevealing(true);
          setPhase("typing-lanning");
        }, LETTER_PAUSE_MS);
        break;
      case "typing-lanning": {
        const duration = LANNING_SUFFIX.length * CHAR_DELAY_MS;
        holdTimer = setTimeout(() => {
          setSuffixRevealing(false);
          setPhase("holding-planning");
        }, duration);
        break;
      }
      case "holding-planning": {
        const fadeTimer = setTimeout(() => setSuffixFading(true), WORD_HOLD_MS);
        const advanceTimer = setTimeout(() => {
          setSuffixFading(false);
          setPhase("adding-d");
        }, WORD_HOLD_MS + SUFFIX_FADE_MS);
        cleanup = () => { clearTimeout(fadeTimer); clearTimeout(advanceTimer); };
        break;
      }
      case "adding-d":
        holdTimer = setTimeout(() => {
          setSuffixRevealing(true);
          setPhase("typing-oing");
        }, LETTER_PAUSE_MS);
        break;
      case "typing-oing": {
        const duration = DOING_SUFFIX.length * CHAR_DELAY_MS;
        holdTimer = setTimeout(() => {
          setSuffixRevealing(false);
          setPhase("holding-doing");
        }, duration);
        break;
      }
      case "holding-doing": {
        const fadeTimer = setTimeout(() => setSuffixFading(true), WORD_HOLD_MS);
        const advanceTimer = setTimeout(() => {
          setSuffixFading(false);
          setPhase("show-tagline");
        }, WORD_HOLD_MS + SUFFIX_FADE_MS);
        cleanup = () => { clearTimeout(fadeTimer); clearTimeout(advanceTimer); };
        break;
      }
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
        setSuffixTaglineVisible(false);
        setTaglineSuffixVisible(false);
        setTaglineSuffixLine2Visible(false);
      }
      return;
    }

    setTaglinePrefixVisible(false);
    setSuffixTaglineVisible(false);
    setTaglineSuffixVisible(false);
    setTaglineSuffixLine2Visible(false);

    if (prefersReducedMotion()) {
      setTaglinePrefixVisible(true);
      setSuffixTaglineVisible(true);
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
    const wordmarkTimer = window.setTimeout(
      () => setSuffixTaglineVisible(true),
      TAGLINE_PART_STAGGER_MS,
    );
    const suffixTimer = window.setTimeout(
      () => setTaglineSuffixVisible(true),
      TAGLINE_PART_STAGGER_MS * 2,
    );
    const suffixLine2Timer = isMobile
      ? window.setTimeout(
          () => setTaglineSuffixLine2Visible(true),
          TAGLINE_PART_STAGGER_MS * 3,
        )
      : undefined;
    const revealDelayMs = isMobile
      ? TAGLINE_PART_STAGGER_MS * 3 + TAGLINE_FADE_MS + TAGLINE_HOLD_MS
      : TAGLINE_PART_STAGGER_MS * 2 + TAGLINE_FADE_MS + TAGLINE_HOLD_MS;
    const revealTimer = window.setTimeout(
      () => setPhase("reveal"),
      revealDelayMs,
    );

    return () => {
      cancelAnimationFrame(fadeFrame);
      window.clearTimeout(wordmarkTimer);
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

  useEffect(() => {
    if (phase !== "done") return;

    let rafId = 0;

    const timer = window.setTimeout(() => {
      const video = videoRef.current;
      if (!video) { setScrubActive(true); return; }

      const DECEL_MS = 700;
      const start = performance.now();

      const decelerate = (now: number) => {
        const t = Math.min((now - start) / DECEL_MS, 1);
        video.playbackRate = Math.max(0.0625, 1 - t * t);
        if (t < 1) {
          rafId = requestAnimationFrame(decelerate);
        } else {
          video.pause();
          video.playbackRate = 1;
          setScrubActive(true);
        }
      };

      rafId = requestAnimationFrame(decelerate);
    }, 2000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      const video = videoRef.current;
      if (video) video.playbackRate = 1;
    };
  }, [phase]);

  const splashVisible = phase !== "done";
  const prefixLength = getPrefixLength(phase);
  const blackSuffix = getBlackSuffix(phase);
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
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-white text-custom-black"
    >
      <video
        ref={videoRef}
        src="/videos/orange-ribbon.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
      />
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
            className="pointer-events-none invisible absolute inset-0 flex items-center justify-center px-8 sm:px-4"
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
            className={`flex w-full justify-center px-8 sm:px-4 motion-reduce:transition-none ${
              taglineLayout ? "visible" : "invisible"
            }`}
          >
            <TaglineRow
              suffix={blackSuffix}
              prefixLength={prefixLength}
              animatingIn={isAddingLetter}
              animKey={phase}
              suffixFading={suffixFading}
              suffixRevealing={suffixRevealing}
              suffixTaglineVisible={phase === "show-tagline" || phase === "reveal" ? suffixTaglineVisible : undefined}
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
        className={`relative z-10 ${pageInset} flex flex-col items-center justify-center py-20 text-center sm:py-24 lg:py-28`}
      >
        <div className="flex w-full max-w-5xl flex-col items-center border border-white/60 bg-white/30 px-10 py-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.14)] backdrop-blur-md sm:px-16 sm:py-14">
          <div
            className={`flex w-full flex-col items-center transition-opacity ease-in-out motion-reduce:transition-none ${
              contentVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
            aria-hidden={!contentVisible}
          >
            <p className="custom-caption-bold uppercase text-custom-black">
              Persona-based Cognitive Alignment
            </p>
            <h1 className="mt-6 max-w-4xl custom-lg-title-bold leading-tight text-custom-black">
              Built for Individuals, Coaches, Leaders, and Teams.
            </h1>
            <p className="mt-6 max-w-2xl custom-body text-custom-black">
              DPD turns how people think into a shared language for how they
              dream, plan, and do together. DPDing!
            </p>
            <a
              href="/survey"
              className="mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-custom-black px-8 custom-label-bold text-white transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
              tabIndex={contentVisible ? undefined : -1}
            >
              Take DPD Survey
              <HiArrowRight aria-hidden="true" className="text-xl leading-none" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
