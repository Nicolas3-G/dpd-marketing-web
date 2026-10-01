"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";

type VimeoPlayer = {
  play: () => Promise<void>;
};

type VimeoAPI = {
  Player: new (element: HTMLIFrameElement) => VimeoPlayer;
};

declare global {
  interface Window {
    Vimeo?: VimeoAPI;
  }
}

export function BlogPostVimeo({
  vimeoId,
  title,
}: {
  vimeoId: string;
  title: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [apiReady, setApiReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [poster, setPoster] = useState<string | null>(null);

  const attachPlayer = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !window.Vimeo) {
      return;
    }

    playerRef.current = new window.Vimeo.Player(iframe);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Vimeo) {
      setApiReady(true);
    }
  }, []);

  useEffect(() => {
    if (!apiReady) {
      return;
    }

    attachPlayer();
  }, [apiReady, attachPlayer]);

  useEffect(() => {
    const url = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${vimeoId}`)}&width=1280`;

    void fetch(url)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { thumbnail_url?: string } | null) => {
        if (data?.thumbnail_url) {
          setPoster(data.thumbnail_url);
        }
      })
      .catch(() => undefined);
  }, [vimeoId]);

  return (
    <>
      <Script
        src="https://player.vimeo.com/api/player.js"
        strategy="afterInteractive"
        onLoad={() => setApiReady(true)}
      />
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0`}
        title={title}
        className={`absolute inset-0 h-full w-full border-0 ${started ? "" : "pointer-events-none"}`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      {started ? null : (
        <button
          type="button"
          aria-label={`Play ${title}`}
          onClick={() => {
            setStarted(true);
            void playerRef.current?.play();
          }}
          className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-black focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-white"
        >
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <span className="absolute inset-0 bg-black/33" aria-hidden />
          <span className="relative z-10 flex size-20 items-center justify-center rounded-full bg-brand-orange text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition hover:bg-brand-orange-hover sm:size-24">
            <FaPlay className="ml-1 size-8 sm:size-9" aria-hidden />
          </span>
        </button>
      )}
    </>
  );
}
