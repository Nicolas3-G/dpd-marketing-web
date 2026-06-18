import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import type { BlogPost } from "./posts";
import { getPostHref } from "./posts";
import { ParallaxImage } from "@/app/parallax-background";

export function BlogFeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section
      id="blog-featured"
      className="relative w-full overflow-hidden bg-[#0a1628]"
    >
      {post.image && (
        <ParallaxImage
          src={post.image}
          alt=""
          sizes="100vw"
          imageClassName="opacity-70 blur-sm"
        />
      )}

      <div className="relative z-10 grid lg:grid-cols-2 lg:items-stretch">
        <div className="relative flex min-h-[380px] flex-col justify-center px-6 py-14 sm:px-10 lg:min-h-[min(85vh,640px)] lg:px-12 xl:px-16">
          <div className="relative z-10 flex max-w-xl flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="custom-sm-title text-white">{post.title}</h2>
              {post.subtext ? (
                <p className="custom-body text-white">{post.subtext}</p>
              ) : null}
            </div>
            <Link
              href={getPostHref(post.slug)}
              className="group relative inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-full bg-brand-orange px-5 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span
                className="pointer-events-none absolute inset-0 translate-x-full rounded-full bg-[linear-gradient(to_left,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.34)_25%,rgba(0,0,0,0.1)_55%,transparent_100%)] transition-transform duration-1000 ease-out will-change-transform group-hover:translate-x-0"
                aria-hidden
              />
              <span className="relative custom-label-bold z-10 inline-flex items-center gap-2.5">
                Read the article
                <FaArrowRight className="size-4 shrink-0 opacity-95" aria-hidden />
              </span>
            </Link>
          </div>
        </div>

        {post.image && (
          <div className="relative flex min-h-[260px] w-full flex-col items-center justify-center px-6 py-10 sm:px-8 sm:py-12 lg:min-h-[min(85vh,640px)] lg:px-10 lg:py-14 xl:px-14 xl:py-16">
            <div className="relative mx-auto aspect-4/3 w-[min(100%,36rem)] overflow-hidden shadow-2xl shadow-custom-black/50 sm:w-[min(100%,40rem)] xl:w-[min(100%,44rem)]">
              <Image
                src={post.image}
                alt={
                  post.subtext
                    ? `${post.title}: ${post.subtext}`
                    : post.title
                }
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, min(672px, 45vw)"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
