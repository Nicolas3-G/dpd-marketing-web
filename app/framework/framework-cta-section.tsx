const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Framework page CTA — edit here without affecting other pages. */
export function FrameworkCtaSection() {
  return (
    <section className="bg-background py-20 text-custom-black sm:py-24 lg:py-28">
      <div
        className={`${pageInset} flex flex-col`}
      >
        <h2 className="custom-md-title-bold max-w-4xl">
          Get the most out of your team
        </h2>
        <p className="mt-6 max-w-3xl custom-body text-custom-black">
          DPD helps teams activate the right Persona Behavioral Posture for the
          moment, so communication improves, friction decreases, and execution
          moves faster.
        </p>
        <a
          href="/survey"
          className="mt-8 inline-flex self-start h-12 items-center justify-center rounded-full bg-brand-orange px-10 custom-label-bold text-white shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black sm:mt-10 sm:h-14 sm:px-12"
        >
          Try it out
        </a>
      </div>
    </section>
  );
}
