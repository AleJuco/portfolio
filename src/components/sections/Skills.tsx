import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills">
      <ul className="flex flex-wrap gap-3">
        {site.skills.map((skill, i) => (
          <Reveal as="li" key={skill} delay={i * 0.04}>
            <Chip size="lg">{skill}</Chip>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
