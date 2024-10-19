let parallaxEl: HTMLElement[]

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

const applyPosition = ({top, left}: { top: number, left: number }) => {
    parallaxEl.forEach(el => el.style.objectPosition = `${left}% ${top}%`)
}

const findDesiredPosition = () => {
    const topPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    let top = lerp(MIN_TOP, MAX_TOP, topPercentage)
     // handle one-screen pages
     if(document.body.scrollHeight <= window.innerHeight) {
        top = MIN_TOP
    }
    const leftPercentage = lastMouseX / window.innerWidth
    const left = lerp(45, 55, leftPercentage)
    const mouseTopPercentage = lastMouseY / window.innerHeight

    const mouseContribution = lerp(-1, 1, mouseTopPercentage)

    top += mouseContribution

    return { top, left }
}

const scrollHandler = () => {
    applyPosition(findDesiredPosition())
}

const mouseHandler = (event: MouseEvent) => {
    lastMouseX = event.clientX
    lastMouseY = event.clientY
    applyPosition(findDesiredPosition())
}

const animateFrom = (top: number, left: number) => {
    let currentTop = top;
    let currentLeft = left;

    const { top: desiredTop, left: desiredLeft } = findDesiredPosition();

    const animationLength = 355;
    const animationStep = 1000/144;
    const alphaPerStep = 1 / (animationLength / animationStep);

    let interval = setInterval(() => {
        console.log('meow')
        currentTop = lerp(currentTop, desiredTop, alphaPerStep)
        currentLeft = lerp(currentLeft, desiredLeft, alphaPerStep)

        applyPosition({ top: currentTop, left: currentLeft })

        if(Math.abs(currentTop - desiredTop) < 0.01 && Math.abs(currentLeft - desiredLeft) < 0.01) {
            applyPosition({ top: desiredTop, left: desiredLeft })
            clearInterval(interval)
        }
    }, animationLength)
}

document.addEventListener("scroll", scrollHandler, { passive: true })

document.addEventListener("mousemove", mouseHandler, { passive: true })

document.addEventListener("DOMContentLoaded", () => {
    // parallaxEl = [...document.querySelectorAll(".background-parallax")!] as HTMLElement[]
    // const timeouts = parallaxEl.map(el => setTimeout(() => {
    //     el.style.opacity = "0.5"
    //     console.log('timeout')
    // }, 300)) // if it isn't loaded after 300ms we have some serious issue anyways and i don't care about how it looks
    // parallaxEl.forEach((el, i) => el.onload = () => {
    //     clearTimeout(timeouts[i])
    //     el.style.opacity = "0.5"
    //     console.log('loaded')
    // })
    
    applyPosition(findDesiredPosition())
})

document.addEventListener("nav", () => {
    parallaxEl = [...document.querySelectorAll(".background-parallax")!] as HTMLElement[]
    // const currentTop = parseFloat(parallaxEl.style.backgroundPositionY.replace("%","") || "0")
    // const currentLeft = parseFloat(parallaxEl.style.backgroundPositionX.replace("%","") || "0")
    //animateFrom(currentTop, currentLeft)
    applyPosition(findDesiredPosition())
})

