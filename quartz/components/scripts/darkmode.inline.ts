const currentTheme = localStorage.getItem("theme") || "auto"
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark" | "auto") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchTheme = (e: Event) => {
    const newTheme = (() => {
      const savedTheme = document.documentElement.getAttribute("saved-theme")
      if (savedTheme === "light") {
        return "dark"
      } else if (savedTheme === "dark") {
        return "auto"
      } else {
        return "light"
      }
    })()
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  // Darkmode toggle
  const themeButton = document.querySelector("#darkmode") as HTMLButtonElement
  themeButton.addEventListener("click", switchTheme)
  window.addCleanup(() => themeButton.removeEventListener("click", switchTheme))
})
