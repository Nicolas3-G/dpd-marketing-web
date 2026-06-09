const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const personaCards = [
  { label: "Dreamer Persona" },
  { label: "Planner Persona" },
  { label: "Doer Persona" },
] as const;

/** Framework page hero — edit here without affecting the homepage. */
export function FrameworkHero() {
  return (
    <section
      id="framework"
      className="relative isolate overflow-hidden bg-background pb-20 text-custom-black sm:pb-24 lg:pb-28"
    >
      <div
        className={`relative z-10 ${pageInset} flex flex-col pt-24 sm:pt-28 lg:pt-32`}
      >
        <p className="custom-caption-bold text-custom-black">
          A Breakthrough in Cultural Science
        </p>
        <h1 className="mt-6 max-w-4xl custom-lg-title-bold leading-tight sm:mt-7">
          The DPD Framework
        </h1>
        <p className="mt-8 max-w-3xl custom-body text-custom-black">
          The Dreamer-Planner-Doer (DPD) Framework is a behavioral operating
          system designed to enhance team collaboration and productivity by
          identifying three key personas
        </p>

        <hr className="mt-16 w-full border-t border-custom-black/20 sm:mt-20 lg:mt-24" />

        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-12 self-center sm:mt-20 sm:grid-cols-3 sm:gap-10 lg:mt-24 lg:gap-12">
          {personaCards.map(({ label }) => (
            <figure key={label} className="flex flex-col items-center">
              <div
                className="aspect-square w-full max-w-44 bg-custom-black sm:max-w-48 lg:max-w-52"
                aria-hidden
              />
              <figcaption className="mt-3 custom-xs-title-bold text-custom-black">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
