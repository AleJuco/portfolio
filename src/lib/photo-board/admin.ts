import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// You manage the photo board by signing in with PHOTO_BOARD_PASSWORD (set it in .env.local and on your host).
// Signing in stores a cookie holding a signature derived from the password, so changing the password signs everyone out.

export const ADMIN_COOKIE = "photo_board_admin";

const password = () => process.env.PHOTO_BOARD_PASSWORD || null;
export const adminEnabled = () => password() !== null;

export function adminToken() {
  const pw = password();
  return pw ? createHmac("sha256", pw).update("photo-board-admin").digest("hex") : null;
}

// compares hashes so neither the length nor the content leaks through timing
function same(a: string, b: string) {
  const hash = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(hash(a), hash(b));
}

export function checkPassword(input: string) {
  const pw = password();
  return pw !== null && same(input, pw);
}

export async function isAdmin() {
  const token = adminToken();
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  return token !== null && cookie !== undefined && same(cookie, token);
}
