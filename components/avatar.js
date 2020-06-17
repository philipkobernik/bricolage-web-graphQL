import Link from 'next/link'

export default function Avatar({ name, picture, slug }) {
  console.log(slug);
  return (
    <div className="flex items-center">
      <img
        src={picture.url}
        className="w-12 h-12 squared-full mr-4"
        alt={name}
      />
      <div className="text-xl font-bold hover:underline"><Link as={`/authors/${slug}`} href="/authors/[slug]"><a>{name}</a></Link></div>
    </div>
  )
}
