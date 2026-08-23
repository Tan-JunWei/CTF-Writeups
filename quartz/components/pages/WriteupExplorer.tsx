import { Root } from "hast"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { resolveRelative } from "../../util/path"
import { colorForTag } from "../../util/tagColor"
import { htmlToJsx } from "../../util/jsx"
import { buildWriteupEntries, computeFacets, WriteupEntry } from "../../util/writeups"
import style from "../styles/writeupExplorer.scss"
// @ts-ignore
import script from "../scripts/writeupExplorer.inline"

interface WriteupExplorerOptions {
  /** Restrict the dataset to a single top-level platform folder (e.g. "PicoCTF"). */
  lockedPlatform?: string
}

function TagIcon() {
  return (
    <svg
      class="wc-tag-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  )
}

function tagVars(tag: string) {
  const { hue, lightL, darkL } = colorForTag(tag)
  return {
    ["--tag-hue" as any]: hue,
    ["--tag-light-l" as any]: `${lightL}%`,
    ["--tag-dark-l" as any]: `${darkL}%`,
  }
}

const DIFFICULTY_RANK: Record<string, number> = {
  beginner: 1,
  easy: 2,
  medium: 3,
  hard: 4,
  insane: 5,
  expert: 6,
}

function Card({
  entry,
  fileData,
}: {
  entry: WriteupEntry
  fileData: QuartzComponentProps["fileData"]
}) {
  const rank = entry.difficulty ? DIFFICULTY_RANK[entry.difficulty] : undefined
  const shownTags = entry.tags.slice(0, 4)
  const moreTags = entry.tags.length - shownTags.length

  return (
    <a
      class="wc-card"
      href={resolveRelative(fileData.slug!, entry.slug)}
      data-title={entry.title.toLowerCase()}
      data-category={entry.category}
      data-difficulty={entry.difficulty ?? ""}
      data-diff-rank={rank ?? 0}
      data-platform={entry.platform}
      data-tags={entry.tags.join("|").toLowerCase()}
      data-date={entry.date ? entry.date.getTime() : 0}
      data-search={[entry.title, entry.category, ...entry.tags].join(" ").toLowerCase()}
    >
      <div class="wc-top">
        <span class="wc-category" style={tagVars(entry.categoryTag ?? entry.category)}>
          {entry.category}
        </span>
        {entry.difficulty && (
          <span class="wc-diff" data-diff={entry.difficulty}>
            <i class="wc-diff-dot" aria-hidden="true" />
            {entry.difficulty}
          </span>
        )}
      </div>
      <h3 class="wc-title">{entry.title}</h3>
      {entry.description && <p class="wc-desc">{entry.description}</p>}
      <div class="wc-bottom">
        <ul class="wc-tags">
          {shownTags.map((tag) => (
            <li key={tag}>
              <TagIcon />
              {tag}
            </li>
          ))}
          {moreTags > 0 && <li class="wc-more">+{moreTags}</li>}
        </ul>
        {entry.date && (
          <time class="wc-date" dateTime={entry.date.toISOString()}>
            {entry.date.toLocaleDateString("en-US", { year: "numeric", month: "short" })}
          </time>
        )}
      </div>
    </a>
  )
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name (A–Z)" },
  { value: "difficulty", label: "Difficulty" },
]

function SortDropdown() {
  return (
    <div class="wc-select" id="wc-sort">
      <button
        type="button"
        class="wc-select-trigger"
        id="wc-sort-trigger"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="wc-sort-listbox"
        aria-label="Sort writeups"
      >
        <span class="wc-select-value" id="wc-sort-value">
          {SORT_OPTIONS[0].label}
        </span>
        <svg
          class="wc-select-chevron"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul
        class="wc-select-menu"
        role="listbox"
        id="wc-sort-listbox"
        aria-labelledby="wc-sort-trigger"
        hidden
      >
        {SORT_OPTIONS.map((opt, i) => (
          <li
            key={opt.value}
            role="option"
            data-value={opt.value}
            aria-selected={i === 0}
            tabindex={i === 0 ? 0 : -1}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChipGroup({
  name,
  label,
  options,
}: {
  name: string
  label: string
  options: { value: string; display: string; count?: number }[]
}) {
  if (options.length <= 1) return null
  return (
    <div class="wc-facet" data-facet={name}>
      <span class="wc-facet-label">{label}</span>
      <div class="wc-chips" role="group" aria-label={label}>
        {options.map((opt) => (
          <button type="button" class="wc-chip" data-value={opt.value} aria-pressed="false">
            {opt.display}
            {opt.count !== undefined && <span class="wc-chip-count">{opt.count}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ((opts?: WriteupExplorerOptions) => {
  const WriteupExplorer: QuartzComponent = (props: QuartzComponentProps) => {
    const { allFiles, fileData, cfg, tree } = props
    const allEntries = buildWriteupEntries(cfg, allFiles)
    const entries = opts?.lockedPlatform
      ? allEntries.filter((e) => e.platform === opts.lockedPlatform)
      : allEntries
    const facets = computeFacets(entries)

    const sorted = [...entries].sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))

    const hasIntro = (tree as Root).children.length > 0
    const introJsx = hasIntro ? htmlToJsx(fileData.filePath!, tree) : null

    return (
      <div class="wc-root popover-hint">
        {introJsx && <article class="wc-intro">{introJsx}</article>}
        <div class="wc-controls">
          <div class="wc-search-row">
            <div class="wc-search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 19.9 19.7"
                aria-hidden="true"
                class="wc-search-icon"
              >
                <g fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
                  <circle cx="8" cy="8" r="7" />
                </g>
              </svg>
              <input
                type="search"
                id="wc-search-input"
                placeholder="Search writeups by name, category, or tag…"
                aria-label="Search writeups"
                autocomplete="off"
              />
            </div>
            <SortDropdown />
          </div>
          <div class="wc-facets">
            {!opts?.lockedPlatform && (
              <ChipGroup
                name="platform"
                label="Platform"
                options={facets.platforms.map((p) => ({
                  value: p,
                  display: entries.find((e) => e.platform === p)?.platformLabel ?? p,
                }))}
              />
            )}
            <ChipGroup
              name="category"
              label="Category"
              options={facets.categories.map((c) => ({ value: c, display: c }))}
            />
            <ChipGroup
              name="difficulty"
              label="Difficulty"
              options={facets.difficulties.map((d) => ({ value: d, display: d }))}
            />
            <ChipGroup
              name="tag"
              label="Tags"
              options={facets.tags.slice(0, 14).map((t) => ({
                value: t.tag.toLowerCase(),
                display: t.tag,
                count: t.count,
              }))}
            />
          </div>
          <div class="wc-status-row">
            <p class="wc-count" id="wc-count" aria-live="polite">
              Showing <strong id="wc-count-num">{entries.length}</strong> of {entries.length}{" "}
              writeups
            </p>
            <button type="button" id="wc-clear" class="wc-clear">
              Clear filters
            </button>
          </div>
        </div>

        <div class="wc-grid" id="wc-grid">
          {sorted.map((entry) => (
            <Card key={entry.slug} entry={entry} fileData={fileData} />
          ))}
        </div>
        <div class="wc-empty" id="wc-empty" hidden>
          <p>No writeups match your filters.</p>
          <button type="button" class="wc-clear" id="wc-empty-clear">
            Clear filters
          </button>
        </div>
      </div>
    )
  }

  WriteupExplorer.css = style
  WriteupExplorer.afterDOMLoaded = script
  return WriteupExplorer
}) satisfies QuartzComponentConstructor
