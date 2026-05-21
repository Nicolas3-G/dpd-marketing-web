"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SlidingUnderlineState = {
  left: number;
  width: number;
  active: boolean;
};

/** Spring underline matching site header nav (`duration-220` + overshoot ease). */
export const SLIDING_UNDERLINE_CLASS =
  "pointer-events-none absolute bottom-0 z-10 h-px bg-black transition-[left,width,opacity] duration-220 ease-[cubic-bezier(0.26,0.74,0.44,1.24)]";

export function useSlidingUnderline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const [line, setLine] = useState<SlidingUnderlineState>({
    left: 0,
    width: 0,
    active: false,
  });

  const syncLine = useCallback((el: HTMLElement) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    targetRef.current = el;
    const cr = container.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setLine({
      left: er.left - cr.left,
      width: er.width,
      active: true,
    });
  }, []);

  const hideLine = useCallback(() => {
    targetRef.current = null;
    setLine((prev) => ({ ...prev, active: false }));
  }, []);

  useEffect(() => {
    if (!line.active) {
      return;
    }

    function remeasure() {
      const container = containerRef.current;
      const target = targetRef.current;
      if (!container || !target) {
        return;
      }
      const cr = container.getBoundingClientRect();
      const er = target.getBoundingClientRect();
      setLine({
        left: er.left - cr.left,
        width: er.width,
        active: true,
      });
    }

    window.addEventListener("resize", remeasure);
    return () => window.removeEventListener("resize", remeasure);
  }, [line.active]);

  return { containerRef, line, syncLine, hideLine };
}
