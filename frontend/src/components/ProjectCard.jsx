import { motion } from 'framer-motion';
import { getProjectCover, getProjectIcon } from '@/lib/projectVisuals';
import { cn } from '@/lib/utils';
import { useCanHover } from '@/hooks/useCanHover';
import { reveal, REVEAL_STAGGER } from '@/lib/motion';


export function ProjectCard({ project, index, featured = false, onOpen }) {
  const Icon = getProjectIcon(project.tag);
  const canHover = useCanHover();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-testid={`project-card-${project.slug}`}
      {...reveal(index * REVEAL_STAGGER, { amount: 0.2 })}
      whileHover={canHover ? { y: -6 } : undefined}
      whileTap={{ scale: 0.985 }}
      className={cn(
        'group card-cursor-border focus-neon relative w-full overflow-hidden rounded-card text-left',
        featured ? 'aspect-video lg:col-span-2' : 'aspect-[4/5]'
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center scale-100 transition-transform duration-500 ease-signature group-hover:scale-110"
        style={{ backgroundImage: getProjectCover(project, index) }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 bg-wash-peach opacity-10 mix-blend-overlay" />

      <Icon className="absolute right-6 top-6 h-8 w-8 text-white/40" aria-hidden="true" strokeWidth={1.5} />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/70">{project.tag}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-white">{project.name}</h3>
        <p className="mt-1 text-sm text-white/70">{project.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-pill border border-white/30 px-2.5 py-1 font-mono text-[11px] text-white/80">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export default ProjectCard;
