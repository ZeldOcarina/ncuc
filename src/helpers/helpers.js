export const setColumns = function (isPhonePort, columns) {
    if (isPhonePort) return 1
    if (columns) return columns
    else return 2
}