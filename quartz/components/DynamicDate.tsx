import { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore
import script from "./scripts/dynamicDate.inline"

const DynamicDate: QuartzComponent = () => null

DynamicDate.afterDOMLoaded = script

export default (() => DynamicDate) satisfies QuartzComponentConstructor
