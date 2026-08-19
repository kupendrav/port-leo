import { LuGithub } from 'react-icons/lu'
import { DOMAIN_ORDER, featuredProjects } from '../data/projects'
import { socialLinks } from '../data/site'
import { ProjectCard } from './ProjectCard'

export function Work() {
  return (
    <section id="work" className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>Projects from the GitHub constellation</h2>
          <p className="panel-intro">
            Updated from the public GitHub profile at github.com/kupendrav, with direct links to repositories and live demos where available.
          </p>
        </div>
        <a className="button subtle" href={`${socialLinks.github}?tab=repositories`} target="_blank" rel="noreferrer">
          <LuGithub aria-hidden />
          View GitHub
        </a>
      </div>

      {DOMAIN_ORDER.map((domain) => {
        const items = featuredProjects.filter((project) => project.domain === domain)
        if (items.length === 0) return null
        return (
          <div key={domain} className="domain-section">
            <h3 className="domain-heading">{domain}</h3>
            <div className="projects-grid">
              {items.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
