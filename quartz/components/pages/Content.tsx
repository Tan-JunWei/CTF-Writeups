import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import Home from "./Home"
import WriteupExplorer from "./WriteupExplorer"

const HomeComponent = Home()
const ExploreComponent = WriteupExplorer()
const PicoCTFExplorerComponent = WriteupExplorer({ lockedPlatform: "PicoCTF" })
const ChallengeCreationExplorerComponent = WriteupExplorer({ lockedPlatform: "Challenge Creation" })

const overrides: Record<string, QuartzComponent> = {
  index: HomeComponent,
  Explore: ExploreComponent,
  "PicoCTF/PicoCTF-Writeups": PicoCTFExplorerComponent,
  "Challenge-Creation/CTF-Challenges-I've-Created": ChallengeCreationExplorerComponent,
}

const Content: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, tree } = props
  const Override = fileData.slug ? overrides[fileData.slug] : undefined
  if (Override) {
    return <Override {...props} />
  }

  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return <article class={classString}>{content}</article>
}

// each script gets its own IIFE so concatenation with other components' scripts can't break mid-statement
function wrapScript(script?: string): string {
  return script ? `;(function(){${script}})();` : ""
}

Content.css = [HomeComponent.css, ExploreComponent.css].filter(Boolean).join("\n")
Content.afterDOMLoaded = [HomeComponent.afterDOMLoaded, ExploreComponent.afterDOMLoaded]
  .map(wrapScript)
  .join("\n")

export default (() => Content) satisfies QuartzComponentConstructor
