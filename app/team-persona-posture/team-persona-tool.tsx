"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { initializeTextReveal } from "./text-reveal";
import { initializeScriptChat } from "./script-chat";
import { initializeFrictionReveal } from "./friction-reveal";
import { initializeMeetingTimeline } from "./meeting-timeline";
import markup from "./team-persona-markup.json";
import { initializeTeamPersonaTool } from "./team-persona-engine";
import { isSubmittedTeam, TEAM_SUBMISSION_KEY, type TeamState } from "./team-state";
import "./team-persona-tool.css";

export function TeamPersonaTool({ mode = "form" }: { mode?: "form" | "results" }) {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const content = markup;
  const initializeTool = initializeTeamPersonaTool;
  const initializeTimeline = initializeMeetingTimeline;
  const initializeReveal = initializeFrictionReveal;
  const initializeChat = initializeScriptChat;
  const initializeText = initializeTextReveal;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let initialState: TeamState | undefined;
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(TEAM_SUBMISSION_KEY) || "null");
      if (isSubmittedTeam(saved)) initialState = saved;
    } catch { /* A new submission is needed if session storage is unavailable. */ }
    if (mode === "results" && !initialState) {
      router.replace("/team-persona-posture#team-calculator");
      return;
    }
    element.innerHTML = content;
    const tool = initializeTool(element, initialState);
    const cleanupTimeline = initializeTimeline(element);
    const cleanupReveal = mode === "results" ? initializeReveal(element) : () => {};
    const cleanupChat = mode === "results" ? initializeChat(element) : () => {};
    const cleanupText = initializeText(element);
    const entryPanel = element.querySelector<HTMLElement>(".entry-panel");
    const rosterPanel = element.querySelector<HTMLElement>(".team-roster-panel");
    const sizeRoster = () => {
      if (entryPanel && rosterPanel) {
        rosterPanel.style.setProperty("--entry-panel-height", `${entryPanel.getBoundingClientRect().height}px`);
      }
    };
    const rosterObserver = new ResizeObserver(sizeRoster);
    if (entryPanel) rosterObserver.observe(entryPanel);
    sizeRoster();
    element.dataset.ready = "true";
    const chart = mode === "results" ? element.querySelector<HTMLElement>(".posture-chart") : null;
    const chartAnimations: Animation[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const chartObserver = new IntersectionObserver(entries => {
      if (!chart || chart.dataset.revealed || element.closest("[inert]")) return;
      if (!entries.some(entry => entry.isIntersecting)) return;
      chart.dataset.revealed = "true";
      chartObserver.disconnect();
      if (reducedMotion.matches) return;
      chart.querySelectorAll("circle").forEach(circle => {
        const finalDash = circle.getAttribute("stroke-dasharray") || "";
        chartAnimations.push(circle.animate([
          { strokeDasharray: `0 ${2 * Math.PI * 86}`, opacity: 0 },
          { strokeDasharray: finalDash, opacity: 1 },
        ], { duration: 1100, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }));
      });
      chartAnimations.push(chart.querySelector(".chart-percent")!.animate(
        [{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: 250, fill: "backwards" },
      ));
    }, { threshold: 0.35 });
    if (chart) chartObserver.observe(chart);
    // The email popup makes results inert; wait until it has been unlocked.
    const gateObserver = new MutationObserver(() => {
      if (chart && !chart.dataset.revealed && !element.closest("[inert]")) {
        chartObserver.unobserve(chart);
        chartObserver.observe(chart);
      }
    });
    if (chart) gateObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["inert"] });
    const form = element.querySelector<HTMLFormElement>("#team-posture-form");
    const error = element.querySelector<HTMLElement>("#team-form-error");
    const submit = (event: Event) => {
      event.preventDefault();
      if (tool.hasPendingMember()) {
        if (error) error.textContent = "Add or save the member in the form before viewing team results.";
        element.querySelector<HTMLButtonElement>("#addMember")?.focus();
        return;
      }
      const state = tool.getState();
      if (!isSubmittedTeam(state)) {
        if (error) error.textContent = "Add at least one team member and choose a Primary Persona for every member.";
        form?.querySelector<HTMLSelectElement>("select.unset:not(:disabled)")?.focus();
        return;
      }
      try {
        sessionStorage.setItem(TEAM_SUBMISSION_KEY, JSON.stringify(state));
        router.push("/team-persona-posture/results");
      } catch {
        if (error) error.textContent = "Allow session storage in your browser to view your team results.";
      }
    };
    form?.addEventListener("submit", submit);
    const slides = Array.from(element.querySelectorAll<HTMLImageElement>(".cta-slide"));
    let current = 0;
    const interval = window.setInterval(() => {
      if (document.hidden || slides.length < 2) return;
      slides[current].classList.remove("is-active");
      slides[current].setAttribute("aria-hidden", "true");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
      slides[current].setAttribute("aria-hidden", "false");
    }, 4000);
    return () => {
      rosterObserver.disconnect();
      chartObserver.disconnect();
      gateObserver.disconnect();
      chartAnimations.forEach(animation => animation.cancel());
      cleanupTimeline();
      cleanupReveal();
      cleanupChat();
      cleanupText();
      tool.destroy();
      form?.removeEventListener("submit", submit);
      window.clearInterval(interval);
    };
  }, [mode, router, content, initializeTool, initializeTimeline, initializeReveal, initializeChat, initializeText]);

  return <div ref={root} className={`team-persona-tool team-${mode}`} />;
}
