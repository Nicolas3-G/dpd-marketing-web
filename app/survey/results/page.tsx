import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { isValidAnswers, personaMaxScores } from "../full-survey";
import { computeScores } from "../survey-data";
import { PersonalResults } from "./personal-results";

export const metadata = createPageMetadata("Your Full Persona Profile", {
  description: "Explore your primary and secondary personas, combined profile, growth opportunities, and communication playbook.",
});

export default async function SurveyResultsPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  if (typeof params.a !== "string") redirect("/survey");
  let answers: number[];
  try { answers = atob(params.a).split(",").map(Number); }
  catch { redirect("/survey"); }
  if (!isValidAnswers(answers)) redirect("/survey");
  const initialReport = typeof params.report === "string" && ["combination", "primary", "secondary", "growth", "communication"].includes(params.report) ? params.report : null;
  return <PersonalResults scores={computeScores(answers)} maxScores={personaMaxScores} initialReport={initialReport} />;
}
