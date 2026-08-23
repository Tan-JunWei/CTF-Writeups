import { computePosition, flip, offset, shift } from "@floating-ui/dom"

let tooltipEl: HTMLDivElement | null = null

function ensureTooltip(): HTMLDivElement {
  // SPA nav morphs document.body and detaches this, but the module-level reference survives
  if (!tooltipEl || !tooltipEl.isConnected) {
    tooltipEl = document.createElement("div")
    tooltipEl.className = "chart-tooltip"
    tooltipEl.setAttribute("role", "tooltip")
    document.body.appendChild(tooltipEl)
  }
  return tooltipEl
}

// bumped per call so a stale computePosition() can't land after a newer one and yank the tooltip back
let showSeq = 0

async function showTooltipContent(target: Element, html: string) {
  const tip = ensureTooltip()
  tip.innerHTML = html
  tip.classList.add("visible")

  const seq = ++showSeq
  const { x, y } = await computePosition(target, tip, {
    placement: "top",
    middleware: [offset(9), flip(), shift({ padding: 8 })],
  })
  if (seq !== showSeq) return
  Object.assign(tip.style, { left: `${x}px`, top: `${y}px` })
}

function hideTooltip() {
  tooltipEl?.classList.remove("visible")
}

function setupChartTooltips() {
  const targets = document.querySelectorAll<HTMLElement>("[data-tooltip], [data-tooltip-html]")
  for (const target of targets) {
    const onEnter = () => {
      const html = target.dataset.tooltipHtml
      if (html) {
        showTooltipContent(target, html)
      } else if (target.dataset.tooltip) {
        showTooltipContent(target, escapeHtml(target.dataset.tooltip))
      }
    }
    target.addEventListener("mouseenter", onEnter)
    target.addEventListener("focus", onEnter)
    target.addEventListener("mouseleave", hideTooltip)
    target.addEventListener("blur", hideTooltip)
    window.addCleanup(() => {
      target.removeEventListener("mouseenter", onEnter)
      target.removeEventListener("focus", onEnter)
      target.removeEventListener("mouseleave", hideTooltip)
      target.removeEventListener("blur", hideTooltip)
    })
  }

  window.addCleanup(hideTooltip)
}

function escapeHtml(s: string): string {
  const div = document.createElement("div")
  div.textContent = s
  return div.innerHTML
}

function setupDifficultyLinking() {
  const allEls = [...document.querySelectorAll<HTMLElement>("[data-difficulty]")]
  if (allEls.length === 0) return

  function activate(key: string) {
    for (const el of allEls) {
      const match = el.dataset.difficulty === key
      el.classList.toggle("hd-diff-active", match)
      el.classList.toggle("hd-diff-dim", !match)
    }
  }
  function clear() {
    for (const el of allEls) {
      el.classList.remove("hd-diff-active", "hd-diff-dim")
    }
  }

  for (const el of allEls) {
    const key = el.dataset.difficulty!
    const onEnter = () => activate(key)
    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("focus", onEnter)
    el.addEventListener("mouseleave", clear)
    el.addEventListener("blur", clear)
    window.addCleanup(() => {
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("focus", onEnter)
      el.removeEventListener("mouseleave", clear)
      el.removeEventListener("blur", clear)
    })
  }
  window.addCleanup(clear)
}

// tooltip values are never interpolated between months since the data is monthly buckets
function setupTimeChartInteraction() {
  const charts = document.querySelectorAll<HTMLElement>(".hd-timechart")
  for (const chart of charts) {
    const svg = chart.querySelector<SVGSVGElement>(".hd-area")
    const bandClipRect = chart.querySelector<SVGRectElement>(".hd-area-band-clip-rect")
    const bandAnchor = chart.querySelector<SVGRectElement>(".hd-area-band-anchor")
    const bandStart = chart.querySelector<SVGLineElement>(".hd-area-band-start")
    const bandEnd = chart.querySelector<SVGLineElement>(".hd-area-band-end")
    const hitLayer = chart.querySelector<SVGRectElement>(".hd-area-hitlayer")
    const points = [...chart.querySelectorAll<HTMLElement>(".hd-area-point")]
    if (
      !svg ||
      !bandClipRect ||
      !bandAnchor ||
      !bandStart ||
      !bandEnd ||
      !hitLayer ||
      points.length === 0
    )
      continue

    const n = points.length
    const xs = points.map((p) => parseFloat(p.dataset.x ?? "0"))
    const cumulative = points.map((p) => parseFloat(p.dataset.cumulative ?? "0"))
    const counts = points.map((p) => parseFloat(p.dataset.count ?? "0"))
    const monthMs = points.map((p) => {
      const [y, m] = (p.dataset.month ?? "1970-01").split("-").map(Number)
      return Date.UTC(y, m - 1, 1)
    })
    // use the viewBox width, not the last point's x, which for a single-point chart isn't the right edge
    const plotWidth = svg.viewBox.baseVal.width || svg.getBoundingClientRect().width || 1

    const bounds = points.map((_, i) => ({
      left: i > 0 ? (xs[i - 1] + xs[i]) / 2 : 0,
      right: i < n - 1 ? (xs[i] + xs[i + 1]) / 2 : plotWidth,
    }))

    let activeIndex = -1

    function show(index: number) {
      if (index === activeIndex) return
      activeIndex = index
      const { left, right } = bounds[index]
      const leftStr = String(left)
      const rightStr = String(right)
      const widthStr = String(Math.max(right - left, 0))
      bandClipRect!.setAttribute("x", leftStr)
      bandClipRect!.setAttribute("width", widthStr)
      bandAnchor!.setAttribute("x", leftStr)
      bandAnchor!.setAttribute("width", widthStr)
      bandStart!.setAttribute("x1", leftStr)
      bandStart!.setAttribute("x2", leftStr)
      bandEnd!.setAttribute("x1", rightStr)
      bandEnd!.setAttribute("x2", rightStr)
      chart.classList.add("hd-timechart-hover")

      const dateLabel = new Date(monthMs[index]).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
      showTooltipContent(
        bandAnchor!,
        `<span class="hd-tt-month">${escapeHtml(dateLabel)}</span>` +
          `<span class="hd-tt-total">Total: ${cumulative[index]} <span class="hd-tt-delta">(+${counts[index]})</span></span>`,
      )
    }

    function hide() {
      activeIndex = -1
      chart.classList.remove("hd-timechart-hover")
      hideTooltip()
    }

    function onMove(e: PointerEvent) {
      const rect = svg!.getBoundingClientRect()
      if (rect.width === 0) return
      const viewBoxWidth = svg!.viewBox.baseVal.width || rect.width
      const localX = ((e.clientX - rect.left) / rect.width) * viewBoxWidth
      const clampedX = Math.min(Math.max(localX, 0), plotWidth)
      const t = n > 1 ? (clampedX / plotWidth) * (n - 1) : 0
      const nearest = n > 1 ? Math.min(Math.max(Math.round(t), 0), n - 1) : 0
      show(nearest)
    }

    hitLayer.addEventListener("pointermove", onMove)
    hitLayer.addEventListener("pointerleave", hide)
    window.addCleanup(() => {
      hitLayer.removeEventListener("pointermove", onMove)
      hitLayer.removeEventListener("pointerleave", hide)
    })

    points.forEach((point, i) => {
      const onFocus = () => show(i)
      point.addEventListener("focus", onFocus)
      point.addEventListener("blur", hide)
      window.addCleanup(() => {
        point.removeEventListener("focus", onFocus)
        point.removeEventListener("blur", hide)
      })
    })
    window.addCleanup(hide)
  }
}

function setupRadarInteraction() {
  const wraps = document.querySelectorAll<HTMLElement>(".hd-radar-wrap")
  for (const wrap of wraps) {
    const points = [...wrap.querySelectorAll<HTMLElement>(".hd-radar-point")]
    const edges = [...wrap.querySelectorAll<SVGLineElement>(".hd-radar-edge")]
    const labels = [...wrap.querySelectorAll<HTMLElement>(".hd-radar-label")]
    const n = points.length
    if (n === 0) continue

    let activeIndex = -1

    function setActive(index: number) {
      if (index === activeIndex) return
      activeIndex = index
      wrap.classList.toggle("hd-radar-hovering", index !== -1)

      for (let i = 0; i < n; i++) {
        const isActive = i === index
        points[i].classList.toggle("hd-radar-active", isActive)
        points[i].classList.toggle("hd-radar-point-dim", index !== -1 && !isActive)
        labels[i]?.classList.toggle("hd-radar-label-active", isActive)
        labels[i]?.classList.toggle("hd-radar-label-dim", index !== -1 && !isActive)
      }
      // edge i connects vertex i and vertex (i+1)%n
      for (let i = 0; i < edges.length; i++) {
        const isAdjacent = index !== -1 && (i === index || (i + 1) % n === index)
        edges[i].classList.toggle("hd-radar-edge-active", isAdjacent)
        edges[i].classList.toggle("hd-radar-edge-dim", index !== -1 && !isAdjacent)
      }
    }

    function onMove(e: PointerEvent) {
      let nearest = -1
      let bestDist = Infinity
      for (let i = 0; i < n; i++) {
        const dot = points[i].querySelector("circle.hd-radar-dot")
        if (!dot) continue
        const r = dot.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const dist = dx * dx + dy * dy
        if (dist < bestDist) {
          bestDist = dist
          nearest = i
        }
      }
      setActive(nearest)
    }
    function onLeave() {
      setActive(-1)
    }

    wrap.addEventListener("pointermove", onMove)
    wrap.addEventListener("pointerleave", onLeave)
    window.addCleanup(() => {
      wrap.removeEventListener("pointermove", onMove)
      wrap.removeEventListener("pointerleave", onLeave)
    })

    points.forEach((point, i) => {
      const onFocus = () => setActive(i)
      const onBlur = () => setActive(-1)
      point.addEventListener("focus", onFocus)
      point.addEventListener("blur", onBlur)
      window.addCleanup(() => {
        point.removeEventListener("focus", onFocus)
        point.removeEventListener("blur", onBlur)
      })
    })
    window.addCleanup(onLeave)
  }
}

document.addEventListener("nav", () => {
  setupChartTooltips()
  setupDifficultyLinking()
  setupTimeChartInteraction()
  setupRadarInteraction()
})
