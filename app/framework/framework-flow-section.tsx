"use client";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

type FrameworkFlowSectionProps = {
  /** Matches testimonial section height when set. */
  sectionHeightPx?: number | null;
};

/** Flow headline section displayed below testimonial. */
export function FrameworkFlowSection({
  sectionHeightPx = null,
}: FrameworkFlowSectionProps) {
  return (
    <section
      className="bg-background text-custom-black"
      style={
        sectionHeightPx != null ? { height: sectionHeightPx } : undefined
      }
    >
      <div
        className={`${pageInset} relative flex h-full min-h-full flex-col pt-10 pb-16 sm:pb-20 lg:pb-24`}
      >
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <h2 className="max-w-5xl text-4xl font-bold leading-[0.98] tracking-tighter sm:text-5xl lg:text-6xl">
            Dream. Plan. Do. Together in Flow.
          </h2>
        </div>
      </div>
    </section>
  );
}
