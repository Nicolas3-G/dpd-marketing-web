import { Instrument_Serif } from "next/font/google";

import { createPageMetadata } from "@/lib/metadata";
import { TeamMemberGrid } from "./team-member-grid";

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const kokoroHoverBio =
  "Kokoro V. Robinson is the author of the DPD Framework book, a behavioral architect, global talent authority, and the creator of the DPD Framework, a science forward persona behavioral operating system that goes beyond personality assessments by enabling real time behavioral alignment. Over a career spanning more than three decades, he's built a global career in talent leadership in the Silicon Valley, serving as a Vice President of Global Talent Acquisition.";

const executiveTeam = [
  {
    name: "Kokoro V. Robinson",
    title: "Chief Possibility Advocate & Founder",
    image: "/team/Kokoro.jpg",
    hoverBio: kokoroHoverBio,
  },
  {
    name: "Prabitha Ganesh",
    title: "Chief Operating Officer, Co-Founder",
    image: "/team/Prabitha.webp",
    hoverBio:
      "A former client of DPD, Prabitha Ganesh is an engineering executive with over 20 years of success building and scaling global software, cloud, and platform engineering teams across SaaS, DevOps, and infrastructure domains. She is known for reducing time to market by 75%, managing budgets exceeding $58M, modernizing legacy systems, and delivering scalable, AI-powered platforms.",
  },
  {
    name: "Alonzo Wilkins",
    title: "Chief Technology Officer, Co-Founder",
    image: "/team/Alonzo.webp",
    hoverBio:
      "Alonzo Wilkins brings over a decade of experience building high-performance mobile and software systems. He has led engineering efforts in some of the most demanding environments in technology, including work with Apple and Mercedes-Benz Research & Development North America. His background spans iOS and Android development, AI-driven applications, and scalable cross-platform architecture.",
  },
] as const;

const restOfTeam = [
  {
    name: "Nicolas Guimont",
    title: "Lead Full Stack Developer, Founding Member",
    image: "/team/Nicolas.webp",
    hoverBio:
      "As a founding engineer and Full Stack Developer, Nic specializes in developing intelligent, cross-platform SaaS solutions that seamlessly integrate frontend experience with robust backend infrastructure. With deep expertise across React, React Native, Next.js, Node.js, and cloud-native technologies, Nic has a proven track record of building scalable systems that drive engagement and performance.",
  },
  {
    name: "Nicole L. Weber, M.Ed.",
    title:
      "Instructional Designer | Learning Experience Designer | Founder Advocate",
    image: "/team/Nicole.webp",
    hoverBio:
      "Nicole L. Weber, M.Ed., is a Learning Experience Designer with over a decade of global experience in education and corporate learning. On the DPD Instructional Design Council, she turns behavioral science into practical training and leads curriculum and certification for the Framework. She uses modern learning design and AI-enhanced tools to create inclusive, engaging experiences that help teams perform at their best.",
  },
] as const;

export const metadata = createPageMetadata("Team");

export default function TeamPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <section
        className={`${pageInset} overflow-x-clip pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-36`}
      >
        <header className="mb-10 max-w-4xl sm:mb-12 lg:mb-14">
          <h1
            className={`${displaySerif.className} text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-[#111111] sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.5rem]`}
          >
            The people behind the platform
          </h1>
        </header>

        <div className="grid w-full min-w-0 gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-x-14 xl:gap-x-20">
          <div className="flex max-w-xl flex-col gap-4 lg:max-w-none lg:pr-4">
            <h2 className="text-base font-semibold leading-tight text-[#111111] sm:text-lg">
              Executive team
            </h2>
            <p className="max-w-md text-base font-normal leading-relaxed text-[#111111]/85 sm:text-[17px]">
              DPD&apos;s executive team formed around one conviction: teams need a
              shared way to dream, plan, and execute—not another personality test.
              Kokoro, Prabitha, and Alonzo lead strategy and product, turning the
              framework into tools coaches and organizations use every day.
            </p>
          </div>

          <div className="min-w-0 overflow-x-clip">
            <TeamMemberGrid members={executiveTeam} />
          </div>
        </div>

        <div className="mt-16 grid w-full min-w-0 gap-12 sm:mt-20 lg:mt-24 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-x-14 xl:gap-x-20">
          <div className="flex max-w-xl flex-col gap-4 lg:max-w-none lg:pr-4">
            <h2 className="text-base font-semibold leading-tight text-[#111111] sm:text-lg">
              The rest of the team
            </h2>
            <p className="max-w-md text-base font-normal leading-relaxed text-[#111111]/85 sm:text-[17px]">
              Behind the executives are founding members who build and refine what
              teams experience every day. Nicolas shapes the platform; Nicole designs
              the learning journeys that make the framework clear, practical, and
              ready to use.
            </p>
          </div>

          <div className="min-w-0 overflow-x-clip">
            <TeamMemberGrid members={restOfTeam} />
          </div>
        </div>
      </section>
    </main>
  );
}
