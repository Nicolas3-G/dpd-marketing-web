import Link from "next/link";
import { EmailGate } from "./email-gate";
import { createPageMetadata } from "@/lib/metadata";
import { TeamPersonaTool } from "../team-persona-tool";

export const metadata = createPageMetadata("Your Team Posture Results", {
  description: "Your submitted team’s persona posture, strengths, and practical guidance.",
});

export default function TeamPostureResultsPage() {
  return <main className="flex-1 bg-background pt-28 text-custom-black">
    <EmailGate>
    <header className="mx-5 sm:mx-[45px]">
      <Link href="/team-persona-posture#team-calculator" className="custom-label-bold text-brand-orange">← Edit team</Link>
      <h1 className="custom-lg-title-bold mt-6">Your team posture results</h1>
      <p className="custom-body mt-5 max-w-2xl text-light">Your collective strengths, backup personas, and next steps—based on the team you submitted.</p>
    </header>
    <TeamPersonaTool mode="results" />
    </EmailGate>
  </main>;
}
