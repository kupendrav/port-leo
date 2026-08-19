import { galleryPhotos } from '../data/gallery'

export function Gallery() {
  return (
    <section id="gallery" className="panel gallery-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Gallery</p>
          <h2>Hackathons, expos, and field notes</h2>
          <p className="panel-intro">
            A greyscale-to-colour look at events, national-level expos, and community gatherings.
          </p>
        </div>
      </div>
      <div className="gallery-grid">
        {galleryPhotos.map((photo) => (
          <figure key={photo.src} className="gallery-card">
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
