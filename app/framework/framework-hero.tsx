const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const personaCards = [
  { label: "Dreamers" },
  { label: "Planners" },
  { label: "Doers" },
] as const;

/** Framework page hero — edit here without affecting the homepage. */
export function FrameworkHero() {
  return (
    <section
      id="framework"
      className="relative isolate overflow-hidden bg-background pb-20 text-[#111111] sm:pb-24 lg:pb-28"
    >
      <div
        className={`relative z-10 ${pageInset} flex flex-col items-center pt-24 text-center sm:pt-28 lg:pt-32`}
      >
        <p className="text-sm font-bold text-black sm:text-base">
          A Breakthrough in Cultural Science
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:mt-7 sm:text-5xl lg:text-6xl">
          The DPD Framework
        </h1>
        <p className="mt-8 max-w-3xl text-base font-normal leading-7 text-black sm:mt-10 sm:text-lg sm:leading-8">
          The Dreamer-Planner-Doer (DPD) Framework is a behavioral operating
          system designed to enhance team collaboration and productivity by
          identifying three key personas:
        </p>

        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-10 lg:mt-24 lg:gap-12">
          {personaCards.map(({ label }) => (
            <figure key={label} className="flex flex-col items-center">
              <div
                className="aspect-square w-full max-w-44 bg-black sm:max-w-48 lg:max-w-52"
                aria-hidden
              />
              <figcaption className="mt-3 text-xl font-bold text-black sm:mt-4 sm:text-2xl lg:text-3xl">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
