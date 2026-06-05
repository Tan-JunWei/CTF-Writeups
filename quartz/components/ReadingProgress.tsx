import { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore
import script from "./scripts/readingProgress.inline"

const ReadingProgress: QuartzComponent = () => {
  return <div id="reading-progress-bar" aria-hidden="true"></div>
}

ReadingProgress.afterDOMLoaded = script

export default (() => ReadingProgress) satisfies QuartzComponentConstructor
