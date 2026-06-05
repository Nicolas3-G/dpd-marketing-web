import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Instrument_Serif } from "next/font/google";

import { BlogPostShare } from "../blog-post-share";
import { pageTitle } from "@/lib/metadata";
import {
  getAllPostSlugs,
  getPostBySlug,
  getReadTimeMinutes,
  type BlogPost,
} from "../posts";

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const pageInset =
  "mx-5 w-[calc(100%-40px)] sm:mx-[45px] sm:w-[calc(100%-90px)]";

/** Shared width for header, image, and article body so edges align. */
const postColumn = "mx-auto w-full max-w-3xl";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: pageTitle("Post not found") };
  }

  return {
    title: pageTitle(post.title),
    description: post.subtext ?? post.title,
  };
}

function ArticleBody({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-col gap-6 custom-body text-custom-black leading-relaxed sm:leading-8">
      {post.body.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="mt-4 text-left custom-sm-title-bold text-custom-black first:mt-0 sm:mt-6 sm:text-2xl"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "link") {
          return (
            <p key={index}>
              <a
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className="custom-body-bold text-brand-orange underline decoration-brand-orange/50 underline-offset-4 transition hover:text-brand-orange-hover hover:decoration-brand-orange-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
              >
                {block.label}
              </a>
            </p>
          );
        }

        return (
          <p key={index} className="text-justify">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readTimeMinutes = getReadTimeMinutes(post);

  return (
    <main className="flex-1 bg-white">
      <article className="bg-white">
        <header className="w-full bg-white">
          <div
            className={`${pageInset} pb-4 pt-24 sm:pb-5 sm:pt-28 lg:pb-6 lg:pt-32`}
          >
            <div className={postColumn}>
              <Link
                href="/blog"
                className="inline-block custom-label text-custom-black underline-offset-4 transition hover:text-custom-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-custom-black"
              >
                Back to blog
              </Link>

              <h1
                className={`${displaySerif.className} mt-10 text-left custom-md-title-bold text-custom-black`}
              >
                {post.title}
              </h1>

              <div className="mt-8 sm:mt-10">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <p className="text-left custom-body-sm text-light">
                    <span>{post.date}</span>
                    <span className="mx-2" aria-hidden>
                      -
                    </span>
                    <span className="uppercase tracking-wide">
                      {readTimeMinutes} min read
                    </span>
                  </p>

                  <p className="custom-caption uppercase tracking-[0.14em] text-light sm:text-right">
                    Share this article
                  </p>
                </div>

                <div className="mt-3 flex justify-end">
                  <BlogPostShare title={post.title} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className={`${pageInset} bg-white pb-16 pt-4 sm:pb-20 sm:pt-5 lg:pb-24`}>
          <div className={postColumn}>
            <div
              className="flex aspect-video w-full items-center justify-center border border-custom-black/10 bg-[#f0efea] text-sm font-medium tracking-wide text-custom-black/45"
              aria-hidden
            >
              Image placeholder
            </div>

            <div className="mt-12 sm:mt-14">
              <ArticleBody post={post} />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
