// Your projects. Each one gets a card on the home page and its own page at /projects/<slug>.
// To add a project, copy one of the { … } blocks below and change everything in it.
//
// Images: make a folder public/projects/<slug>/ and drop images in it, then point `cover`
// (and `thumbnail` and the `gallery` entries, if you want them) at them, e.g. "/projects/project-one/cover.jpg".
// Leave an image out and an empty image slot shows in its place.
//
// YouTube videos: paste any YouTube link as `video` (shown at the top instead of the cover image)
// or as `video` on a gallery entry, e.g. { video: "https://youtu.be/abc123XYZ_0", caption: "Demo" }.


export type Project = {
  slug: string; // the page address: /projects/<slug>. Letters, numbers and dashes only.
  title: string;
  blurb: string; // one line, shown on the card and under the title
  year: string;
  tags: string[];
  video?: string; // YouTube link shown at the top of the page instead of the cover image
  cover?: string; // main image at the top of the page (and on the card)
  thumbnail?: string; // a different image for the home-page card; falls back to `cover`, then the video's thumbnail
  links: { label: string; href: string }[]; // buttons under the title; the first is the main one
  details: { label: string; value: string }[]; // the facts box beside the write-up
  story: { heading: string; body: string }[]; // the write-up; separate paragraphs with a blank line
  gallery: { src?: string; video?: string; caption: string }[]; // more images or YouTube videos, two to a row
};

export const projects: Project[] = [
  {
    slug: "AccessiGesture",
    title: "AccessiGesture",
    blurb: "Gesture control interface for computers, designed for accessibility and ease of use.",
    year: "2025",
    tags: ["Python", "OpenCV", "MediaPipe"],
    cover: "/projects/AccessigestureCover.png",
    video: "https://www.youtube.com/watch?v=bQuyfCt01F8&t=4s",
    links: [
      { label: "Devpost", href: "https://devpost.com/software/accessigesture" },
      { label: "GitHub", href: "https://github.com/dlt87/AccessiGesture" },
    ],
    details: [
      { label: "Role", value: "Team Hackathon" },
      { label: "Timeline", value: "24 Hours" },
      { label: "Tools", value: "Python, OpenCV, MediaPipe" },
    ],
    story: [
      {
        heading: "Overview",
        body: "AccessiGesture is a gesture control interface for computers, designed to enhance accessibility and ease of use. It allows users to interact with their devices using hand gestures, providing an alternative input method for those with physical limitations or preferences for touchless interaction.",
      },
    ],
    gallery: [
      { src: "/projects/AccessigestureCover.png", caption: "Caption for the first image" },
      { caption: "Caption for the second image" },
    ],
  },
  {
    slug: "project-two",
    title: "Project Two",
    blurb: "One line on what it does and why it matters.",
    year: "2025",
    tags: ["React", "Tailwind"],
    links: [{ label: "GitHub", href: "#" }],
    details: [
      { label: "Role", value: "Team of 4 · front end" },
      { label: "Timeline", value: "Semester project" },
    ],
    story: [
      { heading: "Overview", body: "What is it, and who is it for?" },
      { heading: "How I built it", body: "The interesting parts of how it works." },
    ],
    gallery: [{ caption: "Caption for an image" }, { caption: "Caption for an image" }],
  },
  {
    slug: "project-three",
    title: "Project Three",
    blurb: "One line on what it does and why it matters.",
    year: "2024",
    tags: ["Node", "Postgres"],
    links: [],
    details: [{ label: "Role", value: "Solo project" }],
    story: [{ heading: "Overview", body: "What is it, and who is it for?" }],
    gallery: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
