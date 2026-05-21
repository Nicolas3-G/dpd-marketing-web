import { ParallaxImage } from "./parallax-background";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const footerColumns = [
  {
    title: "Platform",
    links: ["Overview", "Assessments", "Coaching", "Insights"],
  },
  {
    title: "Solutions",
    links: [
      "Leadership development",
      "Manager effectiveness",
      "Personal growth",
      "Team performance",
    ],
  },
  {
    title: "Insights",
    links: ["Library", "Guides", "Events", "Case studies"],
  },
  {
    title: "Company",
    links: ["About us", "Approach", "Careers", "Contact"],
  },
  {
    title: "Popular links",
    links: [
      "Contact sales",
      "Help center",
      "Privacy notice",
      "Cookie notice",
    ],
  },
];

const socialLinks = ["in", "X", "yt", "ig"];

export function SiteFooter() {
  return (
    <>
      <div className="bg-background" aria-hidden="true">
        <div className={`${pageInset} h-px bg-black/10`} />
      </div>

      <section
        id="contact"
        className="relative overflow-hidden pt-16 text-white sm:pt-20"
      >
        <ParallaxImage
          src="/footer-bg.jpg"
          alt=""
          sizes="100vw"
          speed={0.14}
          imageWrapperClassName="-inset-y-24"
          imageClassName="object-center"
        />

        <div className={`relative z-10 ${pageInset}`}>
          <div id="see-better" className="pb-20">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-medium leading-none tracking-tighter sm:text-5xl lg:text-6xl">
                See the{" "}
                <span className="font-bold text-brand-orange">DPD</span>
                ing in action.
              </h2>
              <p className="mt-7 text-base font-medium leading-6 text-white/85 sm:text-lg">
                Experience the DPD Persona Based Behavioral Operating System
                and GPS for teams, personalized to your goals, metrics, and
                team.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-brand-orange px-7 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Request a Demo
                </a>
                <a
                  href="#home"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-20 rounded-t-xl bg-background p-7 text-[#111111] shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-9 lg:p-10">
            <a
              href="#home"
              className="inline-flex text-3xl font-bold tracking-tighter"
            >
              DPD
            </a>

            <div className="mt-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-5">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black/60">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#home"
                          className="text-sm font-medium text-black/85 transition hover:text-black"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-20 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social}
                  href="#home"
                  aria-label={`${social} social link`}
                  className="grid size-8 place-items-center rounded-full border border-black/70 text-[0.65rem] font-bold uppercase transition hover:bg-black hover:text-background"
                >
                  {social}
                </a>
              ))}
            </div>

            <div className="mt-6 border-t border-black/20 pt-7">
              <div className="flex flex-col gap-4 text-xs font-bold leading-5 text-black/90 sm:flex-row sm:items-center sm:justify-between">
                <p>3100 E 5th Street, Suite 350, Austin, TX 78702</p>
                <p>215 Spadina Avenue, Suite 400, Toronto, Ontario M5T 2C7</p>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
