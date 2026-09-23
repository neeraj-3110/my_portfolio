import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { AnimatePresence, motion } from 'motion/react'
import { CircleAlert, CircleCheck, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import Section from './ui/Section.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { LinkButton } from './ui/Button.jsx'
import { GithubIcon, LinkedinIcon } from './ui/Icons.jsx'
import SceneBoundary from './3d/SceneBoundary.jsx'
import { site } from '../data/site.js'
import { useCursorGlow } from '../hooks/useCursorGlow.js'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).'
  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.'
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.'
  return e
}

const field =
  'w-full rounded-2xl border bg-white/4 px-4 py-3.5 text-base text-fg placeholder:text-muted/60 outline-none transition-colors focus:border-cyan/60 focus:bg-white/6 focus-visible:outline-none'

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg/90">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#ff8f9f]">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const formGlowRef = useCursorGlow()
  const detailsGlowRef = useCursorGlow()

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (errors[e.target.name]) setErrors(validate(next))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    if (form.botcheck?.checked) return // honeypot: bots tick the hidden box

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      form.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error')
      setErrorMsg('The contact form is temporarily unavailable. Please try again later.')
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setStatus('success')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
      setErrorMsg(`Your message couldn't be sent. Please try again or email ${site.email} directly.`)
    }
  }

  return (
    <Section id="contact" tone="contact" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        title="Get in touch."
        subtitle="Have an opportunity, project, or just want to connect? Send me a message."
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.form
          ref={formGlowRef}
          onSubmit={onSubmit}
          noValidate
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-6%' }}
          transition={{ duration: 0.7 }}
          className="glass cursor-glow-card space-y-5 rounded-3xl p-6 sm:p-9"
          aria-label="Contact form"
        >
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <Field id="name" label="Your Name" error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your Name"
              value={values.name}
              onChange={onChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`${field} ${errors.name ? 'border-[#ff8f9f]/70' : 'border-line'}`}
            />
          </Field>
          <Field id="email" label="Your Email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Your Email"
              value={values.email}
              onChange={onChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`${field} ${errors.email ? 'border-[#ff8f9f]/70' : 'border-line'}`}
            />
          </Field>
          <Field id="message" label="Your Message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your Message"
              value={values.message}
              onChange={onChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`${field} resize-y ${errors.message ? 'border-[#ff8f9f]/70' : 'border-line'}`}
            />
          </Field>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-violet px-6 py-3 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(99,102,241,0.7)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
          >
            {status === 'sending' ? (
              <>
                <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </>
            )}
          </button>

          <div aria-live="polite" role="status" className="min-h-6">
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 text-sm text-cyan">
                  <CircleCheck size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  Thanks! Your message has been sent successfully.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 text-sm text-[#ff8f9f]">
                  <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>

        <div className="flex flex-col gap-6">
          <div className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-[70px]" />
            <SceneBoundary scene="contact" className="relative h-[260px] w-full sm:h-[320px]" />
          </div>

          <dl ref={detailsGlowRef} className="glass cursor-glow-card space-y-5 rounded-3xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Mail size={18} className="mt-1 text-blue" aria-hidden="true" />
              <div>
                <dt className="text-sm text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="break-all text-fg underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={18} className="mt-1 text-blue" aria-hidden="true" />
              <div>
                <dt className="text-sm text-muted">Location</dt>
                <dd>{site.location}</dd>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-line pt-5">
              <LinkButton href={site.social.linkedin} icon={LinkedinIcon}>LinkedIn</LinkButton>
              <LinkButton href={site.social.github} icon={GithubIcon}>GitHub</LinkButton>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  )
}
