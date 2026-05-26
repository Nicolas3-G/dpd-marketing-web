import { ParallaxImage } from "../parallax-background";

import { booksCtaContent } from "./books-cta-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Full-width banner with purchase CTA — pattern from webinars closing banner. */
export function BooksCtaSection() {
  const { headingLines, cta, backgroundImage } = booksCtaContent;

  return (
    <section
      id="books-cta"
      className="relative isolate flex min-h-0 items-center overflow-hidden py-12 text-white sm:py-14 lg:py-16"
    >
      <ParallaxImage
        src={backgroundImage}
        alt=""
        sizes="100vw"
        speed={0.16}
        imageWrapperClassName="-inset-y-20"
        imageClassName="object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-custom-black/65"
        aria-hidden
      />

      <div className={`relative z-10 ${pageInset}`}>
        <h2 className="max-w-3xl text-2xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-3xl lg:text-4xl lg:leading-[1.08]">
          {headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-11 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#c73b2e] via-brand-orange to-[#f0a020] px-8 text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-7 sm:h-12 sm:px-9"
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
