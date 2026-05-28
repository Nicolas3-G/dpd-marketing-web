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
    href: "https://www.linkedin.com/company/the-dpd-framework/posts/?feedView=all",
    Icon: FaLinkedinIn,
  },
] as const;

const footerSocialIconClassName =
  "inline-flex items-center justify-center text-white transition hover:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const footerLegalLinkClassName =
  "underline underline-offset-2 transition hover:text-white";

type FooterLink = {
  label: string;
  href: string;
};

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Popular links",
    links: [
      { label: "Home", href: "/" },
      { label: "Take the Survey", href: "/survey" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "App Support", href: "/support" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Reports", href: "/reports" },
      { label: "Webinars", href: "/webinars" },
      { label: "Books", href: "/books" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Framework", href: "/framework" },
      { label: "Science", href: "/science" },
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
                See it in action.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-relaxed text-white/85 sm:mt-8 sm:text-lg sm:leading-8">
                Experience the DPD Persona Based Behavioral Operating System
                and GPS for teams, personalized to your goals, metrics, and
                team.
              </p>
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
            <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm font-medium text-white/85 transition hover:text-white"
                        >
                          {link.label}
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
                Copyright © 2025 DPD Framework - All Rights Reserved.
              </p>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
