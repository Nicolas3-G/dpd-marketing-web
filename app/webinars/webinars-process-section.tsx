import { webinarsProcessContent } from "./webinars-process-data";

function ProcessStep({
  number,
  title,
  description,
}: (typeof webinarsProcessContent.steps)[number]) {
  return (
    <li className="flex gap-5 sm:gap-7">
      <span
        className="shrink-0 text-3xl font-bold leading-none tabular-nums text-brand-orange sm:text-4xl"
        aria-hidden
      >
        {number}.
      </span>
      <div className="min-w-0 pt-0.5">
        <h3 className="text-lg font-bold leading-snug text-custom-black sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-light sm:text-base sm:leading-7">
          {description}
        </p>
      </div>
    </li>
  );
}

/** Two-column section: full-height image flush left; steps on the right. */
export function WebinarsProcessSection() {
  const { overline, heading, steps } = webinarsProcessContent;

  return (
    <section
      id="webinars-process"
      className="overflow-hidden bg-white text-custom-black"
    >
      <div className="grid w-full items-stretch gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-12 xl:gap-16">
        <div
          className="min-h-48 w-full bg-custom-black sm:min-h-56 lg:min-h-0 lg:h-full"
          aria-hidden
        />

        <div className="flex min-h-0 flex-col px-5 py-12 sm:px-[45px] sm:py-14 lg:py-16 lg:pl-12 xl:pl-16">
          <div className="flex items-center gap-3">
            <span
              className="h-0.5 w-6 shrink-0 bg-brand-orange sm:w-7"
              aria-hidden
            />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
              {overline}
            </p>
          </div>

          <h2 className="mt-4 custom-sm-title-bold">
            {heading}
          </h2>

          <ol className="mt-7 flex list-none flex-col gap-6 sm:mt-8 sm:gap-7 lg:max-w-none">
            {steps.map((step) => (
              <ProcessStep key={step.number} {...step} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
