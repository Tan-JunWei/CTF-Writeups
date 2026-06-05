import { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore
import script from "./scripts/codeLanguageLabel.inline"

const CodeLanguageLabel: QuartzComponent = () => null

CodeLanguageLabel.afterDOMLoaded = script

export default (() => CodeLanguageLabel) satisfies QuartzComponentConstructor
