import { setImage } from "./set-image.inline";
const o = new MutationObserver(setImage)
o.observe(document.documentElement, { attributeFilter: ['saved-theme'] })
setImage();