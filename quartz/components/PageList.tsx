import { FullSlug, resolveRelative, slugTag } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"
import { colorForTag } from "../util/tagColor"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

type Props = {
  limit?: number
  sort?: SortFn
} & QuartzComponentProps

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabetical(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <ul class="section-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []

        return (
          <li class="section-li">
            <div class="section">
              {page.dates && (
                <p class="meta">
                  <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                </p>
              )}
              <div class="desc">
                <h3>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {title}
                  </a>
                </h3>
              </div>
              <ul class="tags">
                {tags.map((tag) => {
                  const { hue, lightL, darkL } = colorForTag(tag)
                  const style = {
                    ["--tag-hue" as any]: hue,
                    ["--tag-light-l" as any]: `${lightL}%`,
                    ["--tag-dark-l" as any]: `${darkL}%`,
                  }
                  return (
                    <li>
                      <a
                        class="internal tag-link"
                        style={style}
                        href={resolveRelative(fileData.slug!, `tags/${slugTag(tag)}` as FullSlug)}
                      >
                        {tag}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  flex-wrap: wrap;
}

a.internal.tag-link {
  --tag-hue: 184;      /* fallback */
  --tag-light-l: 28%;  /* fallback, light mode */
  --tag-dark-l: 70%;   /* fallback, dark mode */
  --tag-l: var(--tag-light-l);

  --tag-color: hsl(var(--tag-hue) 62% var(--tag-l) / 1);
  --tag-bg: hsl(var(--tag-hue) 62% var(--tag-l) / 0.14);

  color: var(--tag-color);
  background-color: var(--tag-bg);
  border: 1px solid var(--tag-color);

  border-radius: 8px;
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
  white-space: nowrap;
}

:root[saved-theme="dark"] a.internal.tag-link {
  --tag-l: var(--tag-dark-l);
}

a.internal.tag-link:hover {
  text-decoration: none;
  filter: saturate(1.1);
}
`
