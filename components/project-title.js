import { Parallax } from 'react-scroll-parallax';

export default function ProjectTitle({ children }) {

  return (
    <Parallax className="z-0" x={[0, 0]}>
    <h1 className="z-0 sans text-blue text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
    </Parallax>
  )
}
