"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  researchFeatureTabs,
  type ResearchFeatureItem,
  type ResearchFeatureTab,
} from "./research-features-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const ITEM_STAGGER_MS = 100;
const ITEM_FADE_MS = 500;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useStaggeredReveal(activeKey: string) {
  const listRef = useRef<HTMLUListElement>(null);
  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setInView(true);
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }

    setRevealed(false);
  }, [inView, activeKey]);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }

    const timeout = window.setTimeout(() => setRevealed(true), 50);
    return () => window.clearTimeout(timeout);
  }, [inView, activeKey]);

  return { listRef, revealed };
}

type FeatureItemsListProps = {
  items: ResearchFeatureItem[];
  activeKey: string;
};

function FeatureItemsList({ items, activeKey }: FeatureItemsListProps) {
  const { listRef, revealed } = useStaggeredReveal(activeKey);

  return (
    <ul
      ref={listRef}
      className="grid min-w-0 gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12 lg:gap-x-16 lg:gap-y-14"
    >
      {items.map(({ label, Icon }, index) => (
        <li
          key={label}
          className={`flex flex-col gap-4 transition-[opacity,transform] ease-out motion-reduce:transition-none ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{
            transitionDuration: `${ITEM_FADE_MS}ms`,
            transitionDelay: revealed ? `${index * ITEM_STAGGER_MS}ms` : "0ms",
          }}
        >
          <Icon className="size-7 shrink-0 text-white" aria-hidden />
          <p className="max-w-md text-base font-medium leading-snug text-white sm:text-lg sm:leading-7">
            {label}
          </p>
        </li>
      ))}
    </ul>
  );
}

type TabPillProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function TabPill({ label, isActive, onClick }: TabPillProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={`w-fit border-b-2 pb-2 text-left text-base font-semibold text-white transition-colors sm:text-lg ${
        isActive
          ? "border-brand-orange"
          : "border-transparent hover:text-white/80"
      }`}
    >
      {label}
    </button>
  );
}

/** Features / Benefits section with flat black background. */
export function ResearchFeaturesSection() {
  const [activeTab, setActiveTab] = useState<ResearchFeatureTab>("features");
  const tabContent = researchFeatureTabs[activeTab];

  return (
    <section className="bg-custom-black py-16 text-white sm:py-20 lg:py-24">
      <div
        className={`${pageInset} grid gap-12 lg:grid-cols-[minmax(0,16rem)_1fr] lg:items-start lg:gap-16 xl:grid-cols-[minmax(0,18rem)_1fr] xl:gap-20`}
      >
        <div className="flex flex-col gap-8 sm:gap-10">
          <h2 className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
            {tabContent.heading}
          </h2>

          <div
            className="flex flex-col gap-3 sm:gap-4"
            role="tablist"
            aria-label="Feature categories"
          >
            {(Object.keys(researchFeatureTabs) as ResearchFeatureTab[]).map(
              (tab) => (
                <TabPill
                  key={tab}
                  label={researchFeatureTabs[tab].label}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              ),
            )}
          </div>
        </div>

        <FeatureItemsList items={tabContent.items} activeKey={activeTab} />
      </div>
    </section>
  );
}
