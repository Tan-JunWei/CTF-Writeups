const TAG_SEP = "|"

type FacetName = "platform" | "category" | "difficulty" | "tag"

interface ExplorerState {
  q: string
  sort: string
  facets: Record<FacetName, Set<string>>
}

function defaultState(): ExplorerState {
  return {
    q: "",
    sort: "newest",
    facets: { platform: new Set(), category: new Set(), difficulty: new Set(), tag: new Set() },
  }
}

function stateFromURL(): ExplorerState {
  const params = new URLSearchParams(window.location.search)
  const state = defaultState()
  state.q = params.get("q") ?? ""
  state.sort = params.get("sort") ?? "newest"
  for (const facet of ["platform", "category", "difficulty", "tag"] as FacetName[]) {
    const raw = params.get(facet)
    if (raw) {
      state.facets[facet] = new Set(raw.split(",").filter(Boolean))
    }
  }
  return state
}

function stateToURL(state: ExplorerState) {
  const params = new URLSearchParams()
  if (state.q) params.set("q", state.q)
  if (state.sort !== "newest") params.set("sort", state.sort)
  for (const facet of ["platform", "category", "difficulty", "tag"] as FacetName[]) {
    if (state.facets[facet].size > 0) {
      params.set(facet, [...state.facets[facet]].join(","))
    }
  }
  const query = params.toString()
  const url = window.location.pathname + (query ? `?${query}` : "")
  history.replaceState(null, "", url)
}

function cardMatches(card: HTMLElement, state: ExplorerState): boolean {
  if (state.q && !(card.dataset.search ?? "").includes(state.q)) return false

  if (state.facets.platform.size > 0 && !state.facets.platform.has(card.dataset.platform ?? "")) {
    return false
  }
  if (state.facets.category.size > 0 && !state.facets.category.has(card.dataset.category ?? "")) {
    return false
  }
  if (
    state.facets.difficulty.size > 0 &&
    !state.facets.difficulty.has(card.dataset.difficulty ?? "")
  ) {
    return false
  }
  if (state.facets.tag.size > 0) {
    const cardTags = (card.dataset.tags ?? "").split(TAG_SEP)
    const hasAny = [...state.facets.tag].some((tag) => cardTags.includes(tag))
    if (!hasAny) return false
  }
  return true
}

function sortCards(cards: HTMLElement[], sort: string): HTMLElement[] {
  const rank = (c: HTMLElement) => Number(c.dataset.diffRank) || Infinity
  const date = (c: HTMLElement) => Number(c.dataset.date) || 0
  const title = (c: HTMLElement) => c.dataset.title ?? ""

  const sorted = [...cards]
  switch (sort) {
    case "oldest":
      sorted.sort((a, b) => date(a) - date(b))
      break
    case "name":
      sorted.sort((a, b) => title(a).localeCompare(title(b)))
      break
    case "difficulty":
      sorted.sort((a, b) => rank(a) - rank(b) || title(a).localeCompare(title(b)))
      break
    case "newest":
    default:
      sorted.sort((a, b) => date(b) - date(a))
      break
  }
  return sorted
}

function setupDropdown(root: HTMLElement, onChange: (value: string) => void) {
  const trigger = root.querySelector<HTMLButtonElement>(".wc-select-trigger")
  const menu = root.querySelector<HTMLUListElement>(".wc-select-menu")
  const valueLabel = root.querySelector<HTMLElement>(".wc-select-value")
  const options = [...root.querySelectorAll<HTMLLIElement>('[role="option"]')]
  if (!trigger || !menu || !valueLabel || options.length === 0) {
    return { setValue: () => {} }
  }

  function isOpen() {
    return root.dataset.open === "true"
  }

  function focusableOptions() {
    return options
  }

  function open(focusSelected: boolean) {
    root.dataset.open = "true"
    menu!.hidden = false
    trigger!.setAttribute("aria-expanded", "true")
    if (focusSelected) {
      const current = options.find((o) => o.getAttribute("aria-selected") === "true") ?? options[0]
      current.focus()
    }
  }

  function close(returnFocus: boolean) {
    root.dataset.open = "false"
    menu!.hidden = true
    trigger!.setAttribute("aria-expanded", "false")
    if (returnFocus) trigger!.focus()
  }

  // `silent` skips onChange when syncing to state that changed elsewhere (e.g. Clear filters)
  function selectOption(option: HTMLLIElement, silent = false) {
    const value = option.dataset.value ?? ""
    for (const o of options) {
      const selected = o === option
      o.setAttribute("aria-selected", String(selected))
      o.tabIndex = selected ? 0 : -1
    }
    valueLabel!.textContent = option.textContent
    if (!silent) onChange(value)
  }

  function moveFocus(delta: number) {
    const opts = focusableOptions()
    const currentIndex = opts.indexOf(document.activeElement as HTMLLIElement)
    const nextIndex = (currentIndex + delta + opts.length) % opts.length
    opts[nextIndex]?.focus()
  }

  function onTriggerClick() {
    isOpen() ? close(false) : open(true)
  }

  function onTriggerKeydown(e: KeyboardEvent) {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault()
      open(true)
    }
  }

  function onMenuKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        moveFocus(1)
        break
      case "ArrowUp":
        e.preventDefault()
        moveFocus(-1)
        break
      case "Home":
        e.preventDefault()
        options[0]?.focus()
        break
      case "End":
        e.preventDefault()
        options[options.length - 1]?.focus()
        break
      case "Enter":
      case " ":
        e.preventDefault()
        if (document.activeElement instanceof HTMLLIElement) {
          selectOption(document.activeElement)
          close(true)
        }
        break
      case "Escape":
        e.preventDefault()
        close(true)
        break
      case "Tab":
        close(false)
        break
    }
  }

  function onOptionClick(this: HTMLLIElement) {
    selectOption(this)
    close(true)
  }

  function onOutsideClick(e: MouseEvent) {
    if (isOpen() && !root.contains(e.target as Node)) close(false)
  }

  trigger.addEventListener("click", onTriggerClick)
  window.addCleanup(() => trigger.removeEventListener("click", onTriggerClick))
  trigger.addEventListener("keydown", onTriggerKeydown)
  window.addCleanup(() => trigger.removeEventListener("keydown", onTriggerKeydown))
  menu.addEventListener("keydown", onMenuKeydown)
  window.addCleanup(() => menu.removeEventListener("keydown", onMenuKeydown))
  document.addEventListener("click", onOutsideClick)
  window.addCleanup(() => document.removeEventListener("click", onOutsideClick))
  for (const option of options) {
    option.addEventListener("click", onOptionClick)
    window.addCleanup(() => option.removeEventListener("click", onOptionClick))
  }

  return {
    setValue(value: string) {
      const match = options.find((o) => o.dataset.value === value)
      if (match) selectOption(match, true)
    },
  }
}

function setupWriteupExplorer() {
  const root = document.querySelector(".wc-root") as HTMLElement | null
  if (!root) return

  const grid = root.querySelector("#wc-grid") as HTMLElement | null
  const empty = root.querySelector("#wc-empty") as HTMLElement | null
  const searchInput = root.querySelector("#wc-search-input") as HTMLInputElement | null
  const sortRoot = root.querySelector("#wc-sort") as HTMLElement | null
  const countNum = root.querySelector("#wc-count-num") as HTMLElement | null
  const clearBtn = root.querySelector("#wc-clear") as HTMLButtonElement | null
  const emptyClearBtn = root.querySelector("#wc-empty-clear") as HTMLButtonElement | null
  if (!grid) return

  const allCards = [...grid.querySelectorAll<HTMLElement>(".wc-card")]
  let state = stateFromURL()

  const sortDropdown = sortRoot
    ? setupDropdown(sortRoot, (value) => {
        state.sort = value
        render()
        stateToURL(state)
      })
    : { setValue: (_value: string) => {} }

  function syncControlsFromState() {
    if (searchInput) searchInput.value = state.q
    sortDropdown.setValue(state.sort)
    for (const chip of root!.querySelectorAll<HTMLButtonElement>(".wc-chip")) {
      const facet = chip.closest<HTMLElement>("[data-facet]")?.dataset.facet as
        | FacetName
        | undefined
      const value = chip.dataset.value ?? ""
      const active = !!facet && state.facets[facet].has(value)
      chip.classList.toggle("active", active)
      chip.setAttribute("aria-pressed", String(active))
    }
  }

  function render() {
    const visible = allCards.filter((card) => cardMatches(card, state))
    const sorted = sortCards(visible, state.sort)
    const hiddenSet = new Set(sorted)

    for (const card of allCards) {
      card.hidden = !hiddenSet.has(card)
    }
    for (const card of sorted) grid!.appendChild(card)

    if (countNum) countNum.textContent = String(visible.length)
    if (empty) empty.hidden = visible.length > 0
    if (grid) grid.hidden = visible.length === 0
  }

  function update() {
    syncControlsFromState()
    render()
    stateToURL(state)
  }

  function onSearch(e: Event) {
    state.q = (e.target as HTMLInputElement).value.trim().toLowerCase()
    render()
    stateToURL(state)
  }

  function onChipClick(e: MouseEvent) {
    const chip = (e.target as HTMLElement).closest<HTMLButtonElement>(".wc-chip")
    if (!chip) return
    const facet = chip.closest<HTMLElement>("[data-facet]")?.dataset.facet as FacetName | undefined
    const value = chip.dataset.value
    if (!facet || value === undefined) return

    const set = state.facets[facet]
    if (set.has(value)) set.delete(value)
    else set.add(value)

    chip.classList.toggle("active", set.has(value))
    chip.setAttribute("aria-pressed", String(set.has(value)))
    render()
    stateToURL(state)
  }

  function onClear() {
    state = defaultState()
    update()
  }

  searchInput?.addEventListener("input", onSearch)
  window.addCleanup(() => searchInput?.removeEventListener("input", onSearch))
  root.addEventListener("click", onChipClick)
  window.addCleanup(() => root.removeEventListener("click", onChipClick))
  clearBtn?.addEventListener("click", onClear)
  window.addCleanup(() => clearBtn?.removeEventListener("click", onClear))
  emptyClearBtn?.addEventListener("click", onClear)
  window.addCleanup(() => emptyClearBtn?.removeEventListener("click", onClear))

  syncControlsFromState()
  render()
}

document.addEventListener("nav", setupWriteupExplorer)
