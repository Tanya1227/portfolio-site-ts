import { useState } from 'react';
import { RESUME } from '@/data/resume';
import { SectionHeader } from '@/components/SectionHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal';

export function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpen = (project, index) => {
    setActiveProject(project);
    setActiveIndex(index);
  };

  return (
    <section id="projects" className="relative py-20 sm:py-28 lg:py-32" data-testid="section-projects">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="04 - Personal Projects"
          title="Featured Projects"
          description="Independent builds where I owned the architecture end-to-end."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {RESUME.projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              featured={RESUME.projects.length > 2 && index === 0}
              onOpen={() => handleOpen(project, index)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        open={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
        coverIndex={activeIndex}
      />
    </section>
  );
}

export default Projects;
