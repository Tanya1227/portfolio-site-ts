import { motion } from 'framer-motion';
import { useTilt } from '@/hooks/useTilt';
import { RESUME } from '@/data/resume';
import { HERO } from '@/constants/testIds/home';
import memojiTransparent from '@/assets/memoji-avatar-transparent.webp';

export function ProfileCard() {
  const { ref, style, handlers } = useTilt({ max: 8 });
  const { profile } = RESUME;
  const avatarSrc = profile.avatar || memojiTransparent;

  return (
    <motion.div
      ref={ref}
      {...handlers}
      style={{ ...style, transformStyle: 'preserve-3d' }}
      data-testid={HERO.profileCard}
      className="surface-card rounded-card relative mx-auto flex aspect-[4/5] w-[280px] flex-col items-center justify-center p-6 text-center sm:w-[340px] lg:w-[360px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.45),transparent_70%)] blur-3xl"
      />
      <div className="relative group flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-2 rounded-full bg-purple-500/20 blur-xl group-hover:bg-purple-500/35 transition duration-500"
        />
        <div className="relative flex h-44 w-44 sm:h-52 sm:w-52 lg:h-56 lg:w-56 items-center justify-center">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={`${profile.name} Memoji Avatar`}
              className="h-full w-full object-contain filter drop-shadow-[0_12px_28px_rgba(168,85,247,0.35)] transition-transform duration-500 ease-signature group-hover:scale-105"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-ink-900 font-display text-2xl font-bold tracking-tight text-surface-0">
              {profile.initials}
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 font-display text-xl font-bold text-ink-900 sm:text-2xl">{profile.name}</p>
      <p className="mt-1 font-mono text-sm text-ink-500 sm:text-base">{profile.title}</p>
      <p className="mt-1 text-xs text-ink-500 sm:text-sm">{profile.subtitle}</p>
    </motion.div>
  );
}

export default ProfileCard;
