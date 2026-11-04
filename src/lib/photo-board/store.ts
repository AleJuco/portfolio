import "server-only";
import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { del, get, list, put, rename } from "@vercel/blob";
import { cacheLife, cacheTag } from "next/cache";

// Where photo-board pictures are kept. With BLOB_READ_WRITE_TOKEN set (a *private* Vercel Blob store),
// they go to Vercel Blob; without it (local development) they go to the .photo-board/ folder.
// Every photo is a JPEG at photo-board/<status>/<id>.jpg: "pending" until you approve it, then "approved".

export type PhotoStatus = "pending" | "approved";
export type Photo = { id: string; takenAt: number };

export const PHOTO_TAG = "photo-board";

const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const LOCAL_DIR = path.join(process.cwd(), ".photo-board");
const ID = /^[0-9a-z]{6,12}-[0-9a-f]{12}$/;

export const isPhotoId = (id: string) => ID.test(id);
export const isPhotoStatus = (s: string): s is PhotoStatus => s === "pending" || s === "approved";

const key = (status: PhotoStatus, id: string) => `photo-board/${status}/${id}.jpg`;
const localFile = (status: PhotoStatus, id: string) => path.join(LOCAL_DIR, status, `${id}.jpg`);

// ids start with the time in base 36, so they sort by age and carry their own date
const newId = () => `${Date.now().toString(36)}-${randomBytes(6).toString("hex")}`;
const toPhoto = (id: string): Photo => ({ id, takenAt: parseInt(id.split("-")[0], 36) });

export async function listPhotos(status: PhotoStatus): Promise<Photo[]> {
  const ids: string[] = [];
  if (useBlob) {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: `photo-board/${status}/`, cursor });
      for (const blob of page.blobs) ids.push(path.posix.basename(blob.pathname, ".jpg"));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } else {
    const files = await fs.readdir(path.join(LOCAL_DIR, status)).catch(() => []);
    for (const file of files) if (file.endsWith(".jpg")) ids.push(file.slice(0, -4));
  }
  return ids.filter(isPhotoId).sort().reverse().map(toPhoto); // newest first
}

// The approved photos everyone sees, cached until a photo is added, approved or deleted.
export async function getApprovedPhotos() {
  "use cache";
  cacheTag(PHOTO_TAG);
  cacheLife("hours");
  return listPhotos("approved");
}

export async function savePhoto(status: PhotoStatus, jpeg: Buffer) {
  const id = newId();
  if (useBlob) {
    await put(key(status, id), jpeg, { access: "private", contentType: "image/jpeg" });
  } else {
    await fs.mkdir(path.join(LOCAL_DIR, status), { recursive: true });
    await fs.writeFile(localFile(status, id), jpeg);
  }
  return id;
}

// The photo's bytes, or null if there's no such photo.
export async function readPhoto(status: PhotoStatus, id: string): Promise<ReadableStream | Buffer | null> {
  if (useBlob) {
    const result = await get(key(status, id), { access: "private" }).catch(() => null);
    return result?.statusCode === 200 ? result.stream : null;
  }
  return fs.readFile(localFile(status, id)).catch(() => null);
}

export async function approvePhoto(id: string) {
  if (useBlob) {
    await rename(key("pending", id), key("approved", id), { access: "private", contentType: "image/jpeg" });
  } else {
    await fs.mkdir(path.join(LOCAL_DIR, "approved"), { recursive: true });
    await fs.rename(localFile("pending", id), localFile("approved", id));
  }
}

export async function deletePhoto(id: string) {
  if (useBlob) {
    await del([key("pending", id), key("approved", id)]);
  } else {
    await Promise.all([fs.rm(localFile("pending", id), { force: true }), fs.rm(localFile("approved", id), { force: true })]);
  }
}
