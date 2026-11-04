import type { ArtName } from "@/content/site";
import { PandaHead, blush, ink } from "./PandaHead";

// Small hand-drawn stickers, each in a 64×64 box with a dark outline.
// To add one: draw it as a function below, add it to `drawings`, and add its name to `ArtName` in src/content/site.ts.

function Paw({ x, y, scale = 1, fill = "#c9a37e" }: { x: number; y: number; scale?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={fill} stroke="none">
      <ellipse cx="0" cy="5" rx="6" ry="5" />
      <circle cx="-7.5" cy="-2.5" r="2.4" />
      <circle cx="-3" cy="-5.5" r="2.4" />
      <circle cx="3" cy="-5.5" r="2.4" />
      <circle cx="7.5" cy="-2.5" r="2.4" />
    </g>
  );
}

function Sparkle({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${scale})`}
      d="M0-7l1.8 5.2L7 0l-5.2 1.8L0 7l-1.8-5.2L-7 0l5.2-1.8z"
      fill="#fff"
      strokeWidth={2}
    />
  );
}

const drawings = {
  panda: () => <PandaHead />,

  folder: () => (
    <>
      <path d="M7 17a4 4 0 0 1 4-4h13l5 6h24a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4z" fill="#fff" />
      <path d="M7 27h50" />
      <Paw x={32} y={39} />
    </>
  ),

  // a camera with panda ears and blushing cheeks, for the photo board
  camera: () => (
    <>
      <circle cx="15" cy="18" r="6" fill={ink} />
      <circle cx="49" cy="18" r="6" fill={ink} />
      <path d="M23 19l3-6h12l3 6" fill="#fff" />
      <rect x="7" y="19" width="50" height="33" rx="7" fill="#fff" />
      <circle cx="32" cy="35.5" r="10.5" fill="#d9def5" />
      <circle cx="32" cy="35.5" r="5.5" fill={ink} />
      <circle cx="29.8" cy="33.3" r="1.7" fill="#fff" stroke="none" />
      <rect x="45" y="23.5" width="6" height="4" rx="1.5" fill="#f3c56b" strokeWidth={2} />
      <circle cx="15" cy="42" r="2.6" fill={blush} stroke="none" />
      <circle cx="49" cy="42" r="2.6" fill={blush} stroke="none" />
      <Sparkle x={55} y={9} scale={0.8} />
    </>
  ),

  tools: () => (
    <>
      {/* wrench: handle, then the open-jawed head over its top end */}
      <g transform="rotate(-45 32 32)">
        <rect x="27.5" y="22" width="9" height="36" rx="4.5" fill="#fff" />
        <path d="M24 6.5A11 11 0 1 0 40 6.5V14l-4 3h-8l-4-3z" fill="#fff" />
      </g>
      <Sparkle x={51} y={14} scale={0.9} />
      <Sparkle x={13} y={51} scale={0.6} />
    </>
  ),

  mail: () => (
    <>
      <rect x="8" y="16" width="48" height="34" rx="5" fill="#fff" />
      <path d="M9 19l23 17 23-17" />
      <path
        d="M32 44c-4.5-3-7.5-5.5-7.5-8.5a3.7 3.7 0 0 1 7.5-1 3.7 3.7 0 0 1 7.5 1c0 3-3 5.5-7.5 8.5z"
        fill={blush}
        strokeWidth={2.6}
      />
    </>
  ),

  mug: () => (
    <>
      <path d="M22 15c-2-3 2-4 0-8M30 15c-2-3 2-4 0-8M38 15c-2-3 2-4 0-8" stroke="#fff" strokeWidth={2.6} />
      <path d="M46 28h3a6.5 6.5 0 0 1 0 13h-3" />
      <path d="M13 20h34v21a11 11 0 0 1-11 11H24a11 11 0 0 1-11-11z" fill="#fff" />
      <PandaHead transform="translate(15.5 21) scale(.45)" />
    </>
  ),

  resume: () => (
    <>
      <path d="M16 7h22l11 11v36a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3z" fill="#fff" />
      <path d="M38 7v11h11" />
      <path d="M19 27h22M19 34h22M19 41h11" strokeWidth={2.8} />
      <Paw x={41} y={47} scale={0.75} fill={blush} />
    </>
  ),

  // the panda in a little delivery cap, for the "Let's Go!" button
  driver: () => (
    <>
      <PandaHead />
      <path d="M17 19c1-8 7-12 15-12s14 4 15 12z" fill="#4b5bb8" />
      <path d="M14 19h36" strokeWidth={3.4} />
      <rect x="28" y="9.5" width="8" height="6" rx="1.5" fill="#f3c56b" strokeWidth={2} />
    </>
  ),
} satisfies Record<ArtName, () => React.ReactNode>;

export function Sticker({ name, className }: { name: ArtName; className?: string }) {
  const Drawing = drawings[name];
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke={ink}
      strokeWidth={3.2}
      strokeLinejoin="round"
      strokeLinecap="round"
      overflow="visible"
      aria-hidden="true"
    >
      <Drawing />
    </svg>
  );
}
