// Everything personal on the site lives here (projects have their own file: projects.ts).
import { projects } from "./projects";

// Plain icons for small buttons. They map to Phosphor icons in src/components/ui/Icon.tsx.
export type IconName = "github" | "linkedin" | "eye" | "mail" | "doc" | "arrow-up" | "arrow-left"
  | "camera" | "upload" | "check" | "x" | "lock";

// Hand-drawn panda-style stickers for the menu and badges. Drawn in src/components/art/Sticker.tsx.
export type ArtName = "panda" | "folder" | "camera" | "tools" | "mail" | "mug" | "resume" | "driver";

export const site = {
  name: "Alejandro Imperial",
  role: "Engineering Undergraduate",
  footer: "© 2026 Your Name",

  // Rolling counter in the top-left panel. `digits` pads the value with leading zeros.
  counter: { label: "Lines Shipped", value: 380060, digits: 8 },

  // Hero background slideshow: put photos (jpg/png/webp/avif) in public/<folder>.
  // They play in filename order (name them 01.jpg, 02.jpg… to choose the order).
  // With no photos in the folder, a plain dark backdrop shows instead.
  slideshow: { folder: "hero", seconds: 7 },

  // Round buttons in the top-right corner.
  quickLinks: [
    { label: "About me", href: "https://www.linkedin.com/in/alejandrojucoimperial", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/AleJuco", icon: "github" },
    { label: "See my work", href: "#projects", icon: "eye" },
    ] satisfies { label: string; href: string; icon: IconName }[],

  // Right-hand menu. Each `id` must match a section below. `art` is the sticker shown next to it.
  sections: [
    { id: "about", label: "About", detail: "Who I am", art: "panda" },
    { id: "projects", label: "Projects", detail: `${projects.length} builds`, art: "folder" },
    { id: "skills", label: "Skills", detail: "", art: "tools" },
    { id: "contact", label: "Contact", detail: "Say hello", art: "mail" },
    { id: "photo-board", label: "Photo Board", detail: "Leave a selfie", art: "camera" },
  ] satisfies { id: string; label: string; detail: string; art: ArtName }[],

  // Round sticker links in the bottom-left corner. `live: true` adds a pulsing green dot.
  badges: [
    { label: "Open to Work", detail: "Available now", href: "#contact", art: "mug", live: true },
    { label: "Resume", detail: "Download PDF", href: "/resume.pdf", art: "resume", live: false },
  ] satisfies { label: string; detail: string; href: string; art: ArtName; live: boolean }[],

  cta: { label: "Let's Go!", href: "#about" },

  about:
    "Write a few sentences about yourself here: what you care about, what you're working on, and what you're looking for next.",

  // Projects (and their pages) live in src/content/projects.ts.

  skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "SQL", "Git", "Figma"],

  contact: { email: "imperial.alejandroj1@gmail.com", blurb: "pls hire me" },

  // Visitors snap a webcam photo; it shows once you approve it. Setup (storage + password) is in the README.
  photoBoard: {
    blurb: "Say hi with a webcam selfie! It goes up on the board once I've had a look.",
    thanks: "Sent! It'll show up on the board once it's approved.",
  },
};
