import { HiArrowRight } from "react-icons/hi";
import { booksHeroContent } from "./books-hero-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Books page hero — centered layout aligned with webinars and framework pages. */
export function BooksHero() {
  const { eyebrow, heading, headingHighlight, description, cta } =
    booksHeroContent;

  return (
    <section
      id="books"
      className="relative isolate flex min-h-[calc(var(--stable-vh,100svh)-4rem)] overflow-hidden bg-black text-custom-black"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/book-hero-video.mp4"
      />
<div
        className={`relative z-10 ${pageInset} flex flex-col items-start justify-center py-20 pt-24 text-left sm:py-24 sm:pt-28 lg:py-28 lg:pt-32`}
      >
        <p className="custom-body-bold uppercase text-brand-orange">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl custom-lg-title-bold leading-tight">
          {heading}{" "}
          <span className="text-custom-black">{headingHighlight}</span>
        </h1>
        <p className="mt-6 max-w-2xl custom-body text-custom-black">
          {description}
        </p>
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
