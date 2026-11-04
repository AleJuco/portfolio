"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const FADE = 1.5; // seconds for the crossfade between photos

// Crossfades through `photos`. Stays on the first photo for people who have
// reduced motion turned on.
export function Slideshow({ photos, seconds }: { photos: string[]; seconds: number }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || photos.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % photos.length), seconds * 1000);
    return () => clearInterval(timer);
  }, [reduce, photos.length, seconds]);

  const next = photos[(index + 1) % photos.length];

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={photos[index]}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE, ease: "easeInOut" }}
        >
          <Image src={photos[index]} alt="" fill sizes="100vw" preload={index === 0} className="object-cover" />
        </motion.div>
      </AnimatePresence>

      {/* Loads the next photo in the background so it's ready before its turn. */}
      {photos.length > 1 && (
        <Image src={next} alt="" fill sizes="100vw" loading="eager" className="invisible object-cover" />
      )}
    </>
  );
}
