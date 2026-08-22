import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/treeList.scss"
import { ChevronIcon, FileIcon, TagIcon } from "../treeIcons"
import { FullSlug, getAllSegmentPrefixes, resolveRelative, simplifySlug } from "../../util/path"
import { QuartzPluginData } from "../../plugins/vfile"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
import { Date, getDate } from "../Date"
import { byDateAndAlphabetical } from "../PageList"
import { GlobalConfiguration } from "../../cfg"
import { colorForTag } from "../../util/tagColor"

// CSS vars consumed by .tag-color in treeList.scss, same hash-derived hue
// used for tag pills elsewhere
function tagColorVars(tag: string) {
  const { hue, lightL, darkL } = colorForTag(tag)
  return {
    ["--tag-hue" as any]: hue,
    ["--tag-light-l" as any]: `${lightL}%`,
    ["--tag-dark-l" as any]: `${darkL}%`,
  }
}

interface TagContentOptions {
  /**
   * How many items to show in a tag's inline preview on the tag index page
   * before collapsing the rest behind a "N more" link to its full tag page
   */
  previewLimit: number
}

const defaultOptions: TagContentOptions = {
  previewLimit: 8,
}

type FileRowProps = {
  page: QuartzPluginData
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  nested?: boolean
}

// file icon + title, date muted and right-aligned, same treatment as a
// file row in the folder tree
function FileRow({ page, fileData, cfg, nested }: FileRowProps) {
  const date = getDate(cfg, page)
  return (
    <li>
      <a
        href={resolveRelative(fileData.slug!, page.slug!)}
        class={`internal tree-row${nested ? " tree-file" : ""}`}
      >
        <FileIcon />
        <span class="tree-name">{page.frontmatter?.title}</span>
        {date && (
          <span class="tree-meta">
            <Date date={date} locale={cfg.locale} />
          </span>
        )}
      </a>
    </li>
  )
}

export default ((opts?: Partial<TagContentOptions>) => {
  const options: TagContentOptions = { ...defaultOptions, ...opts }

  const TagContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props
    const slug = fileData.slug

    if (!(slug?.startsWith("tags/") || slug === "tags")) {
      throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`)
    }

    const tag = simplifySlug(slug.slice("tags/".length) as FullSlug)
    const sorter = byDateAndAlphabetical(cfg)
    const allPagesWithTag = (tag: string) =>
      allFiles
        .filter((file) =>
          (file.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(tag),
        )
        .sort(sorter)

    const content =
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = ["popover-hint", ...cssClasses].join(" ")

    if (tag === "/") {
      // tag index: every tag collapsed to one row (icon + name + count).
      // expanding one previews its recent items instead of dumping
      // everything under every tag onto the page at once
      const tags = [
        ...new Set(
          allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes),
        ),
      ].sort((a, b) => a.localeCompare(b))

      return (
        <div class={classes}>
          <article>
            <p>{content}</p>
          </article>
          <p>{i18n(cfg.locale).pages.tagContent.totalTags({ count: tags.length })}</p>
          <div class="tree-page">
            <ul class="tree-root">
              {tags.map((tag) => {
                const pages = allPagesWithTag(tag)
                const shown = pages.slice(0, options.previewLimit)
                const remaining = pages.length - shown.length
                const tagHref = resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)

                return (
                  <li key={tag}>
                    <details>
                      <summary class="tree-row tree-branch">
                        <ChevronIcon />
                        <a
                          href={tagHref}
                          class="internal tree-link tag-color"
                          style={tagColorVars(tag)}
                        >
                          <TagIcon />
                          <span class="tree-name">{tag}</span>
                        </a>
                        <span class="tree-meta">{pages.length}</span>
                      </summary>
                      <ul>
                        {shown.map((page) => (
                          <FileRow
                            key={page.slug}
                            page={page}
                            fileData={fileData}
                            cfg={cfg}
                            nested
                          />
                        ))}
                        {remaining > 0 && (
                          <li>
                            <a href={tagHref} class="internal tree-row tree-file tree-more">
                              <span class="tree-name">+{remaining} more</span>
                            </a>
                          </li>
                        )}
                      </ul>
                    </details>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    } else {
      const pages = allPagesWithTag(tag)

      return (
        <div class={classes}>
          <article>{content}</article>
          <p class="tree-tag-summary">
            <span class="tag-color" style={tagColorVars(tag)}>
              <TagIcon />
            </span>
            {i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length })}
          </p>
          <div class="tree-page">
            <ul class="tree-root">
              {pages.map((page) => (
                <FileRow key={page.slug} page={page} fileData={fileData} cfg={cfg} />
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }

  TagContent.css = style
  return TagContent
}) satisfies QuartzComponentConstructor
