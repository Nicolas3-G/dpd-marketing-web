import Image from "next/image";
import Link from "next/link";

import { booksFeaturedContent } from "./books-featured-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Spotlight for the current publication — split layout inspired by research pages. */
export function BooksFeaturedSection() {
  const {
    overline,
    title,
    subtitle,
    author,
    authorHref,
    format,
    coverImage,
    coverAlt,
    description,
    primaryCta,
    secondaryCta,
  } = booksFeaturedContent;

  return (
    <section
      id="featured-book"
      className="border-t border-custom-black/10 bg-background py-10 text-custom-black sm:py-12 lg:py-14"
    >
      <div
        className={`${pageInset} grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-12`}
      >
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[13rem] overflow-hidden bg-custom-black sm:max-w-[15rem] lg:mx-0 lg:max-w-[17rem]">
          <Image
            src={coverImage}
            alt={coverAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority
          />
        </div>

        <div className="flex max-w-xl flex-col lg:max-w-none">
          <p className="text-xs font-bold tracking-[0.2em] text-brand-orange sm:text-[0.7rem]">
            {overline}
          </p>
          <h2 className="mt-2 custom-sm-title-bold">
            {title}
          </h2>
          <p className="mt-1.5 text-lg font-medium leading-snug text-custom-black/90 sm:text-xl">
            {subtitle}
          </p>
          <p className="mt-4 text-base leading-relaxed text-custom-black/85">
            {description}
          </p>
          <dl className="mt-5 flex flex-col gap-2 border-t border-custom-black/10 pt-5 text-sm sm:text-base">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <dt className="font-bold text-custom-black">Author</dt>
              <dd>
                <Link
                  href={authorHref}
                  className="font-medium text-custom-black underline decoration-custom-black/30 underline-offset-[3px] transition hover:text-brand-orange hover:decoration-brand-orange/50"
                >
                  {author}
                </Link>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <dt className="font-bold text-custom-black">Format</dt>
              <dd className="font-medium text-custom-black/85">{format}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand-orange px-7 text-sm font-bold text-white shadow-[0_12px_28px_var(--brand-orange-glow)] transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black sm:px-8 sm:text-base"
            >
              {primaryCta.label}
            </a>
            <Link
              href={secondaryCta.href}
              className="inline-flex h-11 items-center justify-center rounded-full border-2 border-custom-black/15 px-7 text-sm font-bold text-custom-black transition hover:border-custom-black/30 hover:bg-custom-black/[0.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black sm:px-8 sm:text-base"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
