"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  speed?: number;
};

function classNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageWrapperClassName,
  imageClassName,
  speed = 0.16,
}: ParallaxImageProps) {
  const frameRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const image = imageRef.current;

    if (!wrapper || !image) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePosition = () => {
      frameRef.current = 0;

      if (motionQuery.matches) {
        image.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const y = rect.top * -speed;

      image.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const requestUpdate = () => {
      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updatePosition);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(wrapper);

    updatePosition();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    motionQuery.addEventListener("change", requestUpdate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      motionQuery.removeEventListener("change", requestUpdate);
    };
  }, [speed]);

  return (
    <div
      ref={wrapperRef}
      className={classNames(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden={alt ? undefined : true}
    >
      <div
        ref={imageRef}
        className={classNames(
          "absolute -inset-y-16 inset-x-0 will-change-transform",
          imageWrapperClassName,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={classNames("object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}

export function ParallaxBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <ParallaxImage
        src="/bg-1.jpg"
        alt=""
        sizes="100vw"
        imageWrapperClassName="-inset-y-24"
        imageClassName="scale-110 blur-sm brightness-125 saturate-150"
      />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
