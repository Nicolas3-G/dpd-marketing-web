import Image from "next/image";
import Link from "next/link";

import { BOOK_AMAZON_URL } from "./books-featured-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Brief author spotlight — ties the book to the team behind DPD. */
export function BooksAuthorSection() {
  return (
    <section className="bg-background py-16 text-custom-black sm:py-20 lg:py-24">
      <div
        className={`${pageInset} grid items-center gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] lg:gap-16`}
      >
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden bg-custom-black lg:mx-0 lg:max-w-none">
          <Image
            src="/team/Kokoro.jpg"
            alt="Kokoro V. Robinson"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 80vw, 28vw"
          />
        </div>

        <div className="max-w-2xl">
          <p className="custom-caption uppercase text-brand-orange">
            ABOUT THE AUTHOR
          </p>
          <h2 className="mt-3 custom-md-title-bold">
            Kokoro V. Robinson
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <p className="custom-body text-custom-black">
              Kokoro Robinson is the author of the DPD Framework book and
              creator of the Dreamer-Planner-Doer Framework, a Persona-Based
              Cognitive Alignment practice that helps people and teams move
              together in flow.
            </p>
            <p className="custom-body text-custom-black">
              He studied Biological and Cognitive Psychology before
              launching Personal Blueprint Consulting Co. in the early
              1990s — long before coaching became mainstream and before
              Silicon Valley popularized conversations around cognitive
              enhancement and performance.
            </p>
            <p className="custom-body text-custom-black">
              Across more than three decades in global talent leadership,
              Kokoro helped build and scale global teams, overseeing
              thousands of hiring decisions and compensation negotiations
              representing an estimated value approaching $1 billion.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/team"
              className="custom-body-bold text-custom-black underline decoration-custom-black/80 underline-offset-[3px] transition hover:text-custom-black/70"
            >
              Meet the team
            </Link>
            <a
              href={BOOK_AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="custom-body-bold text-brand-orange underline decoration-brand-orange/50 underline-offset-[3px] transition hover:text-brand-orange-hover"
            >
              Order on Amazon
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
