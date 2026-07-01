"use client";

import { useEffect, useRef, useState } from "react";

import type { StrengthItem } from "../survey-data";
import { STRENGTH_ICONS } from "../survey-strength-icons";

const FADE_MS = 600;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function StrengthRow({
  item,
  isLast,
}: {
  item: StrengthItem;
  isLast: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = STRENGTH_ICONS[item.icon];

  useEffect(() => {
    const el = rowRef.current;
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
    <div
      ref={rowRef}
      className={`flex gap-5 py-7 transition-opacity ease-out motion-reduce:transition-none sm:gap-7 ${
        isLast ? "" : "border-b border-custom-black/10"
      } ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange sm:size-16">
        <Icon className="size-7 sm:size-8" aria-hidden />
      </div>
      <div className="flex flex-col gap-1.5 pt-1">
        <h3 className="custom-body-bold text-custom-black">{item.subtitle}</h3>
        <p className="custom-body text-custom-black">{item.body}</p>
      </div>
    </div>
  );
}

export function StrengthsList({ items }: { items: StrengthItem[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <StrengthRow key={item.subtitle} item={item} isLast={i === items.length - 1} />
      ))}
    </div>
  );
}
