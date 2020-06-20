import { CMS_NAME, CMS_URL } from '../lib/constants'
import BricolageLogo from '../components/bricolage-logo'
import { Parallax } from 'react-scroll-parallax';
import BricolageNodeNavigator from '../components/bricolage-nodeNavigator'

export default function Intro({projects=[], showNodeNavi=false}) {
  return (
    <>
      <section className="flex-col md:flex-row flex items-end  mt-16 ">

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          <div className="flex">
            <BricolageLogo />
          </div>
        </h1>
      </section>
      <h4 className=" mx-left text-xl mt-6 mb-16">
          search | disrupt | play | construct
      </h4>

      <div className= "mb-8 md:mb-16 -mx-5 sm:mx-0 shadow-small hover:shadow-medium transition-shadow duration-200">
        { showNodeNavi && <BricolageNodeNavigator p = {projects} /> }
      </div>
    </>
  )
}
