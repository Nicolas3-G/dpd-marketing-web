import type { ComponentType } from "react";

import { Instrument_Serif } from "next/font/google";

import type {
  ResearchScienceCard,
  ResearchScienceGraphic,
} from "./research-science-cards";

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const WAVE_PATH = "M4 54 C 44 20, 84 76, 124 42 S 204 58, 264 36";

function PrimingTheoryGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d={WAVE_PATH}
        stroke="#d4d4d4"
        strokeWidth="1"
        fill="none"
        opacity={0.65}
      />
      {[
        { cx: 20, cy: 48, opacity: 0.4, r: 4.5 },
        { cx: 52, cy: 30, opacity: 0.55, r: 4.5 },
        { cx: 84, cy: 62, opacity: 0.5, r: 4.5 },
        { cx: 116, cy: 40, opacity: 0.35, r: 4.5 },
        { cx: 148, cy: 52, opacity: 0.28, r: 4.5 },
        { cx: 180, cy: 34, opacity: 0.45, r: 4.5 },
        { cx: 212, cy: 46, opacity: 0.6, r: 4.5 },
        { cx: 244, cy: 36, opacity: 0.75, r: 5 },
      ].map((dot, index) => (
        <circle
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="var(--brand-orange)"
          opacity={dot.opacity}
        />
      ))}
      <circle cx={264} cy={36} r={13} fill="var(--brand-orange)" />
      <circle cx={264} cy={36} r={21} stroke="#e5e5e5" strokeWidth="1" />
      <circle cx={264} cy={36} r={29} stroke="#ececec" strokeWidth="1" />
      <circle cx={264} cy={36} r={37} stroke="#f2f2f2" strokeWidth="1" />
    </svg>
  );
}

function GameTheoryGraphic({ className }: { className?: string }) {
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 1],
    [1, 4],
    [2, 5],
  ];
  const nodes = [
    { cx: 140, cy: 110, r: 16, fill: "var(--brand-orange)", hub: true },
    { cx: 48, cy: 52, r: 10, fill: "var(--brand-orange)" },
    { cx: 232, cy: 40, r: 9, fill: "#d4d4d4" },
    { cx: 252, cy: 168, r: 8, fill: "var(--brand-orange)", opacity: 0.85 },
    { cx: 32, cy: 178, r: 9, fill: "#d4d4d4" },
    { cx: 200, cy: 184, r: 10, fill: "#d8d8d8" },
    { cx: 104, cy: 24, r: 7, fill: "#dcdcdc" },
  ];

  return (
    <svg
      viewBox="0 0 280 210"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {edges.map(([from, to], index) => (
        <line
          key={index}
          x1={nodes[from].cx}
          y1={nodes[from].cy}
          x2={nodes[to].cx}
          y2={nodes[to].cy}
          stroke="#d0d0d0"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
      {[
        { cx: 88, cy: 72, r: 3, opacity: 0.7 },
        { cx: 176, cy: 64, r: 2.5, opacity: 0.5 },
        { cx: 58, cy: 98, r: 2.5, opacity: 0.55 },
        { cx: 214, cy: 92, r: 3, opacity: 0.65 },
        { cx: 158, cy: 148, r: 2.5, opacity: 0.45 },
      ].map((dot, index) => (
        <circle
          key={`accent-${index}`}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="var(--brand-orange)"
          opacity={dot.opacity}
        />
      ))}
      {nodes.map((node, index) => (
        <g key={index}>
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={node.fill}
            opacity={"opacity" in node ? node.opacity : 1}
          />
          {node.hub ? (
            <circle cx={node.cx} cy={node.cy} r={5} fill="white" />
          ) : null}
        </g>
      ))}
    </svg>
  );
}

const TALL_SCIENCE_GRAPHICS = new Set<ResearchScienceGraphic>(["game-theory"]);

const CARD_GRAPHICS: Record<
  ResearchScienceGraphic,
  ComponentType<{ className?: string }>
> = {
  priming: PrimingTheoryGraphic,
  "game-theory": GameTheoryGraphic,
};

export function ResearchHeroScienceCard({
  tag,
  title,
  activatedBy,
  graphic,
}: ResearchScienceCard) {
  const Graphic = CARD_GRAPHICS[graphic];
  return (
    <div className="flex h-full flex-col overflow-hidden p-6 sm:p-7">
      <span className="inline-flex w-fit rounded-full border border-brand-orange px-3 py-1 custom-caption text-brand-orange">
        {tag}
      </span>
      <h3 className={`${displaySerif.className} mt-4 custom-sm-title text-custom-black sm:mt-5`}>
        {title}
      </h3>
      <p className="mt-4 custom-label text-custom-black leading-relaxed sm:mt-5">
        <span className="custom-label-bold text-brand-orange">Activated by: </span>
        {activatedBy}
      </p>
     
    </div>
  );
}
