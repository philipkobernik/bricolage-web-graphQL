import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function ArtistProjectPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  authorSlug,
  slug,
}) {
  return (
    <div class="grid grid-cols-1 md:grid-cols-4">
      <div className="md:col-start-1 md:col-end-2 mr-6">
        <CoverImage
          slug={slug}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
        <div class="md:col-start-2 md:col-end-5 flex-wrap shadow-xl px-4">
        <h3 className="w-full text-3xl mb-4 leading-snug">
          <Link as={`/projects/${slug}`} href="/projects/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <p className="w-full text-lg leading-relaxed mb-1">{excerpt}</p>
        <div className="w-full text-md text-purple">
          <Date dateString={date} />
        </div>
      </div>
    </div>
  )
}
