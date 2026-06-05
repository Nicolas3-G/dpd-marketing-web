const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Flow headline section displayed below testimonial. */
export function FrameworkFlowSection() {
  return (
    <section className="bg-background text-custom-black">
      <div
        className={`${pageInset} flex min-h-[85svh] flex-col items-center justify-center px-4 text-center`}
      >
        <h2 className="max-w-5xl custom-lg-title-bold">
          Dream. Plan. Do. Together in Flow.
        </h2>
      </div>
    </section>
  );
}
