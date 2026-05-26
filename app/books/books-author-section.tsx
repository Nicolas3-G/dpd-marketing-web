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
          <p className="text-xs font-bold tracking-[0.2em] text-brand-orange">
            ABOUT THE AUTHOR
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
            Kokoro V. Robinson
          </h2>
          <p className="mt-5 text-base leading-relaxed text-custom-black/85 sm:text-[17px] sm:leading-8">
            Kokoro is the author of the DPD Framework book, a behavioral
            architect, and the creator of the Dreamer–Planner–Doer behavioral
            operating system. Over more than three decades in global talent
            leadership—including as a Vice President of Global Talent
            Acquisition in Silicon Valley—he built the science-forward approach
            teams use to coordinate behavior in real time.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/team"
              className="text-base font-bold text-custom-black underline decoration-custom-black/80 underline-offset-[3px] transition hover:text-custom-black/70"
            >
              Meet the team
            </Link>
            <a
              href={BOOK_AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-brand-orange underline decoration-brand-orange/50 underline-offset-[3px] transition hover:text-brand-orange-hover"
            >
              Order on Amazon
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
