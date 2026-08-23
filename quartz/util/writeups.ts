import { GlobalConfiguration } from "../cfg"
import { getDate } from "../components/Date"
import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug } from "./path"

const DIFFICULTY_ORDER = ["beginner", "easy", "medium", "hard", "insane", "expert"] as const
export type Difficulty = (typeof DIFFICULTY_ORDER)[number]

const PLATFORM_LABELS: Record<string, string> = {
  PicoCTF: "picoCTF",
  "Challenge Creation": "Self-Created",
}

export interface WriteupEntry {
  slug: FullSlug
  title: string
  platform: string
  platformLabel: string
  category: string
  categoryTag?: string
  difficulty?: Difficulty
  tags: string[]
  date?: Date
  description?: string
}

function findDifficulty(tags: string[]): Difficulty | undefined {
  for (const tag of tags) {
    const lower = tag.toLowerCase()
    if ((DIFFICULTY_ORDER as readonly string[]).includes(lower)) {
      return lower as Difficulty
    }
  }
  return undefined
}

// the category tag is the folder name with whitespace stripped (e.g. "General Skills" -> "GeneralSkills")
function findCategoryTag(tags: string[], category: string): string | undefined {
  const normalized = category.replace(/\s+/g, "").toLowerCase()
  return tags.find((tag) => tag.replace(/\s+/g, "").toLowerCase() === normalized)
}

// strips the "Challenge Description" heading and trailing "Author: ..." line Quartz's auto description picks up
function cleanExcerpt(desc: string | undefined): string | undefined {
  if (!desc) return undefined
  const cleaned = desc
    .replace(/^(challenge description\s*)+/i, "")
    .replace(/^description\s*/i, "")
    .split(/\s*Author:/)[0]
    .trim()
  return cleaned || undefined
}

export function buildWriteupEntries(
  cfg: GlobalConfiguration,
  allFiles: QuartzPluginData[],
): WriteupEntry[] {
  const entries: WriteupEntry[] = []

  for (const file of allFiles) {
    const tags = file.frontmatter?.tags ?? []
    if (tags.length === 0 || !file.slug || !file.filePath) continue

    const segments = file.filePath.split("/")
    const platform = segments.at(-3)
    const category = segments.at(-2)
    if (!platform || !category) continue

    const difficulty = findDifficulty(tags)
    const categoryTag = findCategoryTag(tags, category)
    const restTags = tags.filter(
      (tag) =>
        tag !== categoryTag && tag.toLowerCase() !== difficulty && tag !== "ChallengeCreation",
    )

    entries.push({
      slug: file.slug,
      title: file.frontmatter?.title ?? category,
      platform,
      platformLabel: PLATFORM_LABELS[platform] ?? platform,
      category,
      categoryTag,
      difficulty,
      tags: restTags,
      date: getDate(cfg, file),
      description: cleanExcerpt(file.description),
    })
  }

  return entries
}

export interface Facets {
  platforms: string[]
  categories: string[]
  difficulties: Difficulty[]
  tags: { tag: string; count: number }[]
}

export function computeFacets(entries: WriteupEntry[]): Facets {
  const platforms = [...new Set(entries.map((e) => e.platform))].sort()
  const categories = [...new Set(entries.map((e) => e.category))].sort()
  const difficulties = DIFFICULTY_ORDER.filter((d) =>
    entries.some((e) => e.difficulty === d),
  ) as Difficulty[]

  const tagCounts = new Map<string, number>()
  for (const entry of entries) {
    for (const tag of entry.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }
  const tags = [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))

  return { platforms, categories, difficulties, tags }
}

export interface WriteupStats {
  total: number
  categoryCounts: { category: string; categoryTag?: string; count: number }[]
  difficultyCounts: { difficulty: Difficulty; count: number }[]
  monthly: { month: string; count: number; cumulative: number }[]
  categoriesTotal: number
  tagsTotal: number
  selfCreatedTotal: number
}

export function computeWriteupStats(entries: WriteupEntry[]): WriteupStats {
  const facets = computeFacets(entries)

  const categoryCounts = facets.categories
    .map((category) => {
      const inCategory = entries.filter((e) => e.category === category)
      return {
        category,
        categoryTag: inCategory[0]?.categoryTag,
        count: inCategory.length,
      }
    })
    .sort((a, b) => b.count - a.count)

  const difficultyCounts = facets.difficulties.map((difficulty) => ({
    difficulty,
    count: entries.filter((e) => e.difficulty === difficulty).length,
  }))

  const dated = entries.filter((e): e is WriteupEntry & { date: Date } => e.date !== undefined)
  const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
  const counts = new Map<string, number>()
  for (const entry of dated) {
    const key = monthKey(entry.date)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  const sortedMonths = [...counts.keys()].sort()
  let cumulative = 0
  const monthly = sortedMonths.map((month) => {
    cumulative += counts.get(month)!
    return { month, count: counts.get(month)!, cumulative }
  })

  return {
    total: entries.length,
    categoryCounts,
    difficultyCounts,
    monthly,
    categoriesTotal: facets.categories.length,
    tagsTotal: facets.tags.length,
    selfCreatedTotal: entries.filter((e) => e.platform === "Challenge Creation").length,
  }
}
