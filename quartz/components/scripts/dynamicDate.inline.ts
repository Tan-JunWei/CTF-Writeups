// Singapore has a fixed UTC+8 offset with no DST
const SGT_OFFSET_MS = 8 * 60 * 60 * 1000

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Singapore",
  day: "numeric",
  month: "long",
  year: "numeric",
})

function msUntilNextSGTMidnight(): number {
  const nowSgt = new Date(Date.now() + SGT_OFFSET_MS)
  const nextMidnightSgt = Date.UTC(
    nowSgt.getUTCFullYear(),
    nowSgt.getUTCMonth(),
    nowSgt.getUTCDate() + 1,
    0,
    0,
    0,
  )
  return nextMidnightSgt - nowSgt.getTime()
}

function setupDynamicDate() {
  const el = document.getElementById("dynamic-date")
  if (!el) return

  function render() {
    el!.textContent = formatter.format(new Date())
  }

  let timeoutId: number | undefined
  function scheduleNext() {
    // Re-computed every tick so drift never accumulates
    timeoutId = window.setTimeout(() => {
      render()
      scheduleNext()
    }, msUntilNextSGTMidnight())
  }

  render()
  scheduleNext()

  window.addCleanup(() => {
    if (timeoutId !== undefined) clearTimeout(timeoutId)
  })
}

document.addEventListener("nav", setupDynamicDate)
