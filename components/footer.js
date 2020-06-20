import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="border-t-8 border-yellow">
        <div className="py-10 grid grid-cols-3 md:grid-cols-5 items-center">
            <a
              href="https://www.mat.ucsb.edu/"
              className = "col-start-1 col-end-2"
            >
              <img src="/images/MATlogo.png" alt="MAT"/>
            </a>

            <a
              href="https://www.ucsb.edu/"
              className = "col-start-3 col-end-4 md:col-start-5 md:col-end-6"
            >
              <img src="/images/UCSB_Tab_Black_RGB.png" alt="UCSB"/>
            </a>
        </div>
    </footer>
  )
}
