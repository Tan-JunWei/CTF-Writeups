const LANGUAGE_NAMES: Record<string, string> = {
  python: "Python",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  zsh: "Zsh",
  console: "Terminal",
  shellsession: "Terminal",
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  http: "HTTP",
  groovy: "Groovy",
  c: "C",
  cpp: "C++",
  "c++": "C++",
  java: "Java",
  go: "Go",
  rust: "Rust",
  ruby: "Ruby",
  sql: "SQL",
  json: "JSON",
  yaml: "YAML",
  toml: "TOML",
  xml: "XML",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  markdown: "Markdown",
  md: "Markdown",
  powershell: "PowerShell",
  ps1: "PowerShell",
  dockerfile: "Dockerfile",
  docker: "Docker",
  makefile: "Makefile",
  perl: "Perl",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  scala: "Scala",
  lua: "Lua",
  r: "R",
  asm: "Assembly",
  assembly: "Assembly",
}

const ICON_SLUGS: Record<string, string> = {
  python: "python",
  bash: "gnubash",
  sh: "gnubash",
  shell: "gnubash",
  zsh: "gnubash",
  console: "gnubash",
  shellsession: "gnubash",
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  groovy: "apachegroovy",
  java: "java",
  go: "go",
  rust: "rust",
  ruby: "ruby",
  json: "json",
  yaml: "yaml",
  html: "html5",
  css: "css3",
  scss: "sass",
  c: "c",
  cpp: "cplusplus",
  "c++": "cplusplus",
  kotlin: "kotlin",
  swift: "swift",
  php: "php",
  scala: "scala",
  lua: "lua",
  perl: "perl",
  powershell: "powershell",
  ps1: "powershell",
  docker: "docker",
  dockerfile: "docker",
  markdown: "markdown",
  md: "markdown",
  toml: "toml",
  r: "r",
}

const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`

// Persists across SPA navigations, fetched once per session per slug
const svgCache = new Map<string, string | null>()

function getDisplayName(lang: string): string {
  return LANGUAGE_NAMES[lang.toLowerCase()] ?? lang.charAt(0).toUpperCase() + lang.slice(1)
}

function stripSize(svg: string): string {
  return svg.replace(/\s+width="[^"]*"/, "").replace(/\s+height="[^"]*"/, "")
}

async function loadBrandIcon(wrap: HTMLElement, slug: string): Promise<void> {
  if (svgCache.has(slug)) {
    const hit = svgCache.get(slug)
    if (hit) wrap.innerHTML = stripSize(hit)
    return
  }

  try {
    const res = await fetch(`https://cdn.simpleicons.org/${slug}`)
    if (!res.ok) {
      svgCache.set(slug, null)
      return
    }
    const text = await res.text()
    svgCache.set(slug, text)
    wrap.innerHTML = stripSize(text)
  } catch {
    svgCache.set(slug, null)
  }
}

document.addEventListener("nav", () => {
  document.querySelectorAll<HTMLElement>("pre[data-language]").forEach((pre) => {
    const lang = pre.getAttribute("data-language")
    if (!lang || lang === "plaintext" || lang === "text" || lang === "") return
    if (pre.previousElementSibling?.classList.contains("code-language-header")) return

    const header = document.createElement("div")
    header.className = "code-language-header"

    const iconWrap = document.createElement("span")
    iconWrap.className = "code-lang-icon-wrap"
    iconWrap.innerHTML = FALLBACK_SVG

    const slug = ICON_SLUGS[lang.toLowerCase()]
    if (slug) loadBrandIcon(iconWrap, slug)

    const name = document.createElement("span")
    name.className = "code-language-name"
    name.textContent = getDisplayName(lang)

    header.appendChild(iconWrap)
    header.appendChild(name)

    const figure = pre.parentElement
    if (figure) {
      figure.classList.add("has-language-header")
      figure.insertBefore(header, pre)
    }
  })
})
