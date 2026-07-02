"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const TRANSITION_MS = 300;

const personas = [
  { label: "The Dreamer Persona", imageSrc: "/Dreamers/dreamer-vert.jpg", backgroundSrc: "/Dreamers/dreamer-1.jpg" },
  { label: "The Planner Persona", imageSrc: "/Planners/planner-vert.jpg", backgroundSrc: "/Planners/planner-1.jpg" },
  { label: "The Doer Persona", imageSrc: "/Doers/doer-vert.jpg", backgroundSrc: "/Doers/doer-1.jpg" },
] as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function selectPersonaSection(index: number) {
  window.dispatchEvent(new CustomEvent("dpd:select-persona", { detail: { index } }));
  document.getElementById("framework-personas")?.scrollIntoView({ behavior: "smooth" });
}

/** Outgoing portrait — crossfades out over the incoming portrait, then is removed. */
function FadingOutPortrait({ imageSrc }: { imageSrc: string }) {
  const [exited, setExited] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setExited(true);
      return;
    }
    const frame = requestAnimationFrame(() => setExited(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity ease-out motion-reduce:transition-none"
      style={{
        opacity: exited ? 0 : 1,
        transitionDuration: `${TRANSITION_MS}ms`,
        zIndex: 10,
      }}
      aria-hidden
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(min-width: 640px) 320px, 256px"
        className="object-cover"
      />
    </div>
  );
}

/** Framework page hero — glass card always 60% section height, persona card straddling its top edge. */
export function FrameworkHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [fadingOutSrc, setFadingOutSrc] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const persona = personas[displayIndex];

  const goTo = useCallback(
    (next: number) => {
      const total = personas.length;
      const clamped = ((next % total) + total) % total;
      if (clamped === activeIndex) return;

      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);

      setFadingOutSrc(personas[activeIndex].imageSrc);
      setDisplayIndex(clamped);
      setActiveIndex(clamped);

      fadeTimeoutRef.current = setTimeout(() => {
        setFadingOutSrc(null);
        fadeTimeoutRef.current = null;
      }, TRANSITION_MS);
    },
    [activeIndex],
  );

  const handleManualNav = useCallback(
    (next: number) => {
      setAutoplay(false);
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      goTo(next);
    },
    [goTo],
  );

  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % personas.length;
        setFadingOutSrc(personas[prev].imageSrc);
        setDisplayIndex(next);
        if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
        fadeTimeoutRef.current = setTimeout(() => {
          setFadingOutSrc(null);
          fadeTimeoutRef.current = null;
        }, TRANSITION_MS);
        return next;
      });
    }, 15000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay]);

  useEffect(() => () => {
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  return (
    <section
      id="framework"
      className="relative isolate mt-20 min-h-[calc(100svh-5rem)] overflow-hidden"
    >
      {/* Background images — desktop/tablet, crossfade on persona change */}
      {personas.map((p, i) => (
        <Image
          key={p.backgroundSrc}
          src={p.backgroundSrc}
          alt=""
          fill
          aria-hidden
          priority={i === 0}
          className={`pointer-events-none hidden object-cover -scale-x-100 transition-opacity duration-700 md:block ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
          sizes="100vw"
        />
      ))}

      {/* Background images — mobile uses the persona portrait images instead */}
      {personas.map((p, i) => (
        <Image
          key={p.imageSrc}
          src={p.imageSrc}
          alt=""
          fill
          aria-hidden
          priority={i === 0}
          className={`pointer-events-none block object-cover transition-opacity duration-700 md:hidden ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
          sizes="100vw"
        />
      ))}

      {/* Gradient overlay — transparent at top, fading to black at the bottom */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/0 to-black/80"
        aria-hidden
      />

      {/* Glass card — always bottom 60% of the section */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] border-t border-gray-card-border backdrop-blur-sm">
        <div className="mx-5 flex h-full items-center sm:mx-[45px]">
          <div className="text-white">
            <p className="custom-caption-bold uppercase text-brand-orange">
              A Breakthrough in Cognitive Persona Science
            </p>
            <h1 className="mt-6 custom-lg-title-bold leading-tight">
              The DPD Framework
            </h1>
            <p className="mt-6 max-w-prose custom-body text-white/80">
              The Dreamer-Planner-Doer (DPD) Framework is a Persona-Based
              Cognitive Alignment practice designed to help people recognize
              their current cognitive (thinking) posture, build relational
              awareness, and create greater individual and team coherence.
            </p>
          </div>
        </div>
      </div>

      {/* Persona card — centered on the glass card's top edge */}
      <div className="absolute right-10 top-[52%] z-10 hidden -translate-y-1/2 flex-col items-center gap-4 sm:right-36 md:flex">
        <button
          type="button"
          onClick={() => selectPersonaSection(activeIndex)}
          className="group flex flex-col items-center gap-4 focus-visible:outline-none"
          aria-label={`View ${persona.label} section`}
        >
          {/* Card container — new portrait sits statically; outgoing fades as an overlay */}
          <div className="relative aspect-[3/4] w-64 overflow-hidden border border-gray-card-border shadow-[0px_8px_24px_rgba(0,0,0,0.20)] group-hover:brightness-90 sm:w-80">
            <Image
              src={persona.imageSrc}
              alt={persona.label}
              fill
              sizes="(min-width: 640px) 320px, 256px"
              className="object-cover"
            />
            {fadingOutSrc !== null && (
              <FadingOutPortrait key={fadingOutSrc} imageSrc={fadingOutSrc} />
            )}
          </div>

          <p className="custom-body-bold text-white transition-opacity duration-300 group-hover:text-white/75">
            {persona.label}
          </p>
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleManualNav(activeIndex - 1)}
            aria-label="Previous persona"
            className="grid size-14 place-items-center rounded-full border border-white text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <FaArrowLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => handleManualNav(activeIndex + 1)}
            aria-label="Next persona"
            className="grid size-14 place-items-center rounded-full border border-white text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <FaArrowRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
