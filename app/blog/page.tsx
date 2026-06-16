import Link from "next/link";
import { Instrument_Serif } from "next/font/google";

import { createPageMetadata } from "@/lib/metadata";
import { getFeaturedPost, getLatestPosts, getPostHref } from "./posts";
import { BlogFeaturedPost } from "./blog-featured-post";

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Swap for your real press or media inbox. */
const MEDIA_EMAIL = "Info@DPDing.com";

export const metadata = createPageMetadata("Blog", {
  description:
    "Insights, research, and stories on behavior coordination, team performance, and the AI era from the DPD Framework team.",
});

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
            className={`${displaySerif.className} max-w-[20ch] custom-lg-title-bold sm:max-w-none`}
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

      <BlogFeaturedPost post={featuredPost} />

      <section className="w-full bg-[#f7f6f0]">
        <div className={`${pageInset} py-16 sm:py-20 lg:py-24`}>
          <h2 className="custom-xs-title-bold text-custom-black">
            Latest from DPD
          </h2>
          <ul className="mt-10 max-w-4xl list-none space-y-10 sm:mt-12 sm:space-y-12">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={getPostHref(post.slug)}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
                >
                  <p className="custom-label text-custom-black">{post.date}</p>
                  <p className="mt-1.5 custom-body-bold leading-snug text-custom-black sm:text-xl">
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
