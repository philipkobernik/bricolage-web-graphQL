import { CMS_NAME, CMS_URL } from '../lib/constants'
import BricolageLogo from '../components/bricolage-logo'
import { Parallax } from 'react-scroll-parallax';
import BricolageNodeNavigator from '../components/bricolage-nodeNavigator'

export default function Intro({projects, showNodeNavi=false}) {
  //console.log("intro", projects);
  return (
    <>
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">

      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <div className="flex">
          <BricolageLogo />
        </div>
      </h1>

      { false && (
        <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
          search / disrupt / play / construct
        </h4>
      )}
    </section>

    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
    <div className= "mb-8 md:mb-16 -mx-5 sm:mx-0 shadow-small hover:shadow-medium transition-shadow duration-200">
    { showNodeNavi && <BricolageNodeNavigator p = {projects} /> }
    </div>
    </section>
    </>

  )
}
