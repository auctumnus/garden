import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"
import { differenceInDays, format } from "date-fns"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: JSX.Element[] = []

      if (fileData.dates) {
        const created = fileData.dates.created
        const modified = fileData.dates.modified

        const createdTitle = `Created on ${formatDate(created, cfg.locale)}`

        segments.push(<span aria-label={createdTitle} title={createdTitle}>
          <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M13 3a1 1 0 1 0-2 0v.5a1 1 0 1 0 2 0zm-8.5 9a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h.5a1 1 0 0 1 1 1M22 12a1 1 0 0 1-1 1h-.5a1 1 0 1 1 0-2h.5a1 1 0 0 1 1 1m-10 7.5a1 1 0 0 1 1 1v.5a1 1 0 1 1-2 0v-.5a1 1 0 0 1 1-1m7.778-13.864a1 1 0 0 0-1.414-1.414l-2.121 2.12a1 1 0 1 0 1.414 1.415zM7.758 16.243a1 1 0 0 1 0 1.414L5.635 19.78a1 1 0 0 1-1.414-1.415l2.121-2.12a1 1 0 0 1 1.414 0M5.635 4.222a1 1 0 0 0-1.414 1.414l2.12 2.121a1 1 0 0 0 1.415-1.414zm10.607 12.021a1 1 0 0 1 1.414 0l2.121 2.121a1 1 0 1 1-1.414 1.415l-2.121-2.122a1 1 0 0 1 0-1.414M12.948 6.14a1 1 0 0 0-1.888 0a8.02 8.02 0 0 1-4.92 4.92a1 1 0 0 0 0 1.888a8.03 8.03 0 0 1 4.92 4.92a1 1 0 0 0 1.888 0a8.03 8.03 0 0 1 4.92-4.92a1 1 0 0 0 0-1.888a8.03 8.03 0 0 1-4.92-4.92m-.944 9.094a10.05 10.05 0 0 0-3.23-3.23a10.05 10.05 0 0 0 3.23-3.23a10.05 10.05 0 0 0 3.23 3.23a10.05 10.05 0 0 0-3.23 3.23"/></g></svg>
          {format(created, "yyyy-MM-dd")}
        </span>)

        if(modified && (differenceInDays(modified, created) > 0)) {
          const modifiedTitle = `Last modified on ${formatDate(modified, cfg.locale)}`
          segments.push(<span aria-label={modifiedTitle} title={modifiedTitle}>
            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg>
            {format(modified, "yyyy-MM-dd")}
          </span>)
        }
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>
          <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M10 3q-.425 0-.712-.288T9 2t.288-.712T10 1h4q.425 0 .713.288T15 2t-.288.713T14 3zm2 11q.425 0 .713-.288T13 13V9q0-.425-.288-.712T12 8t-.712.288T11 9v4q0 .425.288.713T12 14m0 8q-1.85 0-3.488-.712T5.65 19.35t-1.937-2.863T3 13t.713-3.488T5.65 6.65t2.863-1.937T12 4q1.55 0 2.975.5t2.675 1.45l.7-.7q.275-.275.7-.275t.7.275t.275.7t-.275.7l-.7.7Q20 8.6 20.5 10.025T21 13q0 1.85-.713 3.488T18.35 19.35t-2.863 1.938T12 22m0-2q2.9 0 4.95-2.05T19 13t-2.05-4.95T12 6T7.05 8.05T5 13t2.05 4.95T12 20m0-7"/></svg>
          {displayedTime}
        </span>)
        segments.push(<span>
          <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 15q-.425 0-.712-.288T16 14v-4q0-.425.288-.712T17 9h3q.425 0 .713.288T21 10v1h-1.5v-.5h-2v3h2V13H21v1q0 .425-.288.713T20 15zm-7.5 0V9h4q.425 0 .713.288T14.5 10v1q0 .425-.288.713T13.5 12q.425 0 .713.288T14.5 13v1q0 .425-.288.713T13.5 15zm1.5-3.75h2v-.75h-2zm0 2.25h2v-.75h-2zM3 15v-5q0-.425.288-.712T4 9h3q.425 0 .713.288T8 10v5H6.5v-1.5h-2V15zm1.5-3h2v-1.5h-2z"/></svg>
          {words + " word" + (words === 1 ? "" : "s")}
        </span>)
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
