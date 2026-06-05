import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import style from "./styles/prevNextNav.scss"

const PrevNextNav: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const currentSlug = fileData.slug
  if (!currentSlug) return null

  const parts = currentSlug.split("/")
  if (parts.length < 2) return null

  const parentFolder = parts.slice(0, -1).join("/")
  const depth = parts.length

  const allSiblings = allFiles
    .filter((f) => {
      if (!f.slug) return false
      const fParts = f.slug.split("/")
      if (fParts.length !== depth) return false
      if (fParts.slice(0, -1).join("/") !== parentFolder) return false
      if (fParts[fParts.length - 1] === "index") return false
      return true
    })
    .sort((a, b) => {
      const aTitle = (a.frontmatter?.title as string | undefined) ?? a.slug ?? ""
      const bTitle = (b.frontmatter?.title as string | undefined) ?? b.slug ?? ""
      return aTitle.localeCompare(bTitle)
    })

  const currentIndex = allSiblings.findIndex((f) => f.slug === currentSlug)
  if (currentIndex === -1 || allSiblings.length <= 1) return null

  const prev = currentIndex > 0 ? allSiblings[currentIndex - 1] : null
  const next = currentIndex < allSiblings.length - 1 ? allSiblings[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <nav class="prev-next-nav">
      {prev ? (
        <a href={resolveRelative(currentSlug, prev.slug!)} class="prev-next-link prev-link">
          <span class="prev-next-direction">← Previous</span>
          <span class="prev-next-title">
            {(prev.frontmatter?.title as string | undefined) ?? simplifySlug(prev.slug!)}
          </span>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a href={resolveRelative(currentSlug, next.slug!)} class="prev-next-link next-link">
          <span class="prev-next-direction">Next →</span>
          <span class="prev-next-title">
            {(next.frontmatter?.title as string | undefined) ?? simplifySlug(next.slug!)}
          </span>
        </a>
      ) : (
        <div />
      )}
    </nav>
  )
}

PrevNextNav.css = style

export default (() => PrevNextNav) satisfies QuartzComponentConstructor
