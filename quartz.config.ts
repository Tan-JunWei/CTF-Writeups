import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
*/
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Blog",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://tan-junwei.github.io/cybersecurity-blog",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Tomorrow",
        // header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          // light: "#faf8f8",
          light: "#f5f6f9",
          lightgray: "#e1e1e1",
          // gray: "#b8b8b8",
          gray: "#9e9e9e",
          // darkgray: "#4e4e4e",
          darkgray: "#404040",
          dark: "#2b2b2b",
          secondary: "#284b63",
          // tertiary: "#84a59d",
          tertiary: "#886ecf",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
          lighterLight: "rgba(245, 246, 249, 0.8)", // For image zoom background
        },
        darkMode: {
          // light: "#161618",
          // light: "#0d1117",
          light: "#0e1319",
          // lightgray: "#393639",
          lightgray: "#474547",
          // gray: "#646464",
          gray: "#8a8a8a",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          // secondary: "#7b97aa",
          secondary: "#76a1c4",
          // tertiary: "#84a59d",
          tertiary: "#ada1ed",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
          lighterLight: "rgba(14, 19, 25, 0.8)", // For image zoom background
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["git","filesystem","frontmatter"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.MediumZoom(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
