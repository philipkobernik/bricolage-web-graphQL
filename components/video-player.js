import ReactPlayer from 'react-player'

export default function VideoPlayer({ videoLink }) {

  return (
    <div className="videodiv bg-black grid grid-cols-1 md:grid-cols-4 row-gap-20 md:row-gap-32 mb-32 shadow-small hover:shadow-medium transition-shadow duration-200">
      <ReactPlayer className= 'react-player md:col-start-1 md:col-end-5' width="100%" height="100%" url={videoLink} />
    </div>
  )

}
