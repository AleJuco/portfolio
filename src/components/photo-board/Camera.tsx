"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { toSquareJpeg } from "./capture";
import styles from "./PhotoBoard.module.css";

type Stage = "starting" | "live" | "review" | "error";

// browsers only offer the camera on secure (https or localhost) pages
const cameraSupported = () => typeof navigator.mediaDevices?.getUserMedia === "function";

function cameraError(error: unknown) {
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError") return "Camera access was blocked. Allow it in your browser's address bar and try again.";
  if (name === "NotFoundError" || name === "OverconstrainedError") return "No camera was found on this device.";
  if (name === "NotReadableError") return "Your camera is busy in another app.";
  return "Couldn't start the camera.";
}

// Live selfie preview with a 3-2-1 countdown, then a look at the shot before posting it.
// `onPost` resolves to true once the photo is posted (the board then closes the camera).
export function Camera({ onPost, onClose }: { onPost: (photo: Blob) => Promise<boolean>; onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState<Stage>(() => (cameraSupported() ? "starting" : "error"));
  const [error, setError] = useState(() =>
    cameraSupported() ? "" : "This browser can't use the camera here (it needs a secure https page).",
  );
  const [count, setCount] = useState(0);
  const [shot, setShot] = useState<{ blob: Blob; url: string } | null>(null);
  const [posting, setPosting] = useState(false);

  // start the camera, and always switch it off again when the camera closes
  useEffect(() => {
    if (!cameraSupported()) return;
    let stream: MediaStream | undefined;
    let cancelled = false;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false })
      .then((s) => {
        stream = s;
        if (cancelled) return s.getTracks().forEach((t) => t.stop());
        if (video.current) video.current.srcObject = s;
        setStage("live");
      })
      .catch((e) => {
        if (cancelled) return;
        setError(cameraError(e));
        setStage("error");
      });
    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => () => void (shot && URL.revokeObjectURL(shot.url)), [shot]);

  // countdown: 3, 2, 1, snap
  useEffect(() => {
    if (count === 0) return;
    const timer = setTimeout(async () => {
      if (count > 1) return setCount(count - 1);
      setCount(0);
      const v = video.current;
      if (!v) return;
      try {
        const blob = await toSquareJpeg(v, v.videoWidth, v.videoHeight, true);
        setShot({ blob, url: URL.createObjectURL(blob) });
        setStage("review");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Couldn't take the photo.");
        setStage("error");
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [count]);

  async function post() {
    if (!shot) return;
    setPosting(true);
    const posted = await onPost(shot.blob);
    if (!posted) setPosting(false);
  }

  return (
    <div className={styles.camera}>
      <div className={styles.viewfinder}>
        <video ref={video} className={styles.video} autoPlay playsInline muted hidden={stage === "review"} />
        {shot && stage === "review" && (
          // eslint-disable-next-line @next/next/no-img-element -- a local preview of the shot, not a page image
          <img src={shot.url} alt="Your photo" className={styles.video} />
        )}
        {stage === "starting" && <p className={styles.cameraNote}>Starting camera…</p>}
        {stage === "error" && <p className={styles.cameraNote}>{error}</p>}
        {count > 0 && (
          <span key={count} className={styles.countdown} aria-live="assertive">
            {count}
          </span>
        )}
        {stage === "review" && <span className={styles.flash} aria-hidden="true" />}
      </div>

      <div className={styles.cameraBar}>
        {stage === "review" ? (
          <>
            <button type="button" className={styles.secondary} onClick={() => {
                setShot(null);
                setStage("live");
              }}
              disabled={posting}
            >
              Retake
            </button>
            <button type="button" className={styles.primary} onClick={post} disabled={posting}>
              {posting ? "Posting…" : "Post it"}
              <Icon name="check" weight="bold" className="size-4" />
            </button>
          </>
        ) : (
          <>
            <button type="button" className={styles.secondary} onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.primary}
              onClick={() => setCount(3)}
              disabled={stage !== "live" || count > 0}
            >
              Snap
              <Icon name="camera" className="size-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
