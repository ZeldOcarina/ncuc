import { useContext } from "react"

import ShortcodesContext from "../context/ShortcodesContext"
import AppContext from "../context/AppContext"
import { parseShortcodes } from "../helpers/parseShortcodes"

function useShortcodes() {
  const pageShortcodes = useContext(ShortcodesContext)
  const { globalShortcodes } = useContext(AppContext)

  const parsedShortcodes = parseShortcodes(pageShortcodes, globalShortcodes)

  return parsedShortcodes
}

export default useShortcodes
