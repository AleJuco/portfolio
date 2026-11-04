import { MAX_PHOTO_BYTES, PHOTO_SIZE } from "@/lib/photo-board/limits";

// Crops an image (a webcam frame or a picked file) to a centred square, scales it down
// and encodes it as a JPEG small enough to post. `mirror` flips it like the selfie preview.
export async function toSquareJpeg(source: CanvasImageSource, width: number, height: number, mirror = false) {
  const side = Math.min(width, height);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = Math.min(PHOTO_SIZE, side);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser can't process photos.");
  if (mirror) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(source, (width - side) / 2, (height - side) / 2, side, side, 0, 0, canvas.width, canvas.height);

  for (const quality of [0.86, 0.72, 0.58]) {
    const blob = await new Promise<Blob | null>((done) => canvas.toBlob(done, "image/jpeg", quality));
    if (blob && blob.size <= MAX_PHOTO_BYTES) return blob;
  }
  throw new Error("That photo is too big to post.");
}

export async function fileToSquareJpeg(file: File) {
  const bitmap = await createImageBitmap(file);
  try {
    return await toSquareJpeg(bitmap, bitmap.width, bitmap.height);
  } finally {
    bitmap.close();
  }
}
