import { LuArrowUpRight, LuGithub } from 'react-icons/lu'
import type { Project } from '../data/projects'
import { Magnetic3D } from './Magnetic3D'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Magnetic3D as="article" className="project-card" intensity={8} tilt={6}>
      <div className="project-card-shine" aria-hidden />
      <div className="project-top">
        <div>
          <p className="eyebrow">Featured build</p>
          <h3>{project.title}</h3>
        </div>
        <div className="project-links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label === 'GitHub' ? <LuGithub aria-hidden /> : <LuArrowUpRight aria-hidden />}
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="tag-row">
        {project.tech.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
    </Magnetic3D>
  )
}
