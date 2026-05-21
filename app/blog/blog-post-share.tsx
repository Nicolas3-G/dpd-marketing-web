"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

type BlogPostShareProps = {
  title: string;
};

const shareIconClassName =
  "inline-flex size-9 items-center justify-center rounded-full text-custom-black/45 transition hover:bg-custom-black/5 hover:text-custom-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-black";

export function BlogPostShare({ title }: BlogPostShareProps) {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, [pathname]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: FaLinkedinIn,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: FaXTwitter,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FaFacebookF,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      Icon: FaEnvelope,
    },
  ] as const;

  return (
    <ul className="flex list-none items-center justify-end gap-0.5">
        {shareLinks.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={shareUrl ? href : undefined}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className={shareIconClassName}
            >
              <Icon className="size-4" aria-hidden />
            </a>
          </li>
        ))}
    </ul>
  );
}
