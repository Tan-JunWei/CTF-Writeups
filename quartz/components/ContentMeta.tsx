import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

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
    const text = fileData.text;
  
    if (text) {
      const segments: JSX.Element[] = [];
  
      if (fileData.dates) {
        const formattedDate = (
          <div key="date">
            Last updated on {formatDate(getDate(cfg, fileData)!, cfg.locale)}
          </div>
        );
        segments.push(formattedDate);
      }
  
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text);

        const wordAndTime = (
          <div key="wordAndTime">
            <span>{_words} words, </span>
            <span>{i18n(cfg.locale).components.contentMeta.readingTime({
              minutes: Math.ceil(minutes),
            })}</span>
          </div>
        );
  
        segments.push(wordAndTime);
      }
  
      return (
        <div className={classNames(displayClass, "content-meta")}>
          {segments}
        </div>
      );
    } else {
      return null;
    }
  }  

  // function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
  //   const text = fileData.text

  //   if (text) {
  //     const segments: (string | JSX.Element)[] = []

  //     if (fileData.dates) {
  //       const formattedDate = (
  //         <div key="date">
  //           Last updated on {formatDate(getDate(cfg, fileData)!, cfg.locale)}
  //         </div>
  //       );
  //       // const formattedDate = `Last updated on ${formatDate(getDate(cfg, fileData)!, cfg.locale)}`

  //       segments.push(formattedDate)
  //       // segments.push(formatDate(getDate(cfg, fileData)!, cfg.locale)) Changed so that it shows "Last updated on"
  //     }

  //     if (options.showReadingTime) {
  //       const { minutes, words: _words } = readingTime(text)
  //       const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
  //         minutes: Math.ceil(minutes),
  //       })
  //       const wordCount = `${_words} words, `;  // Changed so that it shows the word count

  //       segments.push(wordCount, displayedTime)
  //     }

  //     const segmentsElements = segments.map((segment) => <span>{segment}</span>)

  //     return (
  //       <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
  //         {segmentsElements}
  //       </p>
  //     )
  //   } else {
  //     return null
  //   }
  // }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
