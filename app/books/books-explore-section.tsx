import Link from "next/link";

import { booksExploreContent } from "./books-explore-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const sectionHeading =
  "text-2xl font-bold leading-[1.12] tracking-[-0.03em] sm:text-3xl lg:text-4xl lg:leading-[1.1]";

const serifCardTitle =
  "font-[family-name:Georgia,'Times_New_Roman',Times,serif] text-2xl font-bold leading-tight tracking-tight sm:text-[1.65rem]";

/** Related resources — adapted from webinars closing, sized for a single-book catalog. */
export function BooksExploreSection() {
  const { heading, description, links } = booksExploreContent;

  return (
    <section className="bg-white pb-16 pt-14 text-custom-black sm:pb-20 sm:pt-16 lg:pb-24">
      <div className={pageInset}>
        <div className="flex flex-col items-center text-center">
          <h2 className={`${sectionHeading} max-w-3xl`}>{heading}</h2>
          <p className="mt-5 max-w-2xl text-base font-normal leading-7 text-custom-black/90 sm:mt-6 sm:text-lg sm:leading-8">
            {description}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 md:gap-6 lg:mt-14">
          {links.map(({ title, description, linkLabel, href }) => (
            <li key={title}>
              <article className="flex min-h-64 flex-col border border-custom-black/12 bg-background p-7 sm:min-h-72 sm:p-8">
                <h3 className={serifCardTitle}>{title}</h3>
                <p className="mt-4 flex-1 text-base font-normal leading-7 text-custom-black sm:leading-8">
                  {description}
                </p>
                <Link
                  href={href}
                  className="mt-auto pt-8 text-base font-normal text-custom-black underline decoration-custom-black/80 underline-offset-[3px] transition hover:text-custom-black/70"
                >
                  {linkLabel}
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm font-medium text-custom-black/55 sm:mt-12">
          More publications from the DPD team are on the way.
        </p>
      </div>
    </section>
  );
}
