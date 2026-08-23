import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.PrevNextNav(),
    Component.BackToTop(),
    Component.CodeLanguageLabel(),
    Component.DynamicDate(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Tan-JunWei/CTF-Writeups",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ReadingProgress(),
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.ExplorerToggle(),
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({ components: [Component.Darkmode(), Component.Search()] }),
    // Component.RecentNotes({ title: "Recently Updated", limit: 2, showTags: false}),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.ExplorerToggle(),
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({ components: [Component.Darkmode(), Component.Search()] }),
    Component.Explorer(),
  ],
  right: [],
}
