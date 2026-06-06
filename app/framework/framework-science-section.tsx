const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Framework science / research section — edit here without affecting other pages. */
export function FrameworkScienceSection() {
  return (
    <section className="bg-background py-20 text-custom-black sm:py-24 lg:py-28">
      <div className={`${pageInset} flex flex-col`}>
        <h2 className="custom-md-title-bold max-w-4xl text-left">
          Backed by science, backed by research
        </h2>

        <div className="mt-10 w-full max-w-4xl space-y-6 text-left text-center sm:mt-12 sm:space-y-8">
          <p className="custom-body text-custom-black">
            DPD is backed by research showing that teams perform better when they
            share a clear behavioral language for the moment they are in.
            Cognitive behavioral science, game theory, embodied cognition, and
            habit formation all point to the same practical insight: people
            collaborate more effectively when expectations, roles, and repeated
            practice are aligned.
          </p>
          <p className="custom-body text-custom-black">
            DPD turns that science into a simple operating system for meetings
            and teamwork, helping teams reduce misinterpretation, switch cleanly
            between Dreaming, Planning, and Doing personas, and build stronger
            habits for coordinated action.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <a
            href="/science"
            className="inline-flex h-12 items-center justify-center rounded-full bg-custom-black px-7 custom-label-bold text-white transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
