import { ResearchHeroCardStack } from "./research-hero-card-stack";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Research page hero */
export function ResearchHero() {
  return (
    <section
      id="research"
      className="relative isolate overflow-x-clip  text-custom-black bg-white pb-24"
    >
      <div
        className={`${pageInset} relative flex min-h-[calc(100svh-5rem)] flex-col justify-center py-20 pt-24 sm:py-24 sm:pt-28 lg:block lg:py-28 lg:pt-32`}
      >
        <div className="flex w-full max-w-lg flex-col items-start text-left sm:max-w-xl lg:absolute lg:top-1/2 lg:left-0 lg:max-w-[34rem] lg:-translate-y-1/2">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
            The science behind persona-based behavior coordination.
          </h1>
          <p className="mt-5 text-base font-normal text-custom-black sm:mt-6 sm:text-lg">
            Beyond personality tests—research that helps teams dream, plan, and
            do in sync.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-10 text-base font-bold text-custom-black shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black sm:mt-10 sm:h-14 sm:px-12 sm:text-lg"
          >
            Explore the Science
          </a>
        </div>

        <div className="relative hidden min-h-[320px] overflow-visible lg:absolute lg:top-28 lg:right-0 lg:left-[calc(34rem+4.5rem)] lg:block lg:min-h-0 xl:top-36">
          <ResearchHeroCardStack />
        </div>
      </div>
    </section>
  );
}
