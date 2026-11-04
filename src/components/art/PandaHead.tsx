// The panda's head, drawn in a 64×64 box. It's an SVG group, so it goes inside an <svg>:
// on its own in a sticker, or moved/scaled with `transform` inside a bigger drawing.

export const ink = "#1f1a24"; // outline colour for every drawing
export const fur = "#26222c"; // black patches: ears, eyes, arms, legs
export const blush = "#ff9db0";

const HEAD = "M6 33C6 18 18 12 32 12s26 6 26 21c0 13-11 21-26 21S6 46 6 33z";

export function PandaHead({ transform }: { transform?: string }) {
  return (
    <g transform={transform} stroke={ink} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
      {/* ears, then the face over them */}
      <circle cx="13" cy="15" r="7.5" fill={fur} />
      <circle cx="51" cy="15" r="7.5" fill={fur} />
      <path d={HEAD} fill="#fff" />
      <g stroke="none">
        {/* tilted eye patches with shiny highlights */}
        <ellipse cx="20.5" cy="31" rx="6" ry="7.6" fill={fur} transform="rotate(28 20.5 31)" />
        <ellipse cx="43.5" cy="31" rx="6" ry="7.6" fill={fur} transform="rotate(-28 43.5 31)" />
        <circle cx="22" cy="29" r="2.2" fill="#fff" />
        <circle cx="42" cy="29" r="2.2" fill="#fff" />
        <circle cx="19.6" cy="32.6" r=".9" fill="#fff" />
        <circle cx="44.4" cy="32.6" r=".9" fill="#fff" />
        <ellipse cx="11.5" cy="41.5" rx="3.8" ry="2.5" fill={blush} opacity=".75" />
        <ellipse cx="52.5" cy="41.5" rx="3.8" ry="2.5" fill={blush} opacity=".75" />
        <path d="M28.5 38q3.5-1.8 7 0q-1.2 3.4-3.5 4q-2.3-.6-3.5-4z" fill={fur} />
      </g>
      {/* little "w" smile */}
      <path d="M32 42v1.4M27 43.2q2.6 3.8 5 .6q2.4 3.2 5-.6" strokeWidth={2.2} />
    </g>
  );
}
