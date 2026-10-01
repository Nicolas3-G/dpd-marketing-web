import Image from "next/image";

import { BlogPostVimeo } from "./blog-post-vimeo";
import type { BlogPost } from "./posts";

const mediaFrame =
  "relative aspect-video w-full overflow-hidden border border-custom-black/10 bg-[#f0efea]";

function getVimeoId(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "placeholder") {
    return null;
  }

  const fromPlayer = trimmed.match(/player\.vimeo\.com\/video\/(\d+)/i);
  if (fromPlayer) {
    return fromPlayer[1];
  }

  const fromUrl = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (fromUrl) {
    return fromUrl[1];
  }

  if (/^\d+$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function BlogPostMedia({ post }: { post: BlogPost }) {
  if (post.vimeo !== undefined) {
    const vimeoId = getVimeoId(post.vimeo);

    if (vimeoId) {
      return (
        <div className={mediaFrame}>
          <BlogPostVimeo vimeoId={vimeoId} title={post.title} />
        </div>
      );
    }

    return (
      <div className={`${mediaFrame} flex items-center justify-center`}>
        <p className="custom-label uppercase tracking-[0.14em] text-custom-black/45">
          Video coming soon
        </p>
      </div>
    );
  }

  if (!post.image) {
    return null;
  }

  return (
    <div className={mediaFrame}>
      <Image src={post.image} alt="" fill className="object-cover" />
    </div>
  );
}

export function hasBlogPostMedia(post: BlogPost): boolean {
  return post.vimeo !== undefined || Boolean(post.image);
}
