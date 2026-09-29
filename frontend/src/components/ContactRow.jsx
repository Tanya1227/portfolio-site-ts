import { useMagnetic } from '@/hooks/useMagnetic';
import { RippleSurface } from '@/components/RippleSurface';
import { slugify, cn } from '@/lib/utils';

export function ContactRow({ icon: Icon, label, value, href, size = 'md', className, prefix = 'contact-row' }) {
  const { ref, style, handlers } = useMagnetic({ strength: 0.2, radius: 10 });
  const isExternal = href.startsWith('http');

  return (
    <RippleSurface
      as="a"
      ref={ref}
      href={href}
      style={style}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      data-testid={`${prefix}-${slugify(label)}`}
      className={cn(
        'focus-neon glass-press flex items-center gap-3 rounded-2xl transition-colors hover:bg-surface-100',
        size === 'lg' ? 'px-4 py-3' : 'px-3 py-2.5 text-sm',
        className
      )}
    >
      <span className={cn('icon-badge', size === 'lg' ? 'h-11 w-11' : 'h-9 w-9')}>
        <Icon className="h-4 w-4 text-ink-900" aria-hidden="true" />
      </span>
      <span className="flex flex-col text-left">
        <span className="text-xs text-ink-500">{label}</span>
        <span className={size === 'lg' ? 'text-base text-ink-900' : 'text-ink-900'}>{value}</span>
      </span>
    </RippleSurface>
  );
}

export default ContactRow;
