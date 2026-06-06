import { HiArrowRight } from "react-icons/hi";
import { webinarsHeroContent } from "./webinars-hero-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Webinars page hero — layout copied from the homepage hero; copy lives in webinars-hero-data.ts */
export function WebinarsHero() {
  const { eyebrow, heading, headingHighlight, description, cta } =
    webinarsHeroContent;

  return (
    <section
      id="webinars"
      className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-white text-custom-black"
    >
      <div
        className={`relative z-10 ${pageInset} flex flex-col items-center justify-center py-20 pt-24 text-center sm:py-24 sm:pt-28 lg:py-28 lg:pt-32`}
      >
        <a
          href={cta.href}
          className="mt-9 inline-flex h-14 items-center gap-3 rounded-full bg-brand-orange px-8 custom-label-bold text-white shadow-[0_14px_30px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
        >
          {cta.label}
          <HiArrowRight aria-hidden="true" className="text-xl leading-none" />
        </a>
      </div>
    </section>
  );
}
