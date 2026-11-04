# Portfolio

Personal portfolio built with Next.js, Tailwind CSS and Motion.

```
npm run dev     # local dev server at http://localhost:3000
npm run build   # production build
```

## Where things live

| I want to change…                        | Edit                                              |
| ---------------------------------------- | ------------------------------------------------- |
| Any text, links, jobs, skills            | `src/content/site.ts`                             |
| Projects and their pages                 | `src/content/projects.ts` (+ images in `public/projects/<slug>/`) |
| How a project page looks                 | `src/components/project/`                         |
| The order of sections on the page        | `src/app/page.tsx`                                |
| Where hero pieces sit on screen          | `src/components/hero/Hero.tsx`                    |
| How one piece looks                      | that component's `.module.css` file (next to it)  |
| How one piece animates                   | that component's `.tsx` file                      |
| Site-wide colours                        | `src/app/globals.css` (`:root` variables)         |
| The panda and the cute icons             | `src/components/art/`                             |
| Spring feel for all animations           | `src/components/motion/presets.ts`                |

```
src/
├─ app/
│  ├─ layout.tsx          fonts, page title, animation settings
│  ├─ page.tsx            the home page, top to bottom
│  ├─ projects/[slug]/    one page per project (built from projects.ts)
│  └─ globals.css         colours + site-wide styles
├─ content/
│  ├─ site.ts             your text and links
│  └─ projects.ts         your projects (each gets a page at /projects/<slug>)
├─ components/
│  ├─ hero/               the full-screen opening view
│  │  ├─ Hero.tsx         puts the pieces below in place
│  │  ├─ NameTag          top-left name + role
│  │  ├─ CounterSign      panel with rolling counter
│  │  ├─ QuickLinks       top-right round buttons
│  │  ├─ SectionMenu      right-side menu (scrolls to sections)
│  │  ├─ Badges           bottom-left sticker links
│  │  ├─ LetsGoButton     bottom-right call to action
│  │  └─ scenery/         dimmed photo slideshow + parallax
│  ├─ sections/           About, Projects, Skills, Contact
│  │  └─ Section.tsx      shared heading + "↑ Menu" frame
│  ├─ photo-board/        webcam photo board: PhotoBoard (server), Board, Camera
│  ├─ project/            project page: ProjectPage (layout), ImageSlot (image or empty slot)
│  ├─ art/                hand-drawn SVGs: PandaHead, Sticker (menu + badge icons)
│  ├─ ui/                 small reusable pieces: Icon, Panel, Chip, ArrowLink
│  └─ motion/             animation helpers: presets, Reveal, MotionProvider
└─ lib/
   ├─ links.ts            new-tab / download handling for links
   └─ photo-board/        photo storage, your sign-in, and the server actions
```

Each component is a pair: `Name.tsx` (markup + animation) and `Name.module.css` (its styles).

### Adding a section

1. Add an entry to `sections` in `src/content/site.ts` (this creates the menu button).
2. Copy `src/components/sections/About.tsx`, rename it, and set `<Section id="…">` to the same id.
3. Add the component to `src/app/page.tsx`.

## Photo board

Visitors take a webcam selfie in the Photo Board section. Their photos stay hidden until you approve them.

**Managing it:** click the small **Manage** lock under the board and enter your password. Signed in, you can:
- approve or delete photos waiting for review (✓ / ×)
- delete any photo on the board (×)
- post your own photos from the webcam or with **Upload**; yours go straight onto the board

**Setup**

| Variable | What it does |
|---|---|
| `PHOTO_BOARD_PASSWORD` | Your password for managing the board. Already set in `.env.local` for local use. |
| `BLOB_READ_WRITE_TOKEN` | Where photos are stored. Without it, photos save to the `.photo-board/` folder (local only). |

To deploy on Vercel:
1. In your Vercel project, open **Storage → Create → Blob** and choose **Private** access. Connect it to the project; this adds `BLOB_READ_WRITE_TOKEN` for you.
2. Under **Settings → Environment Variables**, add `PHOTO_BOARD_PASSWORD` (use a long password).
3. Redeploy.

The webcam only works on https pages (and on localhost).

