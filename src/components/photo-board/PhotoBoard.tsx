import { Suspense } from "react";
import { site } from "@/content/site";
import { adminEnabled, isAdmin } from "@/lib/photo-board/admin";
import { getApprovedPhotos, listPhotos } from "@/lib/photo-board/store";
import { Section } from "@/components/sections/Section";
import { Board } from "./Board";
import styles from "./PhotoBoard.module.css";

// Visitors post webcam selfies here. Their photos wait until you approve them; signed in, you can
// also upload, approve and delete. Storage and the password are set up in the README ("Photo board").
export function PhotoBoard() {
  return (
    <Section id="photo-board">
      <Suspense fallback={<div className={styles.loading} aria-hidden="true" />}>
        <BoardWithPhotos />
      </Suspense>
    </Section>
  );
}

// reads the sign-in cookie, so it renders per visitor (behind the Suspense above)
async function BoardWithPhotos() {
  const admin = await isAdmin();
  const [photos, pending] = await Promise.all([getApprovedPhotos(), admin ? listPhotos("pending") : []]);
  return (
    <Board
      photos={photos}
      pending={pending}
      admin={admin}
      adminEnabled={adminEnabled()}
      blurb={site.photoBoard.blurb}
      thanks={site.photoBoard.thanks}
    />
  );
}
