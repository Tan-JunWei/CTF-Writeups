import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { colorForTag } from "../util/tagColor"

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  const baseDir = pathToRoot(fileData.slug!)
  if (!tags || tags.length === 0) return null
  if (fileData.frontmatter?.showTags === false) return null

  return (
    <ul class={classNames(displayClass, "tags")}>
      {tags.map((tag) => {
        const linkDest = baseDir + `/tags/${slugTag(tag)}`
        const { text, bg } = colorForTag(tag)
        // expose colors as CSS variables (global to the element), not inline 'color'
        const style = {
          // TSX: allow custom properties
          ["--tag-color" as any]: text,
          ["--tag-bg" as any]: bg,
        }
        return (
          <li>
            <a href={linkDest} class="internal tag-link" style={style}>
              {tag}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-self: end;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}

.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  --tag-color: hsl(190 60% 35% / 1);     /* safe default */
  --tag-bg:    hsl(190 60% 35% / 0.12);  /* safe default */

  color: var(--tag-color);
  border: 1px solid var(--tag-color);
  background-color: var(--tag-bg);

  border-radius: 8px;
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
