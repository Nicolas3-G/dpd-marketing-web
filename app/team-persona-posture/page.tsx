import { HiArrowDown } from "react-icons/hi";
import { createPageMetadata } from "@/lib/metadata";
import { TeamPersonaTool } from "./team-persona-tool";

export const metadata = createPageMetadata("Team Persona Posture", {
  description: "Explore your team’s primary and secondary personas, discover potential friction points, and choose the meeting mode your work needs.",
});

export default function TeamPersonaPosturePage() {
  return (
    <main className="flex-1 bg-background text-custom-black">
      <section className="relative isolate flex min-h-[min(85svh,800px)] items-center overflow-hidden">
        <video src="/videos/webinars-hero.mp4" autoPlay muted loop playsInline aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/55" aria-hidden />
        <div className="relative mx-5 w-[calc(100%-40px)] py-28 sm:mx-[45px] sm:w-[calc(100%-90px)] lg:py-36">
          <p className="custom-body-bold uppercase text-brand-orange">DPD Framework · Team Tool</p>
          <h1 className="custom-lg-title-bold mt-6 max-w-4xl">Individual personas.<br />A shared team posture.</h1>
          <p className="custom-body mt-7 max-w-xl">See how your team dreams, plans, and does. Turn individual survey results into a clearer picture of your collective strengths—and what the work needs next.</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#team-calculator" className="inline-flex h-14 items-center gap-3 rounded-full bg-brand-orange px-8 custom-label-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-orange-hover">Explore your team <HiArrowDown aria-hidden className="text-lg" /></a>
          </div>
          <p className="custom-label mt-6 text-light">No account needed. Team details stay in this page.</p>
        </div>
      </section>
      <div className="mx-5 grid w-[calc(100%-40px)] gap-8 border-b border-custom-black/15 py-12 sm:mx-[45px] sm:w-[calc(100%-90px)] md:grid-cols-3 sm:py-16">
        {[
          ["01", "Bring your results", "Add each member’s primary and secondary persona from the full DPD survey."],
          ["02", "See your shared posture", "Explore the team’s natural lean, backup strengths, and potential friction."],
          ["03", "Choose your next move", "Use a meeting mode that matches what the work needs right now."],
        ].map(([step, title, body]) => <div key={step} className="flex gap-5"><span className="custom-body-bold text-brand-orange">{step}</span><div><h2 className="custom-body-bold">{title}</h2><p className="custom-label mt-2 max-w-sm text-light">{body}</p></div></div>)}
      </div>
      <TeamPersonaTool />
    </main>
  );
}
