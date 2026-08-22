import { createHighlighter } from "shiki"
import type { Highlighter } from "shiki"

/**
 * Custom TextMate patterns + theme colours layered on top of the base
 * VS Code (light-plus/dark-plus) themes so that ```console code fences
 * (Shiki's `shellsession` grammar, used for full terminal transcripts:
 * prompt + command + captured output) render like an actual terminal
 * instead of one flat, uncoloured block of text.
 *
 * The stock `shellsession` grammar only recognises single-line prompts like
 * `user@host:path$ cmd`. This site's writeups almost all use the two-line
 * "oh-my-zsh"/Kali-style prompt instead:
 *   ┌──(user㉿host)-[~/path]
 *   └─$ actual command
 * which falls entirely into the grammar's generic "output" bucket (so even
 * the command itself never gets highlighted). The two patterns below teach
 * it to recognise that shape, handing the real command off to the bundled
 * bash grammar (`source.shell`) so it still gets full, real syntax
 * highlighting - flags, strings, pipes, etc. Everything else (the box-drawing
 * chrome, and genuine captured output) gets a muted colour so it reads as
 * "terminal output", distinct from the command that produced it.
 */

// Matches the first line of the two-line prompt, e.g. `┌──(nepz㉿nepz)-[~]`
const kaliPromptFrameLine = {
  match: "^(┌──\\()(.+?)(\\)-\\[)(.*?)(\\])\\s*$",
  captures: {
    "1": { name: "punctuation.definition.prompt-frame.kali-session" },
    "2": { name: "entity.name.tag.prompt-user-host.kali-session" },
    "3": { name: "punctuation.definition.prompt-frame.kali-session" },
    "4": { name: "string.unquoted.prompt-path.kali-session" },
    "5": { name: "punctuation.definition.prompt-frame.kali-session" },
  },
}

// Matches the second line, e.g. `└─$ binwalk -e calming.jpg`. The command
// portion is embedded as real `source.shell` (bash) so it gets normal syntax
// highlighting rather than a single flat colour.
const kaliPromptCommandLine = {
  match: "^(└─)([$#])([ \\t]+)(.*)$",
  captures: {
    "1": { name: "punctuation.definition.prompt-frame.kali-session" },
    "2": { name: "keyword.operator.prompt-symbol.kali-session" },
    "4": { name: "source.shell", patterns: [{ include: "source.shell" }] },
  },
}

function terminalSessionTokenColors(mode: "light" | "dark") {
  const muted = mode === "light" ? "#767676" : "#9098a1"
  const userHost = mode === "light" ? "#0b6125" : "#89d185"
  const path = mode === "light" ? "#0451a5" : "#569cd6"
  const symbol = mode === "light" ? "#000000" : "#d4d4d4"
  return [
    {
      // Decorative box-drawing chrome, plus genuine captured output lines
      // that don't match either prompt pattern above
      scope: ["punctuation.definition.prompt-frame.kali-session", "meta.output.shell-session"],
      settings: { foreground: muted },
    },
    {
      // user@host, for both the two-line Kali prompt and the stock
      // single-line `user@host:path$ cmd` prompt
      scope: [
        "entity.name.tag.prompt-user-host.kali-session",
        "entity.other.prompt-prefix.shell-session",
      ],
      settings: { foreground: userHost },
    },
    {
      scope: "string.unquoted.prompt-path.kali-session",
      settings: { foreground: path },
    },
    {
      // The $/# prompt symbol itself, both prompt styles
      scope: [
        "keyword.operator.prompt-symbol.kali-session",
        "punctuation.separator.prompt.shell-session",
      ],
      settings: { foreground: symbol, fontStyle: "bold" },
    },
  ]
}

let cachedHighlighter: Promise<Highlighter> | undefined

/**
 * Drop-in replacement for rehype-pretty-code's default `getHighlighter`.
 * Builds the highlighter the same way it normally would, then layers the
 * terminal-session grammar/theme customisations above on top before handing
 * it back.
 */
export async function buildTerminalAwareHighlighter(options: {
  themes: unknown[]
  langs: unknown[]
}): Promise<Highlighter> {
  if (cachedHighlighter) return cachedHighlighter

  cachedHighlighter = (async () => {
    const highlighter = await createHighlighter({
      themes: options.themes as never[],
      langs: options.langs as never[],
    })

    for (const theme of options.themes) {
      if (typeof theme !== "string") continue
      const mode = theme === "light-plus" ? "light" : theme === "dark-plus" ? "dark" : undefined
      if (!mode) continue

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const baseModule: any = await import(`shiki/themes/${theme}.mjs`)
      const customTheme = structuredClone(baseModule.default)
      customTheme.name = theme
      customTheme.tokenColors = [
        ...(customTheme.tokenColors ?? []),
        ...terminalSessionTokenColors(mode),
      ]
      await highlighter.loadTheme(customTheme)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shellsessionBundle: any[] = (await import("shiki/langs/shellsession.mjs")).default
    const customBundle = structuredClone(shellsessionBundle)
    const topLang = customBundle.find((lang) => lang.name === "shellsession")
    if (topLang) {
      topLang.patterns = [kaliPromptFrameLine, kaliPromptCommandLine, ...(topLang.patterns ?? [])]
    }
    await highlighter.loadLanguage(customBundle as never)

    return highlighter
  })()

  return cachedHighlighter
}
