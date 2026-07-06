import { ResearchHeroCardStack } from "./research-hero-card-stack";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Research page hero */
export function ResearchHero() {
  return (
    <section
      id="science"
      className="relative isolate overflow-hidden text-custom-black bg-white pb-24"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/science-hero.mp4"
      />
      <div
        className={`${pageInset} relative z-10 flex min-h-[calc(var(--stable-vh,100svh)-5rem)] flex-col justify-center py-20 pt-24 sm:py-24 sm:pt-28 lg:block lg:py-28 lg:pt-32`}
      >
        <div className="flex w-full max-w-lg flex-col items-start text-left sm:max-w-xl lg:absolute lg:top-1/2 lg:left-0 lg:max-w-[34rem] lg:-translate-y-1/2">
          <h1 className="custom-md-title-bold">
            The Research Behind Persona-Based Cognitive Alignment
          </h1>
          <p className="mt-5 custom-body text-custom-black">
          Personality tools help people understand tendencies. Process tools help teams organize work. DPD helps people align how they think, relate, and work together in the moment.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-10 custom-label-bold text-white shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black sm:mt-10 sm:h-14 sm:px-12"
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
