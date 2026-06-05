import { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore
import script from "./scripts/backToTop.inline"

const BackToTop: QuartzComponent = () => {
  return (
    <button id="back-to-top" aria-label="Back to top">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  )
}

BackToTop.afterDOMLoaded = script

export default (() => BackToTop) satisfies QuartzComponentConstructor
