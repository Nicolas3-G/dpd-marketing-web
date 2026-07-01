"use client";

import { useEffect, useRef, useState } from "react";

const ITEM_STAGGER_MS = 150;
const FADE_MS = 600;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function UnlockBulletItem({ text, index }: { text: string; index: number }) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={itemRef}
      className={`flex items-center justify-center gap-2.5 custom-body text-white/80 transition-opacity ease-out motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transitionDuration: `${FADE_MS}ms`,
        transitionDelay: visible ? `${index * ITEM_STAGGER_MS}ms` : "0ms",
      }}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
      <span>{text}</span>
    </li>
  );
}

export function UnlockBullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex max-w-[18rem] flex-col items-center gap-2 text-center">
      {items.map((item, index) => (
        <UnlockBulletItem key={item} text={item} index={index} />
      ))}
    </ul>
  );
}
