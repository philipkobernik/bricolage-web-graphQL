import { Image } from 'react-datocms'
import { Parallax } from 'react-scroll-parallax';


export default function ImageGallery({ images }) {
  let index = 0;

  function addRandomPos(){
    let classN = 'shadow-small hover:shadow-medium transition-shadow duration-200';
    if (index % 2 == 0){
      classN += ' md:col-start-'+1;
      classN += ' md:col-end-'+ 4;
    } else {
      classN += ' md:col-start-'+2;
      classN += ' md:col-end-'+ 5;
    }
    index++;
    return classN;
  }

  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">

      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {images.map(image => (
          <Image
            data={image.responsiveImage}
            className={addRandomPos()}
          />
        ))}
      </div>
    </section>
  )
}
