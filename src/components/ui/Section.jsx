// Every section shares this wrapper so vertical rhythm and gradient blending stay consistent.
const backgrounds = {
  hero: 'bg-gradient-to-b from-ink via-ink to-navy',
  about: 'bg-gradient-to-b from-navy via-[#070b1c] to-ink',
  plain: 'bg-ink',
  skills: 'bg-gradient-to-b from-ink via-[#0b0a22] to-ink',
  projects: 'bg-ink',
  contact: 'bg-gradient-to-b from-ink via-navy to-ink',
}

export default function Section({ id, tone = 'plain', className = '', pad = 'py-24 sm:py-32', children, labelledBy }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative overflow-x-clip ${backgrounds[tone]} ${className}`}>
      <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${pad}`}>{children}</div>
    </section>
  )
}
