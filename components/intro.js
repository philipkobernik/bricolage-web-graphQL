import { CMS_NAME, CMS_URL } from '../lib/constants'
import BricolageLogo from '../components/bricolage-logo'


export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <BricolageLogo />
      </h1>
      { false && (
        <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
          search / disrupt / play / construct
        </h4>
      )}
    </section>
  )
}
