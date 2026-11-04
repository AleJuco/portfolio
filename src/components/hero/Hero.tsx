import { site } from "@/content/site";
import { listPhotos } from "@/lib/photos";
import { Scenery } from "./scenery/Scenery";
import { NameTag } from "./NameTag";
import { CounterSign } from "./CounterSign";
import { QuickLinks } from "./QuickLinks";
import { SectionMenu } from "./SectionMenu";
import { Badges } from "./Badges";
import { LetsGoButton } from "./LetsGoButton";

// The full-screen opening view. Each piece below is its own component in this folder;
// the classes here only decide where each piece sits on the screen.
// On phones everything stacks in one column; from `md` up, pieces are pinned to the corners.
export function Hero() {
  return (
    <header
      id="top"
      className="relative isolate flex min-h-svh flex-col gap-8 overflow-hidden px-4 py-6 md:block md:h-svh md:min-h-[720px] md:p-0"
    >
      <Scenery photos={listPhotos(site.slideshow.folder)} seconds={site.slideshow.seconds} />

      {/* Top-left */}
      <div className="z-10 md:absolute md:top-8 md:left-12">
        <NameTag name={site.name} role={site.role} />
        <CounterSign {...site.counter} />
      </div>

      {/* Top-right */}
      <nav aria-label="Quick links" className="z-10 md:absolute md:top-8 md:right-14">
        <QuickLinks links={site.quickLinks} />
      </nav>

      {/* Right */}
      <nav aria-label="Sections" className="z-10 md:absolute md:top-[17%] md:right-0">
        <SectionMenu items={site.sections} />
      </nav>

      {/* Bottom-left */}
      <div className="z-10 md:absolute md:bottom-14 md:left-12">
        <Badges items={site.badges} />
      </div>

      {/* Bottom-right */}
      <div className="z-10 md:absolute md:right-14 md:bottom-14">
        <LetsGoButton {...site.cta} />
      </div>

      <p className="caption z-10 text-soft [text-shadow:0_1px_3px_rgb(0_0_0/0.85)] md:absolute md:right-8 md:bottom-4">
        {site.footer}
      </p>
    </header>
  );
}
