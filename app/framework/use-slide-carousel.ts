"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const SLIDE_MS = 450;

export function getSlideDirection(
  from: number,
  to: number,
  total: number,
): 1 | -1 {
  const forwardSteps = (to - from + total) % total;
  const backwardSteps = (from - to + total) % total;
  return forwardSteps <= backwardSteps ? 1 : -1;
}

export function useSlideCarousel(activeIndex: number, slideCount: number) {
  const [settledIndex, setSettledIndex] = useState(activeIndex);
  const [transition, setTransition] = useState<{
    from: number;
    to: number;
    direction: 1 | -1;
  } | null>(null);
  const [animate, setAnimate] = useState(false);
  const reduceMotionRef = useRef(false);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionRef = useRef(transition);
  transitionRef.current = transition;

  const displayIndex = transition?.to ?? settledIndex;
  const isSliding = transition !== null;

  const enterOffset = transition ? transition.direction * 100 : 0;
  const exitOffset = transition ? transition.direction * -100 : 0;
  const enterX = animate ? 0 : enterOffset;
  const exitX = animate ? exitOffset : 0;

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useLayoutEffect(() => {
    if (activeIndex === settledIndex && transition === null) {
      return;
    }

    if (reduceMotionRef.current) {
      setSettledIndex(activeIndex);
      setTransition(null);
      setAnimate(false);
      return;
    }

    if (transition?.to === activeIndex) {
      return;
    }

    const fromIndex = transition?.to ?? settledIndex;
    if (fromIndex === activeIndex) {
      return;
    }

    setTransition({
      from: fromIndex,
      to: activeIndex,
      direction: getSlideDirection(fromIndex, activeIndex, slideCount),
    });
  }, [activeIndex, settledIndex, transition, slideCount]);

  useLayoutEffect(() => {
    if (!transition) {
      return;
    }

    if (reduceMotionRef.current) {
      return;
    }

    setAnimate(false);

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [transition?.from, transition?.to]);

  useEffect(() => {
    if (!transition || !animate) {
      return;
    }

    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
    }

    clearTimerRef.current = setTimeout(() => {
      const current = transitionRef.current;
      if (current) {
        setSettledIndex(current.to);
      }
      setTransition(null);
      setAnimate(false);
    }, SLIDE_MS);

    return () => {
      if (clearTimerRef.current) {
        clearTimeout(clearTimerRef.current);
      }
    };
  }, [transition, animate]);

  return {
    displayIndex,
    isSliding,
    transition,
    enterX,
    exitX,
    animate,
  };
}
