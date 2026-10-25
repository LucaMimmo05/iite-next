import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { team, type TeamMember } from "@/data/team";

function displayName(member: TeamMember) {
  return member.degree ? `${member.name}, ${member.degree}` : member.name;
}

export function People() {
  return (
    <Section
      id="people"
      title="People"
      intro="We are a multidisciplinary team that brings together strategic vision, scientific expertise and practical technology development."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member: TeamMember) => (
          <li key={member.slug} className={member.quote ? "sm:col-span-2 sm:row-span-2" : undefined}>
            <Card
              title={displayName(member)}
              subtitle={member.role}
              image={member.image}
              imageSizes="(min-width: 640px) 50vw, 100vw"
            >
              {member.quote && (
                <blockquote className="mt-2 text-lg text-neutral-800">
                  <p>“{member.quote}”</p>
                </blockquote>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
