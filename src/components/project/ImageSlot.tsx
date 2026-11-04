import Image from "next/image";
import { Sticker } from "@/components/art/Sticker";
import styles from "./ImageSlot.module.css";

// An image in a rounded frame, with an optional caption. With no `src` it shows an empty slot:
// while you're running `npm run dev` the slot says which file to add; on the live site it says "coming soon".
export function ImageSlot({
  src,
  alt,
  caption,
  hint,
  aspect = "16 / 9",
  sizes = "(min-width: 1152px) 72rem, 100vw",
  preload = false,
  rounded = "14px",
}: {
  src?: string;
  alt: string;
  caption?: string;
  hint: string; // where to put the file, e.g. "public/projects/project-one/cover.jpg"
  aspect?: string;
  sizes?: string;
  preload?: boolean;
  rounded?: string; // corner radius of the frame
}) {
  return (
    <figure className={styles.figure}>
      <div
        className={`${styles.frame} ${src ? "" : styles.empty}`}
        style={{ aspectRatio: aspect, borderRadius: rounded }}
      >
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
        ) : (
          <div className={styles.placeholder}>
            <Sticker name="panda" className="size-10 opacity-60" />
            <span className="caption">
              {process.env.NODE_ENV === "development" ? `Add image: ${hint}` : "Image coming soon"}
            </span>
          </div>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
