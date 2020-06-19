import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'

const defaultImageUrl = '/images/bricolage_home_page.jpg';
const defaultTitle = "bricolage";
const defaultDescription = "a digital gallery and archive of works created by members of the Media Arts and Techology graduate program @ UC Santa Barbara";
const defaultPageUrl = "https://bricolage.mat.ucsb.edu";

export default function Layout({
  preview,
  ogImageUrl=defaultImageUrl,
  ogTitle=defaultTitle,
  ogDescription=defaultDescription,
  ogPageUrl=defaultPageUrl,
  children }) {

  return (
    <>
      <Meta
        ogImageUrl={ogImageUrl}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
        ogPageUrl={ogPageUrl}
      />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      {false && <Footer />}
    </>
  )
}
