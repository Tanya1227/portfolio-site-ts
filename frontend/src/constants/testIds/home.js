// Test IDs for the home / landing feature. Naming follows the directive
// in ./auth.js (keys camelCase, values kebab-case `<feature>-<element>`).
//
// Fixed, enumerable elements are listed below. Data-driven repeated
// elements (project cards, experience items, skill chips, about metrics)
// use the same `<feature>-<element>-<slug>` pattern but are built at
// render time from `slugify()` (src/lib/utils.js) against the real value
// from src/data/resume.js, rather than hardcoded here:
//   - `project-card-${slugify(project.slug)}`
//   - `experience-item-${slugify(project.slug)}`
//   - `skill-chip-${slugify(item)}`
//   - `about-metric-${slugify(label)}`
//   - `section-${section.id}` / `nav-link-${section.id}` (ids from constants/sections.js)

export const HOME = {
	emergentLink: 'home-emergent-link',
};

export const NAV = {
	brandMark: 'nav-brand-mark',
	commandButton: 'nav-command-button',
	ctaButton: 'nav-cta-button',
	menuToggle: 'nav-menu-toggle',
};

export const HERO = {
	availabilityPill: 'hero-availability-pill',
	primaryCta: 'hero-primary-cta',
	secondaryCta: 'hero-secondary-cta',
	profileCard: 'hero-profile-card',
	scrollCta: 'hero-scroll-cta',
};

export const CONTACT = {
	nameInput: 'contact-form-name',
	emailInput: 'contact-form-email',
	subjectInput: 'contact-form-subject',
	messageInput: 'contact-form-message',
	submitButton: 'contact-form-submit',
};

export const COMMAND_PALETTE = {
	dialog: 'command-palette-dialog',
	input: 'command-palette-input',
};
