import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact">
      <Reveal className="max-w-3xl">
        <Panel className="flex flex-col items-start gap-5">
          <p className="text-lg text-soft">{site.contact.blurb}</p>
          <ArrowLink href={`mailto:${site.contact.email}`}>{site.contact.email}</ArrowLink>
        </Panel>
      </Reveal>
    </Section>
  );
}
