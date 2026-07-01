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
          Build Cognitive Alignment and Team Coherence.
        </h2>
        <p className="mt-6 max-w-3xl custom-body text-custom-black">
          DPD helps teams recognize the right thinking posture for the
          moment, so communication becomes clearer, friction decreases, and
          work moves forward with greater alignment and flow.
        </p>
        <a
          href="/survey"
          className="mt-8 inline-flex self-start h-12 items-center justify-center rounded-full bg-brand-orange px-10 custom-label-bold text-white shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black sm:mt-10 sm:h-14 sm:px-12"
        >
          Discover Your Current Posture
        </a>
      </div>
    </section>
  );
}
