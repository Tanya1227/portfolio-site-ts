import { ArrowUp } from 'lucide-react';
import { RESUME } from '@/data/resume';
import { scrollToSection } from '@/hooks/useLenis';

export function Footer() {
  const { profile } = RESUME;
  const year = new Date().getFullYear();

  const goToTop = (event) => {
    event.preventDefault();
    scrollToSection('hero');
  };

  return (
    <footer className="relative py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="glass-chip rounded-pill flex items-center gap-3 px-4 py-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 font-mono text-[11px] font-semibold text-surface-0">
            {profile.initials}
          </span>
          <p className="font-mono text-xs text-ink-500">
            © {year} {profile.name}
          </p>
        </div>

        <div className="glass-chip rounded-pill flex items-center gap-4 px-4 py-2.5 font-mono text-xs text-ink-700">
          <a href={`mailto:${profile.email}`} className="link-underline focus-neon">
            Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline focus-neon">
            LinkedIn
          </a>
          <a href="#hero" onClick={goToTop} className="link-underline focus-neon inline-flex items-center gap-1">
            Back to top
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
