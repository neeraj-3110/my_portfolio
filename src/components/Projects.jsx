import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Section from './ui/Section.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <Section id="projects" tone="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        title="Selected Projects"
        subtitle="Open any project for the problem, the solution, and the full feature list."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
        ))}
      </div>
      <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
    </Section>
  )
}
