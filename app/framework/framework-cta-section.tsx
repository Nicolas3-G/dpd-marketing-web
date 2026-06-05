const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Framework page CTA — edit here without affecting other pages. */
export function FrameworkCtaSection() {
  return (
    <section className="bg-background py-20 text-custom-black sm:py-24 lg:py-28">
      <div
        className={`${pageInset} flex flex-col items-center text-center`}
      >
        <h2 className="max-w-4xl custom-lg-title-bold leading-tight">
          Get the most out of your team
        </h2>
        <p className="mt-6 max-w-3xl text-base font-normal leading-7 text-custom-black sm:mt-8 sm:text-lg sm:leading-8">
          DPD helps teams activate the right Persona Behavioral Posture for the
          moment, so communication improves, friction decreases, and execution
          moves faster.
        </p>
        <a
          href="/survey"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand-orange px-10 text-base font-bold text-white shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black sm:mt-10 sm:h-14 sm:px-12 sm:text-lg"
        >
          Try it out
        </a>
      </div>
    </section>
  );
}
