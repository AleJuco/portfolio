import { isAdmin } from "@/lib/photo-board/admin";
import { isPhotoId, isPhotoStatus, readPhoto } from "@/lib/photo-board/store";

// Serves one photo-board picture: /api/photo-board/approved/<id> for everyone,
// /api/photo-board/pending/<id> only to you while signed in.
export async function GET(_request: Request, { params }: RouteContext<"/api/photo-board/[status]/[id]">) {
  const { status, id } = await params;
  const notFound = () => new Response("Not found", { status: 404 });

  if (!isPhotoStatus(status) || !isPhotoId(id)) return notFound();
  if (status === "pending" && !(await isAdmin())) return notFound();

  const body = await readPhoto(status, id);
  if (!body) return notFound();

  return new Response(body as BodyInit, {
    headers: {
      "Content-Type": "image/jpeg",
      // approved photos never change (a new photo gets a new id); pending ones stay private
      "Cache-Control": status === "approved" ? "public, max-age=86400" : "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
