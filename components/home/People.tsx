import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { team, type TeamMember } from "@/data/team";

function displayName(member: TeamMember) {
  return member.degree ? `${member.name}, ${member.degree}` : member.name;
}

export function People() {
  const featured = team.filter((member: TeamMember) => member.quote);
  const members = team.filter((member: TeamMember) => !member.quote);

  return (
    <Section
      id="people"
      title="People"
      intro="We are a multidisciplinary team that brings together strategic vision, scientific expertise and practical technology development."
    >
      {featured.map((member: TeamMember) => (
        <figure key={member.slug} className="grid gap-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10">
          {member.image && (
            <Image
              src={member.image.src}
              alt={member.image.alt}
              sizes="(min-width: 640px) 35vw, 100vw"
              placeholder="blur"
              className="aspect-[4/5] w-full rounded-sm object-cover object-top"
            />
          )}
          <div className="flex flex-col justify-end gap-6">
            <blockquote className="text-2xl leading-snug font-medium text-balance sm:text-3xl">
              <p>“{member.quote}”</p>
            </blockquote>
            <figcaption>
              <span className="block text-xl font-semibold tracking-tight font-stretch-condensed">{displayName(member)}</span>
              <span className="text-neutral-400">{member.role}</span>
            </figcaption>
          </div>
        </figure>
      ))}

      <ul className="mt-16 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member: TeamMember) => (
          <li key={member.slug}>
            <Card title={displayName(member)} subtitle={member.role} image={member.image} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
