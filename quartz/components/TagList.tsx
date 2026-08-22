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
        const { hue, lightL, darkL } = colorForTag(tag)
        // expose hue + per-theme lightness as CSS variables, not inline 'color'
        const style = {
          // TSX: allow custom properties
          ["--tag-hue" as any]: hue,
          ["--tag-light-l" as any]: `${lightL}%`,
          ["--tag-dark-l" as any]: `${darkL}%`,
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
  --tag-hue: 190;      /* safe default */
  --tag-light-l: 28%;  /* safe default, light mode */
  --tag-dark-l: 70%;   /* safe default, dark mode */
  --tag-l: var(--tag-light-l);

  --tag-color: hsl(var(--tag-hue) 62% var(--tag-l) / 1);
  --tag-bg: hsl(var(--tag-hue) 62% var(--tag-l) / 0.14);

  color: var(--tag-color);
  border: 1px solid var(--tag-color);
  background-color: var(--tag-bg);

  border-radius: 8px;
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}

:root[saved-theme="dark"] a.internal.tag-link {
  --tag-l: var(--tag-dark-l);
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
