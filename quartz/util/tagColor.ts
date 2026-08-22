const hash32 = (s: string) => {
  let h = 0x811c9d5 >>> 0
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
    h = ((h << 12) | (h >>> 18)) >>> 0
    h ^= h >>> 16
    h = Math.imul(h, 0x85ebca6b) >>> 0
    h ^= h >>> 13
    h = Math.imul(h, 0xc2b2ae35) >>> 0
    h ^= h >>> 16
  }
  return h >>> 0
}

const hueFromString = (s: string) => {
  const golden = 0.61803398875
  const u = hash32(s) / 0xffffffff
  return ((u + golden) % 1) * 360
}

// per-hue lightness nudge, some hues read too hot or muddy at a flat lightness
function hueLightnessNudge(h: number) {
  const H = ((h % 360) + 360) % 360
  const ease = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t)

  function w(h0: number, h1: number, feather = 8) {
    const inRange = (x: number) => (h0 <= h1 ? x >= h0 && x <= h1 : x >= h0 || x <= h1)
    if (!inRange(H)) return 0
    const distStart = (H - h0 + 360) % 360
    const distEnd = (h1 - H + 360) % 360
    if (distStart > feather && distEnd > feather) return 1
    const t = distStart <= feather ? distStart / feather : distEnd / feather
    return ease(t)
  }

  let delta = 0
  delta += -1.2 * w(50, 90)
  delta += -1.2 * w(90, 140)
  delta += +2.0 * w(200, 250)
  delta += +2.3 * w(250, 290)
  delta += +0.8 * w(340, 360)
  delta += +0.8 * w(0, 20)
  return delta
}

export const colorForTag = (tag: string) => {
  const avoidStart = 200
  const avoidEnd = 290
  const norm = (x: number) => ((x % 360) + 360) % 360
  const inAvoid = (h: number) =>
    avoidStart <= avoidEnd ? h >= avoidStart && h <= avoidEnd : h >= avoidStart || h <= avoidEnd

  let h = norm(hueFromString(tag))
  if (inAvoid(h)) {
    const distToStart = (h - avoidStart + 360) % 360
    const distToEnd = (avoidEnd - h + 360) % 360
    h = distToStart < distToEnd ? avoidStart - 5 : avoidEnd + 5
    h = norm(h)
  }

  const s = 62
  const delta = hueLightnessNudge(h)

  // Dark mode: lighter band for good contrast against the near-black page.
  const darkL = Math.min(74, Math.max(66, 70 + delta))

  // Light mode: darker, still fully saturated band so text stays legible
  // against the pale page while keeping the same hue as dark mode.
  const lightL = Math.min(32, Math.max(24, 28 + delta))

  const hue = h.toFixed(2)
  return {
    hue,
    saturation: s,
    lightL: lightL.toFixed(2),
    darkL: darkL.toFixed(2),
  }
}
