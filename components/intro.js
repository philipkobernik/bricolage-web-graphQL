import { CMS_NAME, CMS_URL } from '../lib/constants'
import BricolageLogo from '../components/bricolage-logo'
import BricolageNodeNavi from '../components/bricolage-nodeNavi'


export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <BricolageLogo />
        <BricolageNodeNavi />
      </h1>
      { false && (
        <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
          search / disrupt / play / construct
        </h4>
      )}
    </section>

  )
        // <div class="grid grid-rows-1 grid-flow-col gap-4">
        // <div class="grid grid-flow-row grid-cols-2 gap-4">
        //   <div class="row-span-1 col-span-1 ..."></div>
        //   <BricolageLogo />
        //   <div class="row-span-1 col-span-1 ..."></div>
        //   <BricolageNodeNavi />
        // </div>

        //<div className="mb-8 md:mb-16">


  
}
