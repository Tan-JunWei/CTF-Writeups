// Expand/collapse for the folder tree (FolderContent).
//
// The twisty always toggles open/closed without navigating. A row click is
// a real link, so it also navigates, but only when opening. Closing stays
// on the page: every folder on the current page's own path is
// server-rendered open, so if closing also navigated, the destination
// would just render it open again and it could never stay collapsed.
type MaybeHTMLElement = HTMLElement | undefined

function getParts(el: HTMLElement) {
  const node = el.closest(".tree-node") as MaybeHTMLElement
  const toggle = node?.querySelector(":scope > .tree-row-wrap > .tree-toggle") as MaybeHTMLElement
  const children = node?.querySelector(":scope > .tree-children") as MaybeHTMLElement
  return { toggle, children }
}

function setOpen(el: HTMLElement, open: boolean) {
  const { toggle, children } = getParts(el)
  if (!children || !toggle) return
  children.classList.toggle("open", open)
  toggle.setAttribute("aria-expanded", open ? "true" : "false")
}

function isOpen(el: HTMLElement): boolean {
  return getParts(el).children?.classList.contains("open") ?? false
}

// the twisty: toggles only, never navigates
function onToggleClick(this: HTMLElement, evt: MouseEvent) {
  evt.preventDefault()
  evt.stopPropagation()
  setOpen(this, !isOpen(this))
}

// the row: opening navigates there, closing stays on this page
function onRowClick(this: HTMLElement, evt: MouseEvent) {
  const open = isOpen(this)
  if (open) {
    evt.preventDefault()
    evt.stopPropagation()
  }
  setOpen(this, !open)
}

function setupFolderTree() {
  for (const toggle of document.getElementsByClassName(
    "tree-toggle",
  ) as HTMLCollectionOf<HTMLElement>) {
    toggle.addEventListener("click", onToggleClick)
    window.addCleanup(() => toggle.removeEventListener("click", onToggleClick))
  }

  // scoped to <a>.tree-branch specifically: TagContent's tag index also uses
  // a .tree-branch class (on a <summary>, toggled natively via <details>)
  // and shouldn't get this listener too
  for (const row of document.querySelectorAll<HTMLElement>("a.tree-branch")) {
    row.addEventListener("click", onRowClick)
    window.addCleanup(() => row.removeEventListener("click", onRowClick))
  }
}

document.addEventListener("nav", setupFolderTree)
