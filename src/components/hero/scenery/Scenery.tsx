import { Parallax } from "./Parallax";
import { Slideshow } from "./Slideshow";
import styles from "./Scenery.module.css";

// The background behind the hero: a photo slideshow when `photos` has any,
// otherwise a plain dark backdrop. A light shade at the edges keeps the text readable.
export function Scenery({ photos, seconds }: { photos: string[]; seconds: number }) {
  return (
    <div className={styles.scenery} aria-hidden="true">
      {photos.length > 0 && (
        <Parallax speed={0.3}>
          <Slideshow photos={photos} seconds={seconds} />
        </Parallax>
      )}
      <span className={styles.shade} />
    </div>
  );
}
