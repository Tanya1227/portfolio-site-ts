import { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, MapPin, Phone } from 'lucide-react';
import { RESUME } from '@/data/resume';
import { SectionHeader } from '@/components/SectionHeader';
import { ContactRow } from '@/components/ContactRow';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MagneticButton } from '@/components/MagneticButton';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { CONTACT } from '@/constants/testIds/home';
import { reveal } from '@/lib/motion';

const SHAKE = { x: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.4 } };
const FIELD_CLASS = 'glass-field mt-2 rounded-2xl border-none px-4 text-sm shadow-none focus-visible:ring-0';

export function Contact() {
  const { profile } = RESUME;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const nameControls = useAnimationControls();
  const emailControls = useAnimationControls();
  const messageControls = useAnimationControls();
  const controlsByField = { name: nameControls, email: emailControls, message: messageControls };

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Name is required';
    if (!values.email.trim()) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email';
    if (!values.message.trim()) nextErrors.message = 'Message is required';
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      Object.keys(nextErrors).forEach((field) => {
        if (!prefersReducedMotion && controlsByField[field]) {
          controlsByField[field].start(SHAKE);
        }
      });
      toast.error('Please fix the highlighted fields');
      return;
    }

    const subject = encodeURIComponent(values.subject || `Portfolio inquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    toast.success('Message ready — check your email client');
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32" data-testid="section-contact">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="07 - Contact"
          title="Get In Touch"
          description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-5">
            <ContactRow
              prefix="contact-action"
              size="lg"
              icon={Mail}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactRow
              prefix="contact-action"
              size="lg"
              icon={Phone}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
            />
            <ContactRow prefix="contact-action" size="lg" icon={MapPin} label="Location" value={profile.location} href="#contact" />
          </div>

          <motion.form
            noValidate
            onSubmit={handleSubmit}
            {...reveal(0, { amount: 0.2 })}
            className="surface-card rounded-card flex flex-col gap-5 p-6 sm:p-8 lg:col-span-7"
          >
            <motion.div animate={nameControls}>
              <Label htmlFor="contact-name" className="text-xs uppercase tracking-[0.16em] text-ink-500">
                Name <span className="text-red-500" aria-hidden="true">*</span>
              </Label>
              <Input
                id="contact-name"
                required
                aria-required="true"
                data-testid={CONTACT.nameInput}
                value={values.name}
                onChange={handleChange('name')}
                aria-invalid={Boolean(errors.name)}
                className={`${FIELD_CLASS} h-11`}
              />
              {errors.name ? (
                <p role="alert" className="mt-1.5 text-xs text-red-500">
                  {errors.name}
                </p>
              ) : null}
            </motion.div>

            <motion.div animate={emailControls}>
              <Label htmlFor="contact-email" className="text-xs uppercase tracking-[0.16em] text-ink-500">
                Email <span className="text-red-500" aria-hidden="true">*</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                required
                aria-required="true"
                data-testid={CONTACT.emailInput}
                value={values.email}
                onChange={handleChange('email')}
                aria-invalid={Boolean(errors.email)}
                className={`${FIELD_CLASS} h-11`}
              />
              {errors.email ? (
                <p role="alert" className="mt-1.5 text-xs text-red-500">
                  {errors.email}
                </p>
              ) : null}
            </motion.div>

            <div>
              <Label htmlFor="contact-subject" className="text-xs uppercase tracking-[0.16em] text-ink-500">
                Subject <span className="normal-case text-ink-500">(optional)</span>
              </Label>
              <Input
                id="contact-subject"
                data-testid={CONTACT.subjectInput}
                value={values.subject}
                onChange={handleChange('subject')}
                className={`${FIELD_CLASS} h-11`}
              />
            </div>

            <motion.div animate={messageControls}>
              <Label htmlFor="contact-message" className="text-xs uppercase tracking-[0.16em] text-ink-500">
                Message <span className="text-red-500" aria-hidden="true">*</span>
              </Label>
              <Textarea
                id="contact-message"
                rows={5}
                required
                aria-required="true"
                data-testid={CONTACT.messageInput}
                value={values.message}
                onChange={handleChange('message')}
                aria-invalid={Boolean(errors.message)}
                className={`${FIELD_CLASS} py-3`}
              />
              {errors.message ? (
                <p role="alert" className="mt-1.5 text-xs text-red-500">
                  {errors.message}
                </p>
              ) : null}
            </motion.div>

            <MagneticButton
              as="button"
              type="submit"
              data-testid={CONTACT.submitButton}
              className="glass-button-dark cta-shimmer focus-neon self-start rounded-pill px-6 py-3 text-sm font-medium text-white"
            >
              Send Message
            </MagneticButton>

            {submitted ? (
              <p className="text-sm text-emerald-600">Your email client should now be open with the message ready to send.</p>
            ) : null}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
