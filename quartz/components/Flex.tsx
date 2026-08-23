import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface FlexOptions {
  components: QuartzComponent[]
}

function wrapScript(script?: string): string {
  return script ? `;(function(){${script}})();` : ""
}

// renders a set of components on one row, layout arrays otherwise stack each on its own row
export default ((opts: FlexOptions) => {
  const Flex: QuartzComponent = ({ displayClass, ...rest }: QuartzComponentProps) => {
    return (
      <div class={classNames(displayClass, "flex-row")}>
        {opts.components.map((C, i) => (
          <C key={i} {...rest} />
        ))}
      </div>
    )
  }

  Flex.css = `
.flex-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
`
  Flex.css += opts.components.map((c) => c.css ?? "").join("\n")
  Flex.beforeDOMLoaded = opts.components.map((c) => wrapScript(c.beforeDOMLoaded)).join("\n")
  Flex.afterDOMLoaded = opts.components.map((c) => wrapScript(c.afterDOMLoaded)).join("\n")

  return Flex
}) satisfies QuartzComponentConstructor<FlexOptions>
