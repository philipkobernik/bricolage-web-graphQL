import { Image } from 'react-datocms'
import { Parallax } from 'react-scroll-parallax';

export default function ImageGallery({ images }) {
  let index = 0;

  function getPositionClasses(aspectRatio){
    let classN = 'shadow-small hover:shadow-medium transition-shadow duration-200';
    if (index % 2 == 0){
      // EVEN (LEFT)
      if(aspectRatio > 0.8) {
        // LANDSCAPE
        classN += ' md:col-start-1';
        classN += ' md:col-end-4';
      } else {
        // PORTRAIT
        classN += ' md:col-start-1';
        classN += ' md:col-end-3';
      }
    } else {
      // ODD (RIGHT)
      if(aspectRatio > 0.8) {
        // LANDSCAPE
        classN += ' md:col-start-2';
        classN += ' md:col-end-5';
      } else {
        // PORTRAIT
        classN += ' md:col-start-3';
        classN += ' md:col-end-5';
      }
    }
    index++;
    return classN;
  }

  return (
    <section>

      <div className="grid grid-cols-1 md:grid-cols-4 row-gap-20 md:row-gap-32 mb-32">
        {images.map((image, index) => (
          <Image
            data={image.responsiveImage}
            className={getPositionClasses(image?.responsiveImage?.aspectRatio)}
            key={index}
          />
        ))}
      </div>
    </section>
  )
}
