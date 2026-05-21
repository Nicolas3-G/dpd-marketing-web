import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { FaArrowRight } from "react-icons/fa6";

import { createPageMetadata } from "@/lib/metadata";
import {
  getFeaturedPost,
  getLatestPosts,
  getPostHref,
} from "./posts";

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Swap for your real press or media inbox. */
const MEDIA_EMAIL = "Info@DPDing.com";

export const metadata = createPageMetadata("Blog");

export default function BlogPage() {
  const featuredPost = getFeaturedPost();
  const latestPosts = getLatestPosts();

  return (
    <main className="flex-1 bg-background">
      <section className="w-full bg-[#f7f6f0]">
        <div
          className={`${pageInset} pb-20 pt-24 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32`}
        >
          <h1
            className={`${displaySerif.className} max-w-[20ch] text-[3rem] font-bold leading-[1.08] tracking-[-0.02em] text-custom-black sm:max-w-none sm:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.75rem]`}
          >
            DPD Blog
          </h1>
          <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-custom-black sm:mt-6 sm:text-lg">
            For media inquiries, contact{" "}
            <a
              href={`mailto:${MEDIA_EMAIL}`}
              className="underline decoration-custom-black/35 underline-offset-[5px] transition hover:decoration-custom-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
            >
              {MEDIA_EMAIL}
            </a>
          </p>
        </div>
      </section>

      <section
        id="blog-featured"
        className="relative w-full overflow-hidden bg-[#0a1628]"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={featuredPost.image}
            alt=""
            fill
            className="scale-110 object-cover opacity-70 blur-sm"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 lg:items-stretch">
          <div className="relative flex min-h-[380px] flex-col justify-center px-6 py-14 sm:px-10 lg:min-h-[min(85vh,640px)] lg:px-12 xl:px-16">
            <div className="relative z-10 flex max-w-xl flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-[1.65rem] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-3xl lg:text-[2rem] xl:text-[2.25rem]">
                  {featuredPost.title}
                </h2>
                {featuredPost.subtext ? (
                  <p className="text-lg font-normal leading-snug text-white/90 sm:text-xl">
                    {featuredPost.subtext}
                  </p>
                ) : null}
              </div>
              <Link
                href={getPostHref(featuredPost.slug)}
                className="group relative inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full bg-[#b9075c] px-5 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span
                  className="pointer-events-none absolute inset-0 translate-x-full rounded-full bg-[linear-gradient(to_left,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.34)_25%,rgba(0,0,0,0.1)_55%,transparent_100%)] transition-transform duration-1000 ease-out will-change-transform group-hover:translate-x-0"
                  aria-hidden
                />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  Read the article
                  <FaArrowRight className="size-4 shrink-0 opacity-95" aria-hidden />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[260px] w-full flex-col items-center justify-center px-6 py-10 sm:px-8 sm:py-12 lg:min-h-[min(85vh,640px)] lg:px-10 lg:py-14 xl:px-14 xl:py-16">
            <div className="relative mx-auto aspect-4/3 w-[min(100%,36rem)] overflow-hidden shadow-2xl shadow-custom-black/50 sm:w-[min(100%,40rem)] xl:w-[min(100%,44rem)]">
              <Image
                src={featuredPost.image}
                alt={
                  featuredPost.subtext
                    ? `${featuredPost.title}: ${featuredPost.subtext}`
                    : featuredPost.title
                }
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, min(672px, 45vw)"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f7f6f0]">
        <div className={`${pageInset} py-16 sm:py-20 lg:py-24`}>
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-custom-black sm:text-3xl">
            Latest from DPD
          </h2>
          <ul className="mt-10 max-w-4xl list-none space-y-10 sm:mt-12 sm:space-y-12">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={getPostHref(post.slug)}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
                >
                  <p className="text-sm font-normal text-custom-black">{post.date}</p>
                  <p className="mt-1.5 text-lg font-bold leading-snug text-custom-black sm:text-xl">
                    {post.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
