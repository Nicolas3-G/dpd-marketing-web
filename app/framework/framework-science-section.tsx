const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Framework science / research section — edit here without affecting other pages. */
export function FrameworkScienceSection() {
  return (
    <section className="bg-background py-20 text-[#111111] sm:py-24 lg:py-28">
      <div className={`${pageInset} flex flex-col items-center`}>
        <h2 className="max-w-5xl text-center text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          Backed by science, backed by research
        </h2>

        <div className="mt-10 w-full max-w-4xl space-y-6 text-left sm:mt-12 sm:space-y-8">
          <p className="text-xl font-normal leading-8 text-black sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.35]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </p>
          <p className="text-xl font-normal leading-8 text-black sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.35]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </section>
  );
}
