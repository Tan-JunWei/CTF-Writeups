const bufferPx = 150
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const slug = entry.target.id
    const tocEntryElement = document.querySelector(`a[data-for="${slug}"]`)
    const windowHeight = entry.rootBounds?.height
    if (windowHeight && tocEntryElement) {
      if (entry.boundingClientRect.y < windowHeight) {
        tocEntryElement.classList.add("in-view")
      } else {
        tocEntryElement.classList.remove("in-view")
      }
    }
  }
})

function updateActiveTocLink() {
  const headers = Array.from(
    document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"),
  ) as HTMLElement[]

  let activeId: string | null = null
  for (const header of headers) {
    if (header.getBoundingClientRect().top <= 80) {
      activeId = header.id
    }
  }

  document.querySelectorAll("a[data-for]").forEach((a) => {
    a.classList.remove("active-toc")
  })

  if (activeId) {
    const activeLink = document.querySelector(`a[data-for="${activeId}"]`)
    activeLink?.classList.add("active-toc")
  }
}

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
  content.style.maxHeight = content.style.maxHeight === "0px" ? content.scrollHeight + "px" : "0px"
}

function setupToc() {
  const toc = document.getElementById("toc")
  if (toc) {
    const collapsed = toc.classList.contains("collapsed")
    const content = toc.nextElementSibling as HTMLElement | undefined
    if (!content) return
    content.style.maxHeight = collapsed ? "0px" : content.scrollHeight + "px"
    toc.addEventListener("click", toggleToc)
    window.addCleanup(() => toc.removeEventListener("click", toggleToc))
  }
}

window.addEventListener("resize", setupToc)
document.addEventListener("nav", () => {
  setupToc()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))

  // active section tracking via scroll
  updateActiveTocLink()
  window.addEventListener("scroll", updateActiveTocLink, { passive: true })
  window.addCleanup(() => window.removeEventListener("scroll", updateActiveTocLink))
})
