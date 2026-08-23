import { Root, RootContent } from "hast"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { htmlToJsx } from "../../util/jsx"
import { colorForTag } from "../../util/tagColor"
import { buildWriteupEntries, computeWriteupStats, Difficulty } from "../../util/writeups"
import { FullSlug, resolveRelative } from "../../util/path"
import style from "../styles/home.scss"
// @ts-ignore
import tooltipScript from "../scripts/chartTooltip.inline"

// manually maintained self-assessment, edit directly rather than deriving it from writeup tags
const PLAYER_SKILLS: { name: string; score: number }[] = [
  { name: "Challenge Design", score: 90 },
  { name: "Cryptanalysis", score: 85 },
  { name: "Digital Forensics", score: 84 },
  { name: "Tooling Fluency", score: 81 },
  { name: "Scripting & Automation", score: 79 },
  { name: "Pattern Recognition", score: 74 },
  { name: "Network Analysis", score: 70 },
]

function pct(count: number, total: number): number {
  return total === 0 ? 0 : Math.round((count / total) * 100)
}

function KpiArrow() {
  return (
    <svg
      class="hd-kpi-arrow"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
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

function formatMonth(key: string): string {
  const [y, m] = key.split("-").map(Number)
  const d = new Date(Date.UTC(y, m - 1, 1))
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
}

function monthIndex(key: string): number {
  const [y, m] = key.split("-").map(Number)
  return y * 12 + (m - 1)
}

// "nice" round axis ceiling + step (1/2/2.5/5/10 x a power of ten) so gridlines land on round numbers
function niceScale(maxValue: number, targetTicks = 4): { max: number; step: number } {
  if (maxValue <= 0) return { max: targetTicks, step: 1 }
  const rawStep = maxValue / targetTicks
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)))
  const residual = rawStep / magnitude
  let step: number
  if (residual > 5) step = 10 * magnitude
  else if (residual > 2) step = 5 * magnitude
  else if (residual > 1) step = 2 * magnitude
  else step = magnitude
  return { max: Math.ceil(maxValue / step) * step, step }
}

function evenIndices(length: number, count: number): number[] {
  if (length <= count) return Array.from({ length }, (_, i) => i)
  const idxs = new Set<number>()
  for (let i = 0; i < count; i++) {
    idxs.add(Math.round((i * (length - 1)) / (count - 1)))
  }
  return [...idxs].sort((a, b) => a - b)
}

// mild Catmull-Rom -> cubic Bezier smoothing through the given points
function smoothPath(points: [number, number][]): string {
  if (points.length === 0) return ""
  if (points.length === 1) return `M ${points[0][0]},${points[0][1]}`
  if (points.length === 2) {
    return `M ${points[0][0]},${points[0][1]} L ${points[1][0]},${points[1][1]}`
  }
  const smoothing = 0.15
  const d = [`M ${points[0][0]},${points[0][1]}`]
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) * smoothing
    const c1y = p1[1] + (p2[1] - p0[1]) * smoothing
    const c2x = p2[0] - (p3[0] - p1[0]) * smoothing
    const c2y = p2[1] - (p3[1] - p1[1]) * smoothing
    d.push(`C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`)
  }
  return d.join(" ")
}

// angleDeg=0 points right, -90 points up, positive angles sweep clockwise
function polarPoint(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

function sectorPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number,
): string {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  const [ox0, oy0] = polarPoint(cx, cy, rOuter, startDeg)
  const [ox1, oy1] = polarPoint(cx, cy, rOuter, endDeg)
  const [ix1, iy1] = polarPoint(cx, cy, rInner, endDeg)
  const [ix0, iy0] = polarPoint(cx, cy, rInner, startDeg)
  return [
    `M ${ox0} ${oy0}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${ox1} ${oy1}`,
    `L ${ix1} ${iy1}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${ix0} ${iy0}`,
    "Z",
  ].join(" ")
}

function DonutChart({
  data,
  total,
  exploreHref,
}: {
  data: { difficulty: Difficulty; count: number }[]
  total: number
  exploreHref: string
}) {
  const cx = 60
  const cy = 60
  const R = 44
  const STROKE = 26
  const rOuter = R + STROKE / 2
  const rInner = R - STROKE / 2
  // constant angular gap between segments so spacing reads as even regardless of segment size
  const GAP_DEG = 1.8

  let angle = -90
  const segments = data.map(({ difficulty, count }) => {
    const sweep = total > 0 ? (count / total) * 360 : 0
    const start = angle
    const end = angle + sweep
    angle = end
    return { difficulty, count, start, end }
  })

  return (
    <div class="hd-ring-wrap">
      <svg viewBox="0 0 120 120" class="hd-ring" aria-hidden="true">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--lightgray)" stroke-width={STROKE} />
        {segments.map(({ difficulty, count, start, end }) => {
          const half = GAP_DEG / 2
          const a0 = start + half
          const a1 = Math.max(end - half, a0 + 0.05)
          const d = sectorPath(cx, cy, rInner, rOuter, a0, a1)

          return (
            <a
              key={difficulty}
              class="hd-ring-segment"
              href={`${exploreHref}?difficulty=${difficulty}`}
              tabindex={-1}
              data-difficulty={difficulty}
            >
              {/* the path is the exact hit area, so hovering can't spill into a neighboring segment */}
              <path
                class="hd-ring-arc"
                d={d}
                fill={`var(--diff-${difficulty})`}
                style={{ color: `var(--diff-${difficulty})` }}
              />
            </a>
          )
        })}
      </svg>
    </div>
  )
}

function DifficultyLegend({
  data,
  total,
  exploreHref,
}: {
  data: { difficulty: Difficulty; count: number }[]
  total: number
  exploreHref: string
}) {
  return (
    <ul class="hd-legend">
      {data.map(({ difficulty, count }) => (
        <li key={difficulty}>
          <a href={`${exploreHref}?difficulty=${difficulty}`} data-difficulty={difficulty}>
            <i class="hd-legend-dot" style={{ backgroundColor: `var(--diff-${difficulty})` }} />
            <span class="hd-legend-label">{difficulty}</span>
            <span class="hd-legend-count" style={{ color: `var(--diff-${difficulty})` }}>
              {count} <span class="hd-legend-pct">({pct(count, total)}%)</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function CategoryBars({
  data,
  total,
  exploreHref,
}: {
  data: { category: string; categoryTag?: string; count: number }[]
  total: number
  exploreHref: string
}) {
  return (
    <ul class="hd-bars">
      {data.map(({ category, categoryTag, count }) => (
        <li key={category}>
          <a
            class="hd-bar-row"
            href={`${exploreHref}?category=${encodeURIComponent(category)}`}
            style={tagVars(categoryTag ?? category)}
          >
            <span class="hd-bar-label">{category}</span>
            <span class="hd-bar-track">
              <span class="hd-bar-fill" style={{ width: `${pct(count, total)}%` }} />
            </span>
            <span class="hd-bar-count">
              {count} <span class="hd-bar-pct">({pct(count, total)}%)</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function TimeChart({
  monthly,
}: {
  monthly: { month: string; count: number; cumulative: number }[]
}) {
  if (monthly.length === 0) return null
  const plotW = 560
  const plotH = 200

  const { max: yMax, step: yStep } = niceScale(monthly[monthly.length - 1].cumulative, 4)
  const yTicks: number[] = []
  for (let v = 0; v <= yMax; v += yStep) yTicks.push(v)

  // spacing weighted by elapsed time, compressed with a fourth-root so gaps read as wider but not huge
  const cumWeight = [0]
  for (let i = 1; i < monthly.length; i++) {
    const gap = Math.max(1, monthIndex(monthly[i].month) - monthIndex(monthly[i - 1].month))
    cumWeight.push(cumWeight[i - 1] + Math.pow(gap, 0.25))
  }
  const totalWeight = cumWeight[monthly.length - 1] || 1

  const x = (i: number) => (monthly.length > 1 ? (cumWeight[i] / totalWeight) * plotW : plotW / 2)
  const y = (v: number) => plotH - (v / yMax) * plotH

  const points: [number, number][] = monthly.map((m, i) => [x(i), y(m.cumulative)])
  const linePath = smoothPath(points)
  const areaPath = `${linePath} L ${plotW},${plotH} L 0,${plotH} Z`

  const xTickIdxs = evenIndices(monthly.length, Math.min(6, monthly.length))

  return (
    <div class="hd-timechart">
      <div class="hd-timechart-body">
        <div class="hd-timechart-ylabels" aria-hidden="true">
          {yTicks.map((v) => (
            <span key={v} class="hd-timechart-ylabel" style={{ top: `${(1 - v / yMax) * 100}%` }}>
              {v}
            </span>
          ))}
        </div>
        <div class="hd-timechart-plot">
          <svg
            viewBox={`0 0 ${plotW} ${plotH}`}
            class="hd-area"
            role="img"
            aria-label="Writeups published over time"
          >
            <defs>
              <linearGradient id="hd-area-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--chart-accent)" stop-opacity="0.22" />
                <stop offset="100%" stop-color="var(--chart-accent)" stop-opacity="0" />
              </linearGradient>
              {/* clips the highlighted duplicate of the line down to just the
                  active month's section, x/width move and are eased by CSS */}
              <clipPath id="hd-area-band-clip">
                <rect class="hd-area-band-clip-rect" x="0" y="0" width="0" height={plotH} />
              </clipPath>
            </defs>
            {yTicks.map((v) => (
              <line
                key={v}
                class="hd-area-grid"
                x1="0"
                x2={plotW}
                y1={y(v)}
                y2={y(v)}
                vector-effect="non-scaling-stroke"
              />
            ))}
            <g class="hd-area-reveal">
              <path d={areaPath} fill="url(#hd-area-grad)" stroke="none" />
              <path
                d={linePath}
                class="hd-area-line"
                fill="none"
                vector-effect="non-scaling-stroke"
              />
              {/* duplicate of the line above, clipped to the active section's x-range */}
              <path
                d={linePath}
                class="hd-area-line-highlight"
                fill="none"
                vector-effect="non-scaling-stroke"
                clip-path="url(#hd-area-band-clip)"
              />
              {monthly.map((m, i) => (
                <g
                  key={m.month}
                  class="hd-area-point"
                  tabindex={0}
                  aria-label={`${formatMonth(m.month)}: total ${m.cumulative}, ${m.count} added that month`}
                  data-cumulative={m.cumulative}
                  data-count={m.count}
                  data-month={m.month}
                  data-x={x(i)}
                >
                  <circle cx={x(i)} cy={y(m.cumulative)} r="2.5" class="hd-area-dot" />
                </g>
              ))}
            </g>
            {/* dashed boundaries marking where the highlighted section starts/ends */}
            <line
              class="hd-area-band-start"
              x1="0"
              x2="0"
              y1="0"
              y2={plotH}
              vector-effect="non-scaling-stroke"
            />
            <line
              class="hd-area-band-end"
              x1="0"
              x2="0"
              y1="0"
              y2={plotH}
              vector-effect="non-scaling-stroke"
            />
            {/* invisible, only used to anchor the tooltip over the active section */}
            <rect
              class="hd-area-band-anchor"
              x="0"
              y="0"
              width="0"
              height={plotH}
              fill="transparent"
            />
            {/* topmost, transparent, spans the whole plot for the pointer to scrub */}
            <rect
              class="hd-area-hitlayer"
              x="0"
              y="0"
              width={plotW}
              height={plotH}
              fill="transparent"
            />
          </svg>
        </div>
      </div>
      <div class="hd-timechart-xlabels" aria-hidden="true">
        {xTickIdxs.map((i) => {
          const isFirst = i === 0
          const isLast = i === monthly.length - 1
          return (
            <span
              key={i}
              class="hd-timechart-xlabel"
              style={{
                left: `${(x(i) / plotW) * 100}%`,
                transform: isFirst ? "none" : isLast ? "translateX(-100%)" : "translateX(-50%)",
              }}
            >
              {formatMonth(monthly[i].month)}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function RadarChart({ data }: { data: { name: string; score: number }[] }) {
  const n = data.length
  if (n < 3) return null

  const W = 220
  const H = 200
  const cx = W / 2
  const cy = H / 2 - 4
  const R = 59
  const LABEL_GAP = 21
  const angleFor = (i: number) => -90 + i * (360 / n)
  const hue = (i: number) => `hsl(var(--radar-h${i % 7}) 58% var(--radar-l${i % 7}))`

  const gridLevels = [20, 40, 60, 80, 100]
  const gridPolygons = gridLevels.map((level) =>
    data.map((_, i) => polarPoint(cx, cy, (level / 100) * R, angleFor(i)).join(",")).join(" "),
  )

  const dataPoints = data.map((d, i) => polarPoint(cx, cy, (d.score / 100) * R, angleFor(i)))
  const clipPath = `polygon(${dataPoints.map(([x, y]) => `${(x / W) * 100}% ${(y / H) * 100}%`).join(", ")})`
  const gradientStops =
    data.map((_, i) => `${hue(i)} ${((i * 100) / n).toFixed(2)}%`).join(", ") + `, ${hue(0)} 100%`
  const fillGradient = `conic-gradient(from 0deg at ${(cx / W) * 100}% ${(cy / H) * 100}%, ${gradientStops})`

  return (
    <div class="hd-radar-wrap">
      <div class="hd-radar-fill" style={{ clipPath, background: fillGradient }} />
      <svg viewBox={`0 0 ${W} ${H}`} class="hd-radar" aria-hidden="true">
        <defs>
          {data.map((_, i) => {
            const j = (i + 1) % n
            const [x1, y1] = dataPoints[i]
            const [x2, y2] = dataPoints[j]
            return (
              <linearGradient
                key={i}
                id={`hd-radar-edge-${i}`}
                gradientUnits="userSpaceOnUse"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              >
                <stop offset="0%" stop-color={hue(i)} />
                <stop offset="100%" stop-color={hue(j)} />
              </linearGradient>
            )
          })}
        </defs>
        {gridPolygons.map((pts, i) => (
          <polygon key={i} points={pts} class="hd-radar-grid" />
        ))}
        {data.map((_, i) => {
          const [x, y] = polarPoint(cx, cy, R, angleFor(i))
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} class="hd-radar-spoke" />
        })}
        {data.map((_, i) => {
          const j = (i + 1) % n
          const [x1, y1] = dataPoints[i]
          const [x2, y2] = dataPoints[j]
          return (
            <line
              key={`edge-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              class="hd-radar-edge"
              stroke={`url(#hd-radar-edge-${i})`}
            />
          )
        })}
        {data.map((d, i) => {
          const [x, y] = dataPoints[i]
          return (
            <g key={d.name} class="hd-radar-point" tabindex={0}>
              <circle
                cx={x}
                cy={y}
                r="4"
                class="hd-radar-dot"
                style={{ fill: hue(i), color: hue(i) }}
              />
            </g>
          )
        })}
      </svg>
      <div class="hd-radar-labels">
        {data.map((d, i) => {
          const [x, y] = polarPoint(cx, cy, R + LABEL_GAP, angleFor(i))
          return (
            <span
              key={d.name}
              class="hd-radar-label"
              style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
            >
              {d.name}
              <b style={{ color: hue(i) }}>{d.score}</b>
            </span>
          )
        })}
      </div>
    </div>
  )
}

function splitAtFirstHeading(tree: Root): [Root, Root] {
  const headingRe = /^h[1-6]$/
  const idx = tree.children.findIndex(
    (c): c is RootContent => c.type === "element" && headingRe.test((c as any).tagName),
  )
  if (idx === -1) return [tree, { type: "root", children: [] }]
  return [
    { type: "root", children: tree.children.slice(0, idx) },
    { type: "root", children: tree.children.slice(idx) },
  ]
}

const Home: QuartzComponent = (props: QuartzComponentProps) => {
  const { tree, fileData, allFiles, cfg } = props
  const entries = buildWriteupEntries(cfg, allFiles)
  const stats = computeWriteupStats(entries)
  const skills = PLAYER_SKILLS
  const difficultyCountsDesc = [...stats.difficultyCounts].reverse()

  const [hero, rest] = splitAtFirstHeading(tree as Root)
  const heroJsx = htmlToJsx(fileData.filePath!, hero)
  const restJsx = htmlToJsx(fileData.filePath!, rest)

  const exploreHref = resolveRelative(fileData.slug!, "Explore" as FullSlug)
  // pre-hydration fallback, dynamicDate.inline.ts overwrites this with today's date on load
  const buildDateFallback = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div class="popover-hint">
      <article>
        {heroJsx}
        <p>
          As of <strong id="dynamic-date">{buildDateFallback}</strong>, this collection has grown to{" "}
          <strong>{stats.total}</strong> writeups across <strong>{stats.categoriesTotal}</strong>{" "}
          categories. <a href={exploreHref}>Browse all writeups →</a>
        </p>
      </article>

      <section class="hd-dashboard" aria-label="Writeup statistics">
        <div class="hd-kpis">
          <a class="hd-kpi" href={exploreHref} data-tooltip="Browse every writeup">
            <KpiArrow />
            <span class="hd-kpi-num">{stats.total}</span>
            <span class="hd-kpi-label">Total writeups</span>
          </a>
          <div class="hd-kpi">
            <span class="hd-kpi-num">{stats.categoriesTotal}</span>
            <span class="hd-kpi-label">Categories</span>
          </div>
          <div class="hd-kpi">
            <span class="hd-kpi-num">{stats.tagsTotal}</span>
            <span class="hd-kpi-label">Distinct techniques</span>
          </div>
          <a
            class="hd-kpi"
            href={`${exploreHref}?platform=${encodeURIComponent("Challenge Creation")}`}
            data-tooltip="Browse the challenges I've built"
          >
            <KpiArrow />
            <span class="hd-kpi-num">{stats.selfCreatedTotal}</span>
            <span class="hd-kpi-label">Self-created challenges</span>
          </a>
        </div>

        <div class="hd-row">
          <div class="hd-panel hd-panel-wide">
            <h2 class="hd-panel-title">Writeups over time</h2>
            <TimeChart monthly={stats.monthly} />
          </div>
          <div class="hd-panel">
            <h2 class="hd-panel-title">Difficulty Distribution</h2>
            <div class="hd-diff-body">
              <DonutChart
                data={difficultyCountsDesc}
                total={stats.total}
                exploreHref={exploreHref}
              />
              <DifficultyLegend
                data={difficultyCountsDesc}
                total={stats.total}
                exploreHref={exploreHref}
              />
            </div>
          </div>
        </div>

        <div class="hd-row hd-row-equal">
          <div class="hd-panel hd-panel-center">
            <h2 class="hd-panel-title">Skills &amp; Competencies</h2>
            <RadarChart data={skills} />
          </div>
          <div class="hd-panel hd-panel-center">
            <h2 class="hd-panel-title">Category Distribution</h2>
            <CategoryBars
              data={stats.categoryCounts}
              total={stats.total}
              exploreHref={exploreHref}
            />
          </div>
        </div>
      </section>

      <article>{restJsx}</article>
    </div>
  )
}

Home.css = style
Home.afterDOMLoaded = tooltipScript
export default (() => Home) satisfies QuartzComponentConstructor
