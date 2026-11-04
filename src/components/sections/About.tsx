import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about">
      <Reveal className="max-w-3xl">
        <Panel className="text-lg leading-relaxed text-soft">{site.about}</Panel>
      </Reveal>
    </Section>
  );
}
