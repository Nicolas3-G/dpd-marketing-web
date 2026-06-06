import { booksInsideContent } from "./books-inside-data";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Themes readers explore — dark section echoing research features without tab UI. */
export function BooksInsideSection() {
  const { heading, lead, themes } = booksInsideContent;

  return (
    <section className="bg-custom-black py-16 text-white sm:py-20 lg:py-24">
      <div className={pageInset}>
        <div className="max-w-3xl">
          <h2 className="custom-md-title-bold">
            {heading}
          </h2>
          <p className="mt-5 custom-body text-white">
            {lead}
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10 lg:mt-16 lg:gap-12">
          {themes.map(({ title, description }) => (
            <li
              key={title}
              className="flex flex-col border-t border-white/15 pt-8 sm:pt-9"
            >
              <h3 className="custom-xs-title-bold">
                {title}
              </h3>
              <p className="mt-4 custom-body text-white">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
