"use client";

import Image from "next/image";
import { useActionState, useOptimistic, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Photo, PhotoStatus } from "@/lib/photo-board/store";
import { approvePhoto, deletePhoto, postPhoto, signIn, signOut } from "@/lib/photo-board/actions";
import { Icon } from "@/components/ui/Icon";
import { Sticker } from "@/components/art/Sticker";
import { Camera } from "./Camera";
import { fileToSquareJpeg } from "./capture";
import styles from "./PhotoBoard.module.css";

type Notice = { tone: "ok" | "error"; text: string };

const date = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

// a small, steady tilt per photo (from its id) so the board looks pinned up by hand
function tilt(id: string) {
  let n = 0;
  for (const c of id) n = (n * 31 + c.charCodeAt(0)) % 997;
  return (n % 7) - 3;
}

// The interactive board: camera, the pinned-up photos and, when you're signed in, the review tray.
export function Board({
  photos,
  pending,
  admin,
  adminEnabled,
  blurb,
  thanks,
}: {
  photos: Photo[];
  pending: Photo[];
  admin: boolean;
  adminEnabled: boolean;
  blurb: string;
  thanks: string;
}) {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [, startTransition] = useTransition();
  const [hidden, hide] = useOptimistic<string[], string>([], (ids, id) => [...ids, id]);
  const upload = useRef<HTMLInputElement>(null);

  async function post(photo: Blob) {
    const form = new FormData();
    form.append("photo", photo, "photo.jpg");
    const result = await postPhoto(form).catch(() => ({ ok: false as const, error: "Couldn't post. Check your connection." }));
    if (!result.ok) {
      setNotice({ tone: "error", text: result.error });
      return false;
    }
    setCameraOpen(false);
    setNotice({ tone: "ok", text: admin ? "Posted to the board." : thanks });
    return true;
  }

  async function uploadFiles(files: FileList | null) {
    for (const file of Array.from(files ?? [])) {
      try {
        if (!(await post(await fileToSquareJpeg(file)))) break;
      } catch {
        setNotice({ tone: "error", text: `Couldn't read ${file.name}.` });
      }
    }
    if (upload.current) upload.current.value = "";
  }

  function manage(id: string, action: typeof approvePhoto) {
    startTransition(async () => {
      hide(id);
      const result = await action(id);
      setNotice(result.ok ? null : { tone: "error", text: result.error });
    });
  }

  const visible = photos.filter((p) => !hidden.includes(p.id));
  const waiting = pending.filter((p) => !hidden.includes(p.id));

  return (
    <div className="flex flex-col gap-6">
      <div className={styles.intro}>
        <p className="text-lg text-soft">{blurb}</p>
        <div className="flex flex-wrap gap-3">
          {!cameraOpen && (
            <button
              type="button"
              className={styles.primary}
              onClick={() => {
                setNotice(null);
                setCameraOpen(true);
              }}
            >
              Take a photo
              <Icon name="camera" className="size-4" />
            </button>
          )}
          {admin && (
            <>
              <button type="button" className={styles.secondary} onClick={() => upload.current?.click()}>
                Upload
                <Icon name="upload" weight="bold" className="size-4" />
              </button>
              <input
                ref={upload}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => uploadFiles(e.target.files)}
              />
            </>
          )}
        </div>
      </div>

      {cameraOpen && <Camera onPost={post} onClose={() => setCameraOpen(false)} />}

      <p role="status" className={notice?.tone === "error" ? styles.error : styles.ok}>
        {notice?.text}
      </p>

      {admin && (
        <section className={styles.tray} aria-label="Waiting for approval">
          <h3 className="caption">Waiting for approval · {waiting.length}</h3>
          {waiting.length === 0 ? (
            <p className="text-sm text-muted">Nothing to review.</p>
          ) : (
            <ul className={`${styles.grid} ${styles.small}`}>
              <AnimatePresence>
                {waiting.map((photo) => (
                  <Polaroid key={photo.id} photo={photo} status="pending">
                    <button
                      type="button"
                      className={styles.approve}
                      aria-label="Approve photo"
                      onClick={() => manage(photo.id, approvePhoto)}
                    >
                      <Icon name="check" weight="bold" className="size-4" />
                    </button>
                    <DeleteButton onDelete={() => manage(photo.id, deletePhoto)} />
                  </Polaroid>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </section>
      )}

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <Sticker name="camera" className="size-14" />
          <p className="text-muted">No photos yet. Be the first!</p>
        </div>
      ) : (
        <ul className={styles.grid}>
          <AnimatePresence>
            {visible.map((photo) => (
              <Polaroid key={photo.id} photo={photo} status="approved">
                {admin && <DeleteButton onDelete={() => manage(photo.id, deletePhoto)} />}
              </Polaroid>
            ))}
          </AnimatePresence>
        </ul>
      )}

      <div className="flex justify-end">
        {admin ? (
          <form action={signOut}>
            <button type="submit" className={`caption ${styles.manage}`}>
              <Icon name="lock" className="size-3.5" />
              Signed in · Sign out
            </button>
          </form>
        ) : (
          adminEnabled && <SignIn />
        )}
      </div>
    </div>
  );
}

function Polaroid({ photo, status, children }: { photo: Photo; status: PhotoStatus; children?: React.ReactNode }) {
  const when = date.format(photo.takenAt);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={styles.polaroid}
      style={{ "--tilt": `${tilt(photo.id)}deg` } as React.CSSProperties}
    >
      <span className={styles.tape} aria-hidden="true" />
      <span className={styles.photo}>
        <Image
          src={`/api/photo-board/${status}/${photo.id}`}
          alt={`Visitor photo, ${when}`}
          fill
          unoptimized
          sizes="15rem"
        />
      </span>
      <span className={`caption ${styles.date}`}>{when}</span>
      {children && <span className={styles.controls}>{children}</span>}
    </motion.li>
  );
}

function DeleteButton({ onDelete }: { onDelete: () => void }) {
  return (
    <button
      type="button"
      className={styles.delete}
      aria-label="Delete photo"
      onClick={() => confirm("Delete this photo for good?") && onDelete()}
    >
      <Icon name="x" weight="bold" className="size-4" />
    </button>
  );
}

// a small lock in the corner that opens the password box
function SignIn() {
  const [open, setOpen] = useState(false);
  const [state, action, signingIn] = useActionState(signIn, null);

  if (!open) {
    return (
      <button type="button" className={`caption ${styles.manage}`} onClick={() => setOpen(true)}>
        <Icon name="lock" className="size-3.5" />
        Manage
      </button>
    );
  }
  return (
    <form action={action} className={styles.signIn}>
      <input
        type="password"
        name="password"
        placeholder="Board password"
        aria-label="Board password"
        autoComplete="current-password"
        required
        autoFocus
      />
      <button type="submit" className={styles.secondary} disabled={signingIn}>
        {signingIn ? "…" : "Sign in"}
      </button>
      {state && !state.ok && <span className={styles.error}>{state.error}</span>}
    </form>
  );
}
