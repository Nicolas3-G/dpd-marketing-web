"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { HiArrowDown, HiArrowLeft, HiArrowRight, HiCheck } from "react-icons/hi";
import { PERSONAS, type Persona } from "../survey-data";
import reports from "./mobile-reports.json";

const inset = "mx-5 sm:mx-[45px]";
const label = "custom-label-bold uppercase tracking-[0.08em] text-brand-orange";
const body = "custom-body text-custom-black";
const tabsClass = "flex flex-wrap gap-2";
const tabClass = (selected: boolean) => `rounded-full border px-5 py-3 custom-label-bold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black ${selected ? "border-custom-black bg-custom-black text-white" : "border-gray-card-border bg-white text-custom-black hover:border-custom-black"}`;
const reportLinks = [
  { id: "combination", title: "Your persona combination", description: "How your top two personas work together." },
  { id: "primary", title: "Your primary persona", description: "Explore the persona you naturally lead with." },
  { id: "secondary", title: "Your secondary persona", description: "Explore the persona that supports your primary." },
  { id: "growth", title: "Your growth opportunity", description: "Practice your least-expressed persona." },
  { id: "communication", title: "Communication playbook", description: "Connect more effectively with every persona." },
];

function Text({ children }: { children: ReactNode }) {
  return <p className={body}>{children}</p>;
}
function BulletList({ items }: { items: string[] }) {
  return <ul className="mt-4 space-y-3">{items.map((item, i) => <li key={i} className="flex gap-3 custom-body text-custom-black"><HiCheck aria-hidden className="mt-1 size-5 shrink-0 text-brand-orange" /><span>{item}</span></li>)}</ul>;
}
function Topic({ title, children }: { title: string; children: ReactNode }) {
  return <section className="space-y-4"><h3 className="custom-xxs-title-bold text-custom-black">{title}</h3>{children}</section>;
}
function Report({ index, id, title, description, children }: { index: number; id: string; title: string; description: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-title`}>
    <div className="mb-8 flex items-start gap-4 sm:gap-7">
      {index > 0 ? <span className="custom-label-bold pt-1 text-brand-orange">0{index}</span> : null}
      <div><h2 id={`${id}-title`} tabIndex={-1} className="custom-xs-title-bold text-custom-black outline-none">{title}</h2><p className="custom-label mt-2 text-light">{description}</p></div>
    </div>
    <div className="pb-12">{children}</div>
  </section>;
}

export function PersonalResults({ scores, maxScores, initialReport = null }: { scores: number[]; maxScores: number[]; initialReport?: string | null }) {
  const ranked = PERSONAS.map((persona, i) => ({ persona, score: scores[i], maximum: maxScores[i] })).sort((a, b) => b.score - a.score);
  const [primary, secondary, third] = ranked;
  const combinationKey = `${primary.persona}+${secondary.persona}` as keyof typeof reports.combined;
  const combination = reports.combined[combinationKey];
  const [communication, setCommunication] = useState<Persona>(PERSONAS[0]);
  const comm = reports.profiles[communication].communication;
  const growth = reports.growth[third.persona];

  const [activeReport, setActiveReport] = useState<string | null>(initialReport);
  const [leavingReport, setLeavingReport] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const browserRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const exploreReport = (id: string | null) => {
    if (transitioning || id === activeReport) return;
    if (!id && window.history.state?.dpdReportEntry) {
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("report", id);
    else url.searchParams.delete("report");
    window.history.pushState({ dpdReportEntry: Boolean(id) }, "", url);
    if (id === "communication") setCommunication(PERSONAS[0]);
    setLeavingReport(activeReport);
    setActiveReport(id);
    setTransitioning(true);
  };
  useEffect(() => {
    const restoreReport = () => {
      const requested = new URL(window.location.href).searchParams.get("report");
      const id = reportLinks.slice(1).some(report => report.id === requested) ? requested : null;
      if (id === activeReport) return;
      if (id === "communication") setCommunication(PERSONAS[0]);
      setLeavingReport(activeReport);
      setActiveReport(id);
      setTransitioning(true);
    };
    window.addEventListener("popstate", restoreReport);
    return () => window.removeEventListener("popstate", restoreReport);
  }, [activeReport]);
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, []);
  useLayoutEffect(() => {
    if (!transitioning) return;
    const browser = browserRef.current;
    const incoming = activeReport ? reportRef.current : selectionRef.current;
    const outgoing = activeReport ? selectionRef.current : reportRef.current;
    if (!browser || !incoming || !outgoing) return;
    const rect = browser.getBoundingClientRect();
    // Keep both views at the same origin and travel beyond the viewport edges.
    browser.style.minHeight = `${outgoing.getBoundingClientRect().height}px`;
    outgoing.style.position = "absolute";
    outgoing.style.inset = "0 0 auto";
    const forward = activeReport !== null;
    const enter = forward ? window.innerWidth - rect.left + 24 : -rect.right - 24;
    const exit = forward ? -rect.right - 24 : window.innerWidth - rect.left + 24;
    const timing = { fill: "both" as const, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" };
    const incomingAnimation = incoming.animate([{ transform: `translateX(${enter}px)` }, { transform: "translateX(0)" }], timing);
    const outgoingAnimation = outgoing.animate([{ transform: "translateX(0)" }, { transform: `translateX(${exit}px)` }], timing);
    // Avoid a scroll jump when opening a card already in view.
    if (rect.top < 80 || rect.top > window.innerHeight - 100) {
      document.getElementById("report-browser")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    incomingAnimation.onfinish = () => {
      setTransitioning(false);
      document.getElementById(activeReport ? `${activeReport}-title` : "reports-title")?.focus({ preventScroll: true });
    };
    return () => {
      incomingAnimation.cancel();
      outgoingAnimation.cancel();
      outgoing.style.position = "";
      outgoing.style.inset = "";
      browser.style.minHeight = "";
    };
  }, [activeReport, transitioning]);
  const shownReport = activeReport ?? leavingReport;

  return <main className="overflow-x-clip bg-background pt-28 text-custom-black sm:pt-36">
    <section className={`${inset} grid items-center gap-10 pb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,.8fr)] lg:gap-20 sm:pb-20`}>
      <div>
        <p className={label}>Your full DPD results</p>
        <h1 className="custom-lg-title-bold mt-5">{primary.persona}<br /><span className="text-brand-orange"><span className="inline-block" aria-hidden="true">+</span><span className="sr-only">plus</span> {secondary.persona}</span></h1>
        <p className="custom-body mt-5 max-w-2xl text-light">Your primary persona is where you tend to start; your secondary adds another way to contribute. You can practice all three.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button type="button" onClick={() => document.getElementById("report-browser")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" })} className="inline-flex h-14 items-center gap-3 rounded-full bg-brand-orange px-7 custom-label-bold text-white transition hover:bg-brand-orange-hover">Explore your profile <HiArrowDown aria-hidden className="size-5" /></button>
          <Link href="/survey#assessment" className="inline-flex h-14 items-center gap-2 px-2 custom-label-bold">Retake survey <HiArrowRight aria-hidden className="size-4" /></Link>
        </div>
      </div>
      <aside className="rounded-2xl bg-custom-black p-7 text-white sm:p-9" aria-label="Your ranked persona scores">
        <p className="custom-label-bold uppercase tracking-[0.08em] text-white-light">Your profile at a glance</p>
        <div className="mt-7 space-y-7">{ranked.map(({ persona, score, maximum }, i) => <div key={persona}>
          <div className="mb-2 flex items-end justify-between gap-4"><div><p className="custom-label text-white-light">{["Primary", "Secondary", "Least expressed"][i]}</p><p className="custom-body-bold mt-1">{persona}</p></div><p className="custom-label tabular-nums"><strong className="custom-body-bold">{score}</strong> / {maximum}</p></div>
          <div className="h-2 overflow-hidden rounded-full bg-white/15"><div className={`personal-score-fill h-full origin-left rounded-full ${i === 0 ? "bg-brand-orange" : i === 1 ? "bg-white/75" : "bg-white/40"}`} style={{ width: `${Math.max(0, score / maximum) * 100}%`, animationDelay: `${200 + i * 180}ms` }} /></div>
        </div>)}</div>
        <p className="custom-label mt-7 border-t border-white/20 pt-5 text-white-light">Weighted points, not percentages. Each persona has a different number of questions.</p>
      </aside>
    </section>

    <section id="report-browser" className={`${inset} scroll-mt-28 pb-16 sm:pb-24`} aria-labelledby="reports-title">
      <div ref={browserRef} className="personal-report-browser relative grid">
      <div ref={selectionRef} inert={activeReport !== null || transitioning} className={`col-start-1 row-start-1 min-w-0 ${activeReport && !transitioning ? "hidden" : ""}`}>
        <div className="border-t border-custom-black/15 py-10 sm:py-14"><p className={label}>Go a little deeper</p><h2 id="reports-title" tabIndex={-1} className="custom-sm-title mt-3 outline-none">Your results, at your pace.</h2><p className="custom-body mt-4 max-w-2xl text-light">Choose a report to explore your profile in more detail.</p></div>
        <div className="grid gap-5 pb-10 sm:grid-cols-2">{reportLinks.map((report, i) => <button key={report.id} type="button" onClick={() => exploreReport(report.id)} className="group flex min-h-60 flex-col items-start rounded-2xl border border-custom-black/10 bg-white p-7 text-left transition hover:border-custom-black focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-9">
          <span className="custom-label-bold text-brand-orange">0{i + 1}</span>
          <h3 className="custom-xs-title-bold mt-6">{report.title}</h3>
          <p className="custom-body mt-3 text-light">{report.description}</p>
          <HiArrowRight aria-hidden className="mt-7 size-6 self-end transition-transform group-hover:translate-x-1" />
        </button>)}</div>
      </div>
      <div ref={reportRef} inert={!activeReport || transitioning} className={`col-start-1 row-start-1 min-w-0 ${!activeReport && !transitioning ? "hidden" : ""}`}>
        <button type="button" onClick={() => exploreReport(null)} className="mb-8 inline-flex items-center gap-3 rounded-full border border-custom-black/20 px-5 py-3 custom-label-bold transition hover:bg-custom-black hover:text-white"><HiArrowLeft aria-hidden className="size-5" />All reports</button>
      {shownReport === reportLinks[0].id && <Report index={0} {...reportLinks[0]}>
        <div className="space-y-8 rounded-2xl bg-white p-6 sm:p-9">
          <div>
            <p className={label}>{primary.persona} + {secondary.persona}</p>
            <h3 className="custom-xs-title-bold mt-4">{combination.title}</h3>
            <p className="custom-body mt-4 max-w-3xl text-light">{combination["Core Identity"]}</p>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            <Topic title="Strengths"><Text>{combination.Strengths}</Text></Topic>
            <Topic title="Blind spots"><Text>{combination["Blind Spots"]}</Text></Topic>
            <Topic title="What helps you thrive"><Text>{combination.Needs}</Text></Topic>
            <Topic title="Your invoked stance"><Text>{combination["Invoked Stance"]}</Text></Topic>
          </div>
          <div className="grid gap-8 border-t border-custom-black/15 pt-8 sm:grid-cols-2">
            <Topic title="Common inclinations"><BulletList items={combination["Common Inclinations"]} /></Topic>
            <Topic title="Activated strengths"><BulletList items={combination["Activated Strengths"]} /></Topic>
            <Topic title="Friction risks"><BulletList items={combination["Friction Risks"]} /></Topic>
            <Topic title="Stretch points"><BulletList items={combination["Stretch Points"]} /></Topic>
          </div>
        </div>
      </Report>}
      {[primary, secondary].map(({ persona }, personaIndex) => {
        const report = reportLinks[personaIndex + 1];
        const profile = reports.profiles[persona];
        return shownReport === report.id ? <Report key={report.id} index={personaIndex + 1} {...report}>
        <div className="space-y-8 rounded-2xl bg-white p-6 sm:p-9">
          <Topic title={`Your ${persona} persona`}><Text>{profile.summary}</Text></Topic>
          <Topic title="Strengths"><div className="grid gap-6 sm:grid-cols-2">{profile.strengths.map(item => <div key={item.title}><h4 className="custom-body-bold">{item.title}</h4><p className="custom-body mt-2 text-light">{item.text}</p></div>)}</div></Topic>
          <Topic title="Challenges"><Text>{profile.challenge.text}</Text><BulletList items={profile.challenge.list} /></Topic>
          <Topic title="How other personas may perceive you"><div className="grid gap-5 md:grid-cols-2">{Object.entries(profile.perceivedBy).map(([other, perceptions], perspectiveIndex) => <div key={other} className={`rounded-xl p-5 sm:p-6 ${perspectiveIndex === 0 ? "bg-background" : "bg-custom-black text-white"}`}><h4 className="custom-body-bold">From a {other} perspective</h4><ul className="mt-3 space-y-3">{perceptions.map((item, i) => <li key={i} className={`custom-body ${perspectiveIndex === 0 ? "text-light" : "text-white/75"}`}><strong className={perspectiveIndex === 0 ? "text-custom-black" : "text-white"}>{item.bold}: </strong>{item.text}</li>)}</ul></div>)}</div></Topic>
          <Topic title="A useful reframe"><blockquote className="border-l-2 border-brand-orange pl-5 custom-body">{profile.reframe}</blockquote></Topic>
        </div>
        </Report> : null;
      })}
      {shownReport === reportLinks[3].id && <Report index={3} {...reportLinks[3]}>
        <div className="rounded-2xl bg-custom-black p-6 text-white sm:p-9"><p className="custom-label-bold uppercase tracking-[0.08em] text-brand-orange">Least expressed · {third.persona}</p><h3 className="custom-xs-title-bold mt-4">More range, not a fixed limitation.</h3><p className="custom-body mt-4 max-w-3xl text-white/75">Your {third.persona} persona scored lowest in this assessment. It is a posture you can practice, rather than an ability you don’t have.</p></div>
        <div className="mt-6 columns-1 gap-5 md:columns-2">{growth.map(topic => <section key={topic.id} className="mb-5 break-inside-avoid rounded-2xl bg-white p-6 sm:p-8">
          <h3 className="custom-xxs-title-bold text-custom-black">{topic.title}</h3>
          <div className="mt-5 space-y-5">{topic.blocks.map((block, j) => <div key={j}>{block.label ? <h4 className="custom-label-bold mb-2 text-light">{block.label}</h4> : null}{"text" in block ? <Text>{block.text}</Text> : <BulletList items={block.items} />}</div>)}</div>
        </section>)}</div>
      </Report>}
      {shownReport === reportLinks[4].id && <Report index={4} {...reportLinks[4]}>
        <div className={tabsClass} role="group" aria-label="Choose a communication guide">{PERSONAS.map(persona => <button type="button" key={persona} aria-pressed={communication === persona} className={tabClass(communication === persona)} onClick={() => setCommunication(persona)}>{persona}</button>)}</div>
        <div className="mt-6 rounded-2xl bg-white p-6 sm:p-9" key={communication}>
          <h3 className="custom-xs-title-bold">Connecting with a {communication}</h3>
          <div className="mt-7 grid gap-7 md:grid-cols-3"><Topic title="How they think"><Text>{comm.thinking}</Text></Topic><Topic title="Core motivators"><Text>{comm.motivators}</Text></Topic><Topic title="Typical filters"><Text>{comm.filters}</Text></Topic></div>
          <div className="mt-9 grid gap-9 md:grid-cols-2"><Topic title="To communicate effectively"><ul className="space-y-4">{comm["Effective Communication"].map((item, i) => <li key={i} className="custom-body"><strong>{item.title} </strong><span className="text-light">{item.text}</span></li>)}</ul></Topic><Topic title="Try opening with…"><div className="space-y-3">{comm.openers.map(opener => <p className="rounded-xl bg-background px-5 py-4 custom-body" key={opener}>{opener}</p>)}</div></Topic></div>
        </div>
      </Report>}
      </div>
      </div>
      <p className="custom-label border-t border-custom-black/15 pt-7 text-light">A snapshot of your current preferences, not a fixed label. Draw on Dreamer, Planner, and Doer as the work calls for them.</p>
    </section>
  </main>;
}
