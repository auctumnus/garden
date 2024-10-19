import { si } from "./set-image.inline"

const currentTheme = localStorage.getItem("theme") || "auto"
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark" | "auto") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

const nextTheme = (currentTheme: string) => {
  if (currentTheme === "light") {
    return "dark"
  } else if (currentTheme === "dark") {
    return "auto"
  } else {
    return "light"
  }
}

document.addEventListener("nav", () => {
  const switchTheme = (e: Event) => {
    const newTheme = (() => {
      const savedTheme = document.documentElement.getAttribute("saved-theme")
      return nextTheme(savedTheme!)
    })()
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  // Darkmode toggle
  const themeButton = document.querySelector("#darkmode") as HTMLButtonElement
  themeButton.addEventListener("click", switchTheme)
  themeButton.addEventListener("mouseover", () => {
    const th = document.documentElement.getAttribute("saved-theme")
    if(th === 'dark' || th === 'auto') {
      si('light')
    } else {
      si('dark')
    }
  })
  window.addCleanup(() => themeButton.removeEventListener("click", switchTheme))
})
