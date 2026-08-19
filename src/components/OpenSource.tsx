import { LuGithub } from 'react-icons/lu'
import { openSourceHighlights, socialLinks } from '../data/site'

export function OpenSource() {
  return (
    <section id="open-source" className="panel open-source-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Open source</p>
          <h2>Public contributions and learning in the open</h2>
          <p className="panel-intro">
            Kupendra&apos;s GitHub profile shows an active public portfolio of 39 repositories, open-source forks, security challenge repos, and project code spanning AI, full-stack, Web3, and data science.
          </p>
        </div>
        <a className="button subtle" href={socialLinks.github} target="_blank" rel="noreferrer">
          <LuGithub aria-hidden />
          Profile
        </a>
      </div>
      <div className="contribution-grid">
        {openSourceHighlights.map((item) => (
          <article key={item.title} className="contribution-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
