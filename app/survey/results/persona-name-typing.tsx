"use client";

import { useEffect, useState } from "react";

const CHAR_DELAY_MS = 110;

export function PersonaNameTyping({ text }: { text: string }) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setVisibleChars(0);
    setDone(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleChars(text.length);
      setDone(true);
      return;
    }

    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setVisibleChars(i);
      if (i >= text.length) {
        window.clearInterval(interval);
        setDone(true);
      }
    }, CHAR_DELAY_MS);

    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <span>
      {text.slice(0, visibleChars)}
      <span
        aria-hidden
        className={`ml-1 inline-block h-[0.8em] w-[0.06em] translate-y-[0.05em] bg-current align-middle motion-reduce:hidden ${
          done ? "[animation:caret-blink_1s_steps(1)_infinite]" : "opacity-100"
        }`}
      />
    </span>
  );
}
