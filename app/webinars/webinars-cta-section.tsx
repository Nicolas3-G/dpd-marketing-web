import { webinarsCtaContent } from "./webinars-cta-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Full-width photo banner with overlay, heading, and CTA — closing section on the webinars page. */
export function WebinarsCtaSection() {
  const { headingLines, cta } = webinarsCtaContent;

  return (
    <section
      id="webinars-cta"
      className="relative isolate flex min-h-0 items-center overflow-hidden py-9 text-white sm:py-10 lg:py-11"
    >
      <video
        src="/videos/people-talking.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-custom-black/65"
        aria-hidden
      />

      <div className={`relative z-10 ${pageInset}`}>
        <h2 className="custom-sm-title">
          {headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <a
          href={cta.href}
          className="mt-5 inline-flex h-10 items-center gap-2.5 rounded-full bg-brand-orange px-7 custom-label-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-5 sm:h-11 sm:px-8"
        >
          {cta.label}
          <span aria-hidden="true" className="text-lg leading-none">
            &#8250;
          </span>
        </a>
      </div>
    </section>
  );
}
