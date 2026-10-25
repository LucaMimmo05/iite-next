import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { projects, type Project } from "@/data/projects";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="flex flex-col gap-4">
        {projects.map((project: Project) => (
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
