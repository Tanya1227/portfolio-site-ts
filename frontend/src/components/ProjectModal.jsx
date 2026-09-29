import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getProjectCover, getProjectIcon } from '@/lib/projectVisuals';
import { EASE_OUT } from '@/lib/motion';


export function ProjectModal({ project, coverIndex = 0, open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  const Icon = getProjectIcon(project?.tag);

  return createPortal(
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          data-lenis-prevent
        >
          <button
            type="button"
            aria-label="Close case study"
            className="absolute inset-0 bg-ink-900/40"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.18, ease: EASE_OUT } }}
            className="glass-modal rounded-card scrollbar-hidden relative max-h-[85vh] w-full max-w-2xl overflow-y-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="focus-neon absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-0/80 text-ink-700 hover:text-ink-900"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div
              className="relative flex h-52 items-center justify-center rounded-t-card bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: getProjectCover(project, coverIndex) }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              <Icon className="relative z-10 h-14 w-14 text-white drop-shadow-lg" aria-hidden="true" strokeWidth={1.5} />
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-500">{project?.tag}</p>
              <h3 id="project-modal-title" className="mt-2 font-display text-2xl font-bold text-ink-900">
                {project?.name}
              </h3>
              <p className="mt-1 text-sm text-ink-500">{project?.subtitle}</p>

              {project?.case_study?.problem ? (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Problem</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{project.case_study.problem}</p>
                </div>
              ) : null}

              {project?.case_study?.role ? (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Role</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{project.case_study.role}</p>
                </div>
              ) : null}

              {project?.case_study?.architecture?.length ? (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Architecture</p>
                  <div className="mt-3 flex flex-col gap-3">
                    {project.case_study.architecture.map((block) => (
                      <div key={block.title} className="rounded-2xl bg-surface-100 p-4">
                        <p className="text-sm font-semibold text-ink-900">{block.title}</p>
                        <p className="mt-1 text-sm text-ink-700">{block.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {project?.stack?.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="glass-chip rounded-pill px-3 py-1 font-mono text-xs text-ink-700">
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default ProjectModal;
