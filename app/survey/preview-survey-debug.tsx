import Link from "next/link";
import { allQuestions } from "./full-survey";
import { PERSONAS } from "./survey-data";

export function PreviewSurveyDebug() {
  if (process.env.VERCEL_ENV !== "preview") return null;

  return <aside aria-label="Preview survey shortcuts" className="mb-10 border border-dashed border-brand-orange bg-white p-6 sm:p-8">
    <p className="custom-label-bold uppercase tracking-wider text-brand-orange">Preview only · Results shortcuts</p>
    <h2 className="custom-xs-title-bold mt-3">Review every persona combination</h2>
    <p className="custom-body mt-3 text-light">Skip the survey with sample answers. Each shortcut sets the primary persona first and the secondary persona second.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {PERSONAS.flatMap(primary => PERSONAS.filter(secondary => secondary !== primary).map(secondary => {
        const answers = allQuestions.map(question => question.persona === primary ? 5 : question.persona === secondary ? 3 : 0);
        const encoded = btoa(answers.join(","));
        return <Link key={`${primary}-${secondary}`} href={`/survey/results?a=${encodeURIComponent(encoded)}`} className="border border-custom-black/20 px-5 py-4 transition hover:border-custom-black hover:bg-custom-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">
          <span className="custom-body-bold">{primary} + {secondary}</span>
          <span className="custom-label mt-1 block">Primary: {primary} · Secondary: {secondary}</span>
        </Link>;
      }))}
    </div>
  </aside>;
}
