import { HiArrowRight, HiCheck } from "react-icons/hi";
import { webinarsHeroContent } from "./webinars-hero-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

export function WebinarsHero() {
  const { badge, heading, description, cta, secondaryCta, sessionDetails } =
    webinarsHeroContent;

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-white text-custom-black">
      <div className={`${pageInset} py-24 lg:py-32`}>
        <div className="grid w-full gap-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">

          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-custom-black/15 px-4 py-2">
              <span className="size-2 animate-pulse rounded-full bg-brand-orange" />
              <span className="custom-label text-custom-black/60">{badge}</span>
            </div>

            <h1 className="custom-lg-title-bold text-custom-black">
              {heading}
            </h1>

            <p className="custom-body mt-6 text-text-light sm:mt-7">
              {description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={cta.href}
                className="inline-flex h-14 items-center gap-3 rounded-full bg-brand-orange px-8 custom-label-bold text-white shadow-[0_14px_30px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {cta.label}
                <HiArrowRight aria-hidden="true" className="text-xl leading-none" />
              </a>

            </div>
          </div>

          <div className="w-full rounded-2xl border border-custom-black/10 bg-custom-black/3 p-8 lg:w-72 xl:w-80">
            <p className="custom-caption-bold mb-6 uppercase text-custom-black/35">
              Each session includes
            </p>
            <ul className="flex flex-col gap-5">
              {sessionDetails.map((detail) => (
                <li key={detail} className="flex items-start gap-3">
                  <HiCheck
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-lg text-brand-orange"
                  />
                  <span className="custom-body text-text-light">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
