import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function ProjectPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  authorSlug,
  tags,
  slug,
}) {
  return (
    <div className="grid grid-cols-3">
      <div className="col-start-1 col-end-2 pr-8">
        <CoverImage
          slug={slug}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>

      <div className="col-start-2 col-end-4">
        <h3 className="w-full text-3xl mb-4 leading-snug">
          <Link as={`/projects/${slug}`} href="/projects/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>

        <p className="w-full text-lg leading-relaxed mb-1">{excerpt}</p>

        <div className="mb-6 text-lg">
        {
          tags.map(t => (
            <Link as={`/tags/${t.slug}`} href="/tags/[slug]" key={t.slug}>
              <a className="text-orange hover:underline">{t.name} </a>
            </Link>
          ))
        }
        </div>

        <Avatar name={author.name} picture={author.picture} slug={authorSlug}/>
        <div className="w-full text-lg my-4">
          <Date dateString={date} />
        </div>
      </div>
    </div>
  )
}
