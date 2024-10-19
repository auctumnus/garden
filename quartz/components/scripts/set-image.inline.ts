const isDark = window.matchMedia('(prefers-color-scheme: dark)')
export const si = (derivedTheme: string) => {
    let el = document.querySelector<HTMLImageElement>(`.background-parallax.${derivedTheme}`)!
   if(!el.src) {
    el.src = el.getAttribute('data-src')!
   }
   // @ts-ignore
   el.onload=()=>{el.style.opacity=.5}
}

export const setImage = () => {
   const theme = document.documentElement.getAttribute('saved-theme') as 'dark' | 'light' | 'auto'
   const derivedTheme = theme === 'auto' ? (isDark.matches ? 'dark' : 'light') : theme
   si(derivedTheme)
}