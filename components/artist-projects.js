import ArtistProjectPreview from '../components/artist-project-preview'

export default function ArtistProjects({ projects }) {
  return (
    <section>
      <h2 className="font-mono mb-8 text-6xl md:text-4xl font-bold tracking-tighter leading-tight">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {projects.map(project => (
          <ArtistProjectPreview
            key={project.slug}
            title={project.title}
            coverImage={project.coverImage}
            date={project.date}
            author={project.author}
            authorSlug ={project.author.slug}
            slug={project.slug}
            excerpt={project.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
