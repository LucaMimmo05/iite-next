import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="flex flex-col gap-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <Card
              layout="row"
              title={project.title}
              subtitle={project.subtitle}
              href={project.href}
              image={project.image}
            >
              <p>{project.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
