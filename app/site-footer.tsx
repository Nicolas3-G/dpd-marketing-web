import { FaLinkedinIn, FaSpotify } from "react-icons/fa6";

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

const footerSocialLinks = [
  {
    label: "DPD on Spotify",
    href: "https://open.spotify.com/show/2DWXn7bgkJ0yEkS7FCBaTf",
    Icon: FaSpotify,
  },
  {
    label: "DPD on LinkedIn",
    href: "https://www.linkedin.com/company/dpding",
    Icon: FaLinkedinIn,
  },
] as const;

const footerSocialIconClassName =
  "inline-flex items-center justify-center text-white transition hover:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const footerLegalLinkClassName =
  "underline underline-offset-2 transition hover:text-white";

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

export function SiteFooter() {
  return (
    <>
      <div className="bg-background" aria-hidden="true">
        <div className={`${pageInset} h-px bg-custom-black/10`} />
      </div>

      <section
        id="contact"
        className="bg-custom-black pt-16 text-white sm:pt-20"
      >
        <div className={pageInset}>
          <div id="see-better" className="pb-20">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-medium leading-none tracking-tighter sm:text-5xl lg:text-6xl">
                See the{" "}
                <span className="font-bold text-brand-orange">DPD</span>
                ing in action.
              </h2>
              <div className="mt-8 flex justify-center">
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-brand-orange px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Take DPD Survey
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-20 pb-10 sm:pb-12 lg:pb-14">
            <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-5">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#home"
                          className="text-sm font-medium text-white/85 transition hover:text-white"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-20 text-3xl font-bold tracking-tighter text-white">
              DPDing
            </p>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
              <ul className="flex list-none gap-5">
                {footerSocialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={footerSocialIconClassName}
                    >
                      <Icon className="size-6" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="ml-auto text-right text-xs leading-5 text-white/90">
                <span>© {new Date().getFullYear()} DPD</span>
                {", "}
                <a href="/terms" className={footerLegalLinkClassName}>
                  Terms
                </a>
                {", "}
                <a href="/privacy" className={footerLegalLinkClassName}>
                  Privacy
                </a>
                {", "}
                <a href="/privacy-choices" className={footerLegalLinkClassName}>
                  Your Privacy Choices
                </a>
              </p>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
