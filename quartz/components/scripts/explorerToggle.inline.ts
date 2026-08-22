function isExplorerOpen(): boolean {
  return document.body.classList.contains("explorer-open")
}

function setToggleState(toggle: HTMLElement, open: boolean) {
  document.body.classList.toggle("explorer-open", open)
  toggle.setAttribute("aria-expanded", open ? "true" : "false")
}

function setupExplorerToggle() {
  const toggle = document.getElementById("explorer-toggle")
  const backdrop = document.getElementById("explorer-backdrop")
  const closeButton = document.getElementById("explorer-close")
  const explorerContent = document.getElementById("explorer-content")
  if (!toggle) return

  setToggleState(toggle, false)

  function handleToggleClick(evt: MouseEvent) {
    evt.stopPropagation()
    setToggleState(toggle!, !isExplorerOpen())
  }

  function handleBackdropClick() {
    setToggleState(toggle!, false)
  }

  function handleCloseClick(evt: MouseEvent) {
    evt.stopPropagation()
    setToggleState(toggle!, false)
  }

  function handleKeydown(evt: KeyboardEvent) {
    if (evt.key === "Escape" && isExplorerOpen()) {
      setToggleState(toggle!, false)
    }
  }

  function handleContentClick(evt: MouseEvent) {
    const target = evt.target as HTMLElement
    if (target.closest("a")) {
      setToggleState(toggle!, false)
    }
  }

  toggle.addEventListener("click", handleToggleClick)
  backdrop?.addEventListener("click", handleBackdropClick)
  closeButton?.addEventListener("click", handleCloseClick)
  document.addEventListener("keydown", handleKeydown)
  explorerContent?.addEventListener("click", handleContentClick)

  window.addCleanup(() => {
    toggle.removeEventListener("click", handleToggleClick)
    backdrop?.removeEventListener("click", handleBackdropClick)
    closeButton?.removeEventListener("click", handleCloseClick)
    document.removeEventListener("keydown", handleKeydown)
    explorerContent?.removeEventListener("click", handleContentClick)
  })
}

document.addEventListener("nav", setupExplorerToggle)
