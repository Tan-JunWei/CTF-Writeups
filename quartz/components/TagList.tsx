import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const hash32 = (s: string) => {
  let h = 0x811c9d5 >>> 0
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0

    h = (h << 12 | h >>> 18) >>> 0

    h ^= h >>> 16;
    h = Math.imul(h, 0x85ebca6b) >>> 0;
    h ^= h >>> 13;
    h = Math.imul(h, 0xc2b2ae35) >>> 0;
    h ^= h >>> 16;
  }
  return h >>> 0
}

// Golden-angle spacing in [0, 360)
const hueFromString = (s: string) => {
  const golden = 0.61803398875
  const u = (hash32(s) / 0xffffffff) 
  const h = ((u + golden) % 1) * 360
  return h
}

const compensatedLightness = (h: number) => {
  let L = 55; 

  const H = ((h % 360) + 360) % 360;

  const ease = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);

  function w(h0: number, h1: number, feather = 8) {
    const inRange = (x: number) =>
      h0 <= h1 ? (x >= h0 && x <= h1) : x >= h0 || x <= h1;

    if (!inRange(H)) return 0;

    const distStart = (H - h0 + 360) % 360;
    const distEnd = (h1 - H + 360) % 360;

    if (distStart > feather && distEnd > feather) return 1;

    const t = distStart <= feather ? distStart / feather : distEnd / feather;
    return ease(t);
  }

  L += -1.2 * w(50, 90);
  L += -1.2 * w(90, 140);
  L += +2.0 * w(200, 250);
  L += +2.3 * w(250, 290);
  L += +0.8 * w(340, 360);
  L += +0.8 * w(0, 20);

  L = Math.min(65, Math.max(50, L));

  return L;
};

const colorForTag = (tag: string) => {
  const avoidStart = 200;
  const avoidEnd = 290;

  const norm = (x: number) => ((x % 360) + 360) % 360;
  const inAvoid = (h: number) =>
    avoidStart <= avoidEnd ? (h >= avoidStart && h <= avoidEnd)
                           : (h >= avoidStart || h <= avoidEnd);

  let h0 = hueFromString(tag);
  let h = h0;

  h = norm(h0 + (Math.random() - 0.5) * 20);

  if (inAvoid(h)) {
    const distToStart = (h - avoidStart + 360) % 360;
    const distToEnd   = (avoidEnd - h + 360) % 360;
    h = distToStart < distToEnd ? avoidStart - 5 : avoidEnd + 5;
    h = norm(h);
  }

  const s = 62;
  let l = compensatedLightness(h);
  l = Math.min(60, Math.max(50, l)); 

  const text = `hsl(${h.toFixed(2)} ${s}% ${l}% / 1)`;
  const bg   = `hsl(${h.toFixed(2)} ${s}% ${l}% / 0.14)`;
  return { text, bg };
};

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  const baseDir = pathToRoot(fileData.slug!)
  if (!tags || tags.length === 0) return null
  if (fileData.frontmatter?.showTags === false) return null

  return (
    <ul class={classNames(displayClass, "tags")}>
      {tags.map((tag) => {
        const linkDest = baseDir + `/tags/${slugTag(tag)}`
        const { text, bg } = colorForTag(tag)
        // expose colors as CSS variables (global to the element), not inline 'color'
        const style = {
          // TSX: allow custom properties
          ["--tag-color" as any]: text,
          ["--tag-bg" as any]: bg,
        }
        return (
          <li>
            <a href={linkDest} class="internal tag-link" style={style}>
              {tag}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-self: end;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}

.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  --tag-color: hsl(190 60% 35% / 1);     /* safe default */
  --tag-bg:    hsl(190 60% 35% / 0.12);  /* safe default */

  color: var(--tag-color);
  border: 1px solid var(--tag-color);
  background-color: var(--tag-bg);

  border-radius: 8px;
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
