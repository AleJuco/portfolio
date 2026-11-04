"use server";

import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import { ADMIN_COOKIE, adminToken, checkPassword, isAdmin } from "./admin";
import { MAX_PHOTO_BYTES } from "./limits";
import {
  PHOTO_TAG,
  approvePhoto as approve,
  deletePhoto as remove,
  isPhotoId,
  listPhotos,
  savePhoto,
} from "./store";

// Everything the photo board does on the server. Each action checks for itself who is asking.

export type Result = { ok: true; message?: string } | { ok: false; error: string };

const MAX_PENDING = 60; // stop accepting visitor photos when this many are waiting for review

export async function postPhoto(formData: FormData): Promise<Result> {
  const file = formData.get("photo");
  if (!(file instanceof Blob) || file.size === 0) return { ok: false, error: "No photo was attached." };
  if (file.size > MAX_PHOTO_BYTES) return { ok: false, error: "That photo is too big." };

  const bytes = Buffer.from(await file.arrayBuffer());
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (!isJpeg) return { ok: false, error: "Only JPEG photos can be posted." };

  const admin = await isAdmin();
  if (!admin && (await listPhotos("pending")).length >= MAX_PENDING) {
    return { ok: false, error: "The board's inbox is full right now. Try again later!" };
  }

  await savePhoto(admin ? "approved" : "pending", bytes);
  updateTag(PHOTO_TAG);
  return { ok: true };
}

export async function approvePhoto(id: string): Promise<Result> {
  if (!(await isAdmin())) return { ok: false, error: "Sign in to manage the board." };
  if (!isPhotoId(id)) return { ok: false, error: "Unknown photo." };
  await approve(id);
  updateTag(PHOTO_TAG);
  return { ok: true };
}

export async function deletePhoto(id: string): Promise<Result> {
  if (!(await isAdmin())) return { ok: false, error: "Sign in to manage the board." };
  if (!isPhotoId(id)) return { ok: false, error: "Unknown photo." };
  await remove(id);
  updateTag(PHOTO_TAG);
  return { ok: true };
}

export async function signIn(_prev: Result | null, formData: FormData): Promise<Result> {
  const token = adminToken();
  if (!token) return { ok: false, error: "Set PHOTO_BOARD_PASSWORD first (see the README)." };
  if (!checkPassword(String(formData.get("password") ?? ""))) return { ok: false, error: "Wrong password." };

  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return { ok: true };
}

export async function signOut() {
  (await cookies()).delete(ADMIN_COOKIE);
}
