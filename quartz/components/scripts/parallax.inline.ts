let parallaxEl: HTMLElement

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const MIN_TOP = 20
const MAX_TOP = 80

let lastMouseX = window.innerWidth / 2;
let lastMouseY = window.innerHeight / 2;

let desiredTop = MIN_TOP;
let desiredLeft = 50;

const animateToDesired = () => {
    // const currentTop = parseFloat(parallaxEl.style.backgroundPositionY.replace("%","") || "0")
    // const currentLeft = parseFloat(parallaxEl.style.backgroundPositionX.replace("%","") || "0")

    // const top = lerp(currentTop, desiredTop, 0.1)
    // const left = lerp(currentLeft, desiredLeft, 0.1)

}

const findDesiredPosition = () => {
    const topPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    let top = lerp(MIN_TOP, MAX_TOP, topPercentage)
     // handle one-screen pages
     if(document.body.scrollHeight <= window.innerHeight) {
        top = MIN_TOP
    }
    const leftPercentage = lastMouseX / window.innerWidth
    const left = lerp(30, 70, leftPercentage)
    const mouseTopPercentage = lastMouseY / window.innerHeight

    const mouseContribution = lerp(-5, 5, mouseTopPercentage)

    top += mouseContribution


    parallaxEl.style.backgroundPosition = `${left}% ${top}%`

    // desiredTop = top
    // desiredLeft = left
}

const scrollHandler = () => {
    findDesiredPosition()
}

const mouseHandler = (event: MouseEvent) => {
    lastMouseX = event.clientX
    lastMouseY = event.clientY
    findDesiredPosition()
}

document.addEventListener("scroll", scrollHandler, { passive: true })

document.addEventListener("mousemove", mouseHandler, { passive: true })

document.addEventListener("DOMContentLoaded", () => {
    parallaxEl = document.getElementById("background-parallax")!
    findDesiredPosition()
    setInterval(animateToDesired, 1000/60)
})

document.addEventListener("nav", () => {
    parallaxEl = document.getElementById("background-parallax")!
    findDesiredPosition()
})

