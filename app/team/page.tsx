import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const teamPlaceholders = [
  { name: "Name", title: "Title" },
  { name: "Name", title: "Title" },
  { name: "Name", title: "Title" },
  { name: "Name", title: "Title" },
] as const;

export const metadata: Metadata = {
  title: "Team",
};

function TeamCardGrid({
  members,
  idPrefix,
}: {
  members: readonly { name: string; title: string }[];
  idPrefix: string;
}) {
  return (
    <ul className="grid list-none grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6 xl:gap-x-8">
      {members.map((member, i) => (
        <li key={`${idPrefix}-${i}`} className="flex min-w-0 flex-col gap-3">
          <div
            className="aspect-square w-full rounded-lg border border-black/8 bg-[#ebe8df]"
            aria-hidden
          />
          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-semibold leading-snug text-[#111111] sm:text-base">
              {member.name}
            </p>
            <p className="text-sm font-normal leading-snug text-[#111111]/70">
              {member.title}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function TeamPage() {
  return (
    <main className="flex-1 bg-background">
      <section
        className={`${pageInset} pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-36`}
      >
        <header className="mb-10 max-w-4xl sm:mb-12 lg:mb-14">
          <h1
            className={`${displaySerif.className} text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-[#111111] sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.5rem]`}
          >
            The people behind the platform
          </h1>
        </header>

        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-x-14 xl:gap-x-20">
          <div className="flex max-w-xl flex-col gap-4 lg:max-w-none lg:pr-4">
            <h2 className="text-base font-semibold leading-tight text-[#111111] sm:text-lg">
              Executive team
            </h2>
            <p className="max-w-md text-base font-normal leading-relaxed text-[#111111]/85 sm:text-[17px]">
              Placeholder intro copy about who leads DPD, how the team works
              together, and what visitors can expect from this page. Replace with
              your real narrative.
            </p>
          </div>

          <TeamCardGrid members={teamPlaceholders} idPrefix="exec" />
        </div>

        <div className="mt-16 grid w-full gap-12 sm:mt-20 lg:mt-24 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-x-14 xl:gap-x-20">
          <div className="flex max-w-xl flex-col gap-4 lg:max-w-none lg:pr-4">
            <h2 className="text-base font-semibold leading-tight text-[#111111] sm:text-lg">
              The rest of the team
            </h2>
            <p className="max-w-md text-base font-normal leading-relaxed text-[#111111]/85 sm:text-[17px]">
              Placeholder copy for everyone else who ships the product day to
              day—design, engineering, research, and operations. Swap in how you
              describe the broader team and what visitors should know.
            </p>
          </div>

          <TeamCardGrid members={teamPlaceholders} idPrefix="rest" />
        </div>
      </section>
    </main>
  );
}
