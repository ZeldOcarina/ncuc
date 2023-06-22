export function parseShortcodes(pageShortcodes, globalShortcodes) {
    const rawShortcodes =
        pageShortcodes && pageShortcodes.length > 0
            ? pageShortcodes.pageShortcodes
            : globalShortcodes

    const parsedShortcodes = rawShortcodes?.map(item => {
        return {
            shortcode: item.data.Shortcodes,
            data: item.data.Value,
        }
    })

    return parsedShortcodes
}