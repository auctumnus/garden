import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    return (
      <>
        <p>© Autumn {new Date().getFullYear()} 🅭🅯🄎</p>
        <a href="https://kmwc.org" style="text-decoration: underline">
          It is still possible to create beauty, on this earth, in our time.
        </a>
      </>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
