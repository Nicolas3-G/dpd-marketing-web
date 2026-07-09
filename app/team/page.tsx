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
  "Kokoro V. Robinson is the author of the DPD Framework book, a cognitive alignment architect, global talent authority, and creator of the DPD Framework, a science-forward Persona-Based Cognitive Alignment system that helps individuals and teams recognize, switch, and coordinate cognitive posture in real time. Over more than three decades, he has built global tech teams across Silicon Valley as a Vice President of Global Talent Acquisition.";

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
    name: "Nicole L. Weber, M.Ed.",
    title:
      "Instructional Designer | Learning Experience Designer | Founder Advocate",
    image: "/team/Nicole.webp",
    hoverBio:
      "Nicole L. Weber, M.Ed., is a Learning Experience Designer with over a decade of global experience in education and corporate learning. On the DPD Instructional Design Council, she translates Persona-Based Cognitive Alignment into practical learning experiences that make the framework clear, engaging, and easy to apply. She uses modern learning design and AI-enhanced tools to help coaches, leaders, and teams build shared language, stronger alignment, and better team flow.",
  },
  {
    name: "Iris Papendorf",
    title: "Strategic HRBP & People Culture Lead, Founding Member",
    image: "/team/Iris.jpg",
    hoverBio:
      "Iris Papendorf is a Strategic HRBP and People & Culture leader with deep experience building remote-first organizational systems that help distributed teams work with clarity, consistency, and alignment. She partners with executive leadership to develop HR policies, onboarding structures, and cross-functional workflows, and architected DPD’s first onboarding ecosystem and tiered cognitive certification program to support scalable learning, quality control, and international growth.",
  },
  {
    name: "Nicolas Guimont",
    title: "Lead Full Stack Developer, Founding Member",
    image: "/team/Nicolas.webp",
    hoverBio:
      "As a founding engineer and Full Stack Developer, Nic specializes in developing intelligent, cross-platform SaaS solutions that seamlessly integrate frontend experience with robust backend infrastructure. With deep expertise across React, React Native, Next.js, Node.js, and cloud-native technologies, Nic has a proven track record of building scalable systems that drive engagement and performance.",
  },
] as const;

export const metadata = createPageMetadata("Team", {
  description:
    "Meet the people behind the DPD Framework — the executives and founding members building behavior coordination for the AI era.",
});

export default function TeamPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-background">
      <section
        className={`${pageInset} overflow-x-clip pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-36`}
      >
        <header className="mb-10 max-w-4xl sm:mb-12 lg:mb-14">
          <h1
            className={`${displaySerif.className} custom-lg-title-bold`}
          >
            The people behind the platform
          </h1>
        </header>

        <div className="grid w-full min-w-0 gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-x-14 xl:gap-x-20">
          <div className="flex max-w-xl flex-col gap-4 lg:max-w-none lg:pr-4">
            <h2 className="custom-body-bold text-custom-black">
              Executive team
            </h2>
            <div className="flex max-w-md flex-col gap-4">
              <p className="custom-body text-custom-black">
                DPD&apos;s executive team formed around one conviction: teams
                need a shared way to think, align, and move together — not
                another personality test.
              </p>
              <p className="custom-body text-custom-black">
                Kokoro, Prabitha, and Alonzo lead strategy, product, and
                platform development, turning the framework into practical
                tools for coaches, leaders, and organizations.
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <TeamMemberGrid members={executiveTeam} />
          </div>
        </div>

        <div className="mt-16 grid w-full min-w-0 gap-12 sm:mt-20 lg:mt-24 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-x-14 xl:gap-x-20">
          <div className="flex max-w-xl flex-col gap-4 lg:max-w-none lg:pr-4">
            <h2 className="custom-body-bold text-custom-black">
              Founding Team
            </h2>
            <div className="flex max-w-md flex-col gap-4">
              <p className="custom-body text-custom-black">
                Alongside the executive team are founding members who bring
                the platform, tools, and learning experiences to life for
                teams every day.
              </p>
              <p className="custom-body text-custom-black">
                Nicolas shapes the platform. Nicole designs the learning
                journeys. Iris Papendorf helps create the DPD Certification
                pathways and new employee onboarding experiences that make
                the framework practical, teachable, and scalable.
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <TeamMemberGrid members={restOfTeam} />
          </div>
        </div>
      </section>
    </main>
  );
}
