import {
  ArrowLeft,
  ArrowUp,
  Camera,
  Check,
  EnvelopeSimple,
  Eye,
  FileText,
  GithubLogo,
  LinkedinLogo,
  LockSimple,
  UploadSimple,
  X,
} from "@phosphor-icons/react/ssr";
import type { IconWeight } from "@phosphor-icons/react";
import type { IconName } from "@/content/site";

// Plain Phosphor icons (phosphoricons.com) for small buttons. The cute drawings live in src/components/art.
// To add one, import it above and give it a name here, then add that name to `IconName` in src/content/site.ts.
const icons = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  eye: Eye,
  mail: EnvelopeSimple,
  doc: FileText,
  "arrow-up": ArrowUp,
  "arrow-left": ArrowLeft,
  camera: Camera,
  upload: UploadSimple,
  check: Check,
  x: X,
  lock: LockSimple,
} satisfies Record<IconName, unknown>;

// `weight`: "fill" (the default), "bold", "regular" or "duotone".
export function Icon({ name, weight = "fill", className }: { name: IconName; weight?: IconWeight; className?: string }) {
  const Glyph = icons[name];
  return <Glyph weight={weight} className={className} aria-hidden="true" />;
}
