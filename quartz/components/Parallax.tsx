// @ts-ignore: this is safe, we don't want to actually make darkmode.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import parallaxScript from "./scripts/parallax.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Parallax: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  return null;
}

Parallax.afterDOMLoaded = parallaxScript

export default (() => Parallax) satisfies QuartzComponentConstructor