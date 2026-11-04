import fs from "node:fs";
import path from "node:path";

const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

// Lists the photos in public/<folder> as URLs, in alphabetical order.
// Read when the page is built, so in production re-run `npm run build` after adding photos.
export function listPhotos(folder: string): string[] {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/${folder}/${encodeURIComponent(file)}`);
}
