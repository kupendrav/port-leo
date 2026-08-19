import { LuMail, LuMapPin } from 'react-icons/lu'
import { contactEmail, socialLinks } from '../data/site'

export function Contact() {
  return (
    <section id="contact" className="panel contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s build AI at scale</h2>
        <p className="lede">
          Building an AI-first platform and want to bounce ideas around system architecture or product growth? Let's connect.
        </p>
        <div className="contact-actions">
          <a className="button primary" href={`mailto:${contactEmail}`}>
            <LuMail aria-hidden />
            {contactEmail}
          </a>
          <div className="social-icons">
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="icon-link" title="GitHub">
              <img src="https://img.icons8.com/ios-filled/50/FFFFFF/github.png" alt="" aria-hidden />
              <span className="sr-only">GitHub</span>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="icon-link" title="LinkedIn">
              <img src="https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png" alt="" aria-hidden />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
          <span className="location">
            <LuMapPin aria-hidden /> Planet Earth, Milky Way
          </span>
        </div>
      </div>
    </section>
  )
}
