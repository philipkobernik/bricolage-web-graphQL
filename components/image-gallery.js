import { Image } from 'react-datocms'


export default function ImageGallery({ images }) {

  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        👀
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {images.map(image => (
          <Image
            data={image.responsiveImage}
            className={'shadow-small hover:shadow-medium transition-shadow duration-200'}
          />
        ))}
      </div>
    </section>
  )
}
