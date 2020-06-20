import Link from 'next/link'

export default function TagsList({ tags }) {
  return tags.map(t => (
    <Link
      as={`/tags/${t.slug}`}
      href="/tags/[slug]"
      key={t.slug}
    >
      <a className="text-orange hover:underline">
        {t.name}
        <br/>
      </a>
    </Link>
  ))
}
