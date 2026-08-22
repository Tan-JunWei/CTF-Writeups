import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

import style from "../styles/treeList.scss"
// @ts-ignore
import script from "../scripts/folderTree.inline"
import { FileNode } from "../ExplorerNode"
import { ChevronIcon, FileIcon, FolderIcon, HomeIcon } from "../treeIcons"
import {
  SimpleSlug,
  getAllSegmentPrefixes,
  joinSegments,
  resolveRelative,
  simplifySlug,
  stripSlashes,
} from "../../util/path"
import { QuartzPluginData } from "../../plugins/vfile"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"

interface FolderContentOptions {
  /**
   * Whether to display the number of items nested under each folder in the tree
   */
  showFileCount: boolean
}

const defaultOptions: FolderContentOptions = {
  showFileCount: true,
}

// folders first, then alphabetical
function compareNodes(a: FileNode, b: FileNode): number {
  if ((!a.file && !b.file) || (a.file && b.file)) {
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }

  return a.file ? 1 : -1
}

function countFiles(node: FileNode): number {
  if (node.file) return 1
  return node.children.reduce((sum, child) => sum + countFiles(child), 0)
}

type Crumb = { name: string; path: string }

// walks the tree down the current folder's path, collecting each
// ancestor's display name, for the trail highlight and the breadcrumb line
function getAncestorTrail(fileTree: FileNode, folderSlug: string): Crumb[] {
  const trail: Crumb[] = []
  let node = fileTree
  let path = ""
  for (const segment of folderSlug.split("/")) {
    const child: FileNode | undefined = node.children.find((c) => c.name === segment)
    if (!child) break
    path = joinSegments(path, segment)
    trail.push({ name: child.displayName, path })
    node = child
  }
  return trail
}

type TreeNodeProps = {
  node: FileNode
  parentPath: string
  fileData: QuartzPluginData
  currentFolder: string
  onPath: Set<string>
  showFileCount: boolean
}

// renders a file or folder row, recursing into a folder's children. every
// folder on the path to the current one is expanded and highlighted, and
// clicking a row both selects that folder and toggles its branch open,
// same as the twisty. folder links skip the hover-preview popover since
// the tree already shows their contents inline.
function FolderTreeNode({
  node,
  parentPath,
  fileData,
  currentFolder,
  onPath,
  showFileCount,
}: TreeNodeProps) {
  const folderPath = joinSegments(parentPath, node.name)

  if (node.file) {
    return (
      <li>
        <a
          href={resolveRelative(fileData.slug!, node.file.slug!)}
          class="internal tree-row tree-file"
        >
          <FileIcon />
          <span class="tree-name">{node.displayName}</span>
        </a>
      </li>
    )
  }

  const isOnPath = onPath.has(folderPath)
  const isCurrent = folderPath === currentFolder
  const href = resolveRelative(fileData.slug!, folderPath as SimpleSlug) + "/"
  const fileCount = countFiles(node)

  return (
    <li class="tree-node">
      <div class="tree-row-wrap">
        <button
          type="button"
          class="tree-toggle"
          aria-expanded={isOnPath}
          aria-label={`Toggle ${node.displayName}`}
        >
          <ChevronIcon />
        </button>
        <a
          href={href}
          class={`internal tree-row tree-branch${isOnPath ? " on-path" : ""}${isCurrent ? " current" : ""}`}
          data-no-popover="true"
        >
          <FolderIcon />
          <span class="tree-name">{node.displayName}</span>
          {showFileCount && fileCount > 0 && <span class="tree-meta">{fileCount}</span>}
        </a>
      </div>
      <div class={`tree-children${isOnPath ? " open" : ""}`}>
        <ul>
          {node.children.map((child, i) => (
            <FolderTreeNode
              key={i}
              node={child}
              parentPath={folderPath}
              fileData={fileData}
              currentFolder={currentFolder}
              onPath={onPath}
              showFileCount={showFileCount}
            />
          ))}
        </ul>
      </div>
    </li>
  )
}

export default ((opts?: Partial<FolderContentOptions>) => {
  const options: FolderContentOptions = { ...defaultOptions, ...opts }

  const FolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles } = props
    const folderSlug = stripSlashes(simplifySlug(fileData.slug!))

    // full site tree, same shape as the sidebar Explorer. every top-level
    // section is shown, not just the current one, unrelated ones just start
    // collapsed like any other folder
    const fileTree = new FileNode("")
    allFiles.forEach((file) => fileTree.add(file))
    // drop the tags branch and the empty-name node FileNode.insert() adds
    // as a side effect of indexing the root's own index.md
    fileTree.filter((node) => node.name !== "tags" && node.name !== "")
    fileTree.sort(compareNodes)

    // every folder from root to the current one, expanded and highlighted
    const onPath = new Set<string>(getAllSegmentPrefixes(folderSlug))
    const trail = getAncestorTrail(fileTree, folderSlug)

    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = ["popover-hint", ...cssClasses].join(" ")

    const content =
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)

    const homeHref = resolveRelative(fileData.slug!, "/" as SimpleSlug)

    return (
      <div class={classes}>
        <article>{content}</article>
        <div class="tree-page">
          <div class="tree-trail">
            <a href={homeHref} class="internal tree-trail-link" data-no-popover="true">
              Home
            </a>
            {trail.map((crumb, i) => (
              <>
                <span class="tree-trail-sep">/</span>
                <a
                  href={resolveRelative(fileData.slug!, crumb.path as SimpleSlug) + "/"}
                  class={`internal tree-trail-link${i === trail.length - 1 ? " current" : ""}`}
                  data-no-popover="true"
                >
                  {crumb.name}
                </a>
              </>
            ))}
          </div>
          <ul class="tree-root">
            <li>
              <a href={homeHref} class="internal tree-row on-path" data-no-popover="true">
                <HomeIcon />
                <span class="tree-name">Home</span>
              </a>
            </li>
            {fileTree.children.map((child, i) => (
              <FolderTreeNode
                key={i}
                node={child}
                parentPath=""
                fileData={fileData}
                currentFolder={folderSlug}
                onPath={onPath}
                showFileCount={options.showFileCount}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  FolderContent.css = style
  FolderContent.afterDOMLoaded = script
  return FolderContent
}) satisfies QuartzComponentConstructor
