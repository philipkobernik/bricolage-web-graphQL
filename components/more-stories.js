import ProjectPreview from '../components/project-preview'

export default function MoreStories({ projects, header="Projects" }) {
  return (
    <section>
      <h2 className="font-mono text-yellow mb-8 text-6xl md:text-4xl font-bold tracking-tighter leading-tight">
        { header }
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {projects.map(project => (
          <ProjectPreview
            key={project.slug}
            title={project.title}
            coverImage={project.coverImage}
            date={project.date}
            author={project.author}
            authorSlug ={project.author.slug}
            tags={project.tags}
            slug={project.slug}
            excerpt={project.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
