import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Award, Briefcase, Copy, ExternalLink, GraduationCap, Layers, Mail, Phone, Sparkles, User } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { SECTIONS } from '@/constants/sections';
import { RESUME } from '@/data/resume';
import { scrollToSection } from '@/hooks/useLenis';
import { COMMAND_PALETTE } from '@/constants/testIds/home';

const SECTION_ICONS = {
  about: User,
  skills: Layers,
  experience: Briefcase,
  projects: Sparkles,
  certifications: Award,
  education: GraduationCap,
  contact: Mail,
};

const SECTION_KEYWORDS = {
  about: 'summary bio overview',
  skills: 'toolkit tech stack technologies',
  experience: 'work career jobs roles',
  projects: 'work portfolio case studies',
  certifications: 'awards achievements leadership',
  education: 'school degree university',
  contact: 'email message reach out',
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isSlash = event.key === '/';
      const isCmdK = event.key === 'k' && (event.metaKey || event.ctrlKey);
      if (!isSlash && !isCmdK) return;

      const tag = document.activeElement?.tagName;
      if (isSlash && (tag === 'INPUT' || tag === 'TEXTAREA')) return;

      event.preventDefault();
      setOpen((value) => !value);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const runCommand = useCallback((action) => {
    setOpen(false);
    action();
  }, []);

  const copy = (value, label) => {
    navigator.clipboard?.writeText(value);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-testid={COMMAND_PALETTE.dialog}
        data-lenis-prevent
        // Opened from the keyboard (Cmd+K or "/"), so it should feel instant: fade only, no zoom/slide.
        className="glass-modal rounded-card overflow-hidden border-none p-0 shadow-soft duration-100 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-top-[50%] data-[state=closed]:slide-out-to-top-[50%] sm:max-w-lg"
      >
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <Command className="bg-transparent">
          <CommandInput data-testid={COMMAND_PALETTE.input} placeholder="Jump to a section or run a command..." />
          <CommandList className="scrollbar-hidden">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Sections">
              {SECTIONS.map((section) => {
                const Icon = SECTION_ICONS[section.id] || Sparkles;
                return (
                  <CommandItem
                    key={section.id}
                    value={`${section.label} ${SECTION_KEYWORDS[section.id] || ''}`}
                    onSelect={() => runCommand(() => scrollToSection(section.id))}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{section.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem value="copy email address" onSelect={() => runCommand(() => copy(RESUME.profile.email, 'Email'))}>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Copy email address</span>
              </CommandItem>
              <CommandItem value="copy phone number" onSelect={() => runCommand(() => copy(RESUME.profile.phone, 'Phone number'))}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Copy phone number</span>
              </CommandItem>
              <CommandItem
                value="open linkedin profile"
                onSelect={() => runCommand(() => window.open(RESUME.profile.linkedin, '_blank', 'noreferrer'))}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>Open LinkedIn profile</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export default CommandPalette;
