import { RESUME } from '@/data/resume';
import { SectionHeader } from '@/components/SectionHeader';
import { SkillChips } from '@/components/SkillChips';

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28 lg:py-32" data-testid="section-skills">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="02 - Toolkit"
          title="Technical Skills"
          description="Languages, frameworks, and tools I reach for when building production React and Node applications."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RESUME.skills.map((group, index) => (
            <SkillChips key={group.category} {...group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
