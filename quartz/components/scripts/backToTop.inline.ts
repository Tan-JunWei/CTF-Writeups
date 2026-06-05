function setupBackToTop() {
  const button = document.getElementById("back-to-top")
  if (!button) return

  function handleScroll() {
    if (window.scrollY > 400) {
      button!.classList.add("visible")
    } else {
      button!.classList.remove("visible")
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  handleScroll()
  window.addEventListener("scroll", handleScroll, { passive: true })
  button.addEventListener("click", scrollToTop)
  window.addCleanup(() => {
    window.removeEventListener("scroll", handleScroll)
    button!.removeEventListener("click", scrollToTop)
  })
}

document.addEventListener("nav", setupBackToTop)
