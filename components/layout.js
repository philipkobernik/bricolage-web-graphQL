import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ preview, children }) {


  function handleScroll(e) {
    console.log(window.scrollY);
  }

  return (
    <>
      <Meta />
      <div className="min-h-screen" onScroll={handleScroll}>
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      {false && <Footer />}
    </>
  )
}
