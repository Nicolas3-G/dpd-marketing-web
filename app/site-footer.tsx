"use client";

import { FaLinkedinIn, FaSpotify } from "react-icons/fa6";

import { useScrollScrubVideo } from "@/lib/use-scroll-scrub-video";

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
  const { triggerRef: sectionRef, videoRef } = useScrollScrubVideo<HTMLElement>({
    durationMultiplier: 2,
    seekToScrollProgress: false,
  });

  return (
    <>
      <div className="bg-background" aria-hidden="true">
        <div className={`${pageInset} h-px bg-custom-black/10`} />
      </div>

      <section
        ref={sectionRef}
        id="contact"
        className="relative overflow-hidden bg-custom-black pt-16 text-white sm:pt-20"
      >
        <video
          ref={videoRef}
          src="/videos/footer-video.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
        <div className={`${pageInset} relative z-10`}>
          <div id="see-better" className="pb-20">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="custom-lg-title">
                See it in action.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl custom-body text-white-light sm:mt-8">
                Experience DPD: a Persona-Based Cognitive Alignment practice
                personalized to your goals, metrics, and team.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="/survey"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 custom-label-bold text-brand-orange transition hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Take DPD Survey
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://apps.apple.com/us/app/dpding-dreamer-planner-doer/id6746777165"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                >
                  <img
                    src="/store-badges/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                    alt="Download on the App Store"
                    className="h-14"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.dpding.app&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                >
                  <img
                    src="/store-badges/GetItOnGooglePlay_Badge_Web_color_English.svg"
                    alt="Get it on Google Play"
                    className="h-14"
                  />
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-10 pb-10 sm:pb-12 lg:pb-14">
            <div className="mx-auto max-w-6xl rounded-[3rem] border border-white/15 bg-black/20 px-14 py-8 backdrop-blur-sm">
              <p className="mb-20 text-3xl font-bold tracking-tighter text-white">
                DPD Framework
              </p>
              <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
                {footerColumns.map((column) => (
                  <div key={column.title}>
                    <h3 className="custom-label-bold uppercase text-section-gray tracking-widest">
                      {column.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="custom-label text-section-gray transition hover:text-white"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-28 flex items-center justify-between">
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
                <p className="text-right custom-label text-white-light">
                  Copyright © 2025 DPD Framework - All Rights Reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
