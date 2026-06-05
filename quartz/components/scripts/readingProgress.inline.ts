function updateReadingProgress() {
  const bar = document.getElementById("reading-progress-bar")
  if (!bar) return

  const scrollY = window.scrollY
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = documentHeight > 0 ? (scrollY / documentHeight) * 100 : 0

  bar.style.width = `${Math.min(100, Math.max(0, progress))}%`
}

document.addEventListener("nav", () => {
  updateReadingProgress()
  window.addEventListener("scroll", updateReadingProgress, { passive: true })
  window.addCleanup(() => window.removeEventListener("scroll", updateReadingProgress))
})
