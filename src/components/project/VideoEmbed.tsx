"use client";

import { useState } from "react";
import Image from "next/image";
import { youtubeId, youtubeThumbnail } from "@/lib/youtube";
import styles from "./VideoEmbed.module.css";

// A YouTube video that shows its thumbnail and a play button until clicked, then swaps in
// YouTube's player. The player is heavy, so it only loads for people who actually watch.
export function VideoEmbed({
  url,
  title,
  caption,
  sizes = "(min-width: 1152px) 72rem, 100vw",
  preload = false,
}: {
  url: string; // any YouTube link
  title: string; // what screen readers announce, e.g. "AccessiGesture demo"
  caption?: string;
  sizes?: string;
  preload?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(url);

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={styles.player}
          />
        ) : (
          <button type="button" className={styles.poster} onClick={() => setPlaying(true)}>
            <Image src={youtubeThumbnail(url)} alt="" fill sizes={sizes} preload={preload} className="object-cover" />
            <span className={styles.play}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="sr-only">Play video: {title}</span>
          </button>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
