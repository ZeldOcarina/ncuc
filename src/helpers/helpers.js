import MarkdownParser from "./MarkdownParser"

export const setColumns = function (isPhonePort, columns) {
    if (isPhonePort) return 1
    if (columns) return columns
    else return 2
}

export const shadeColor = function shadeColor(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    /* eslint eqeqeq: 0 */
    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    /* eslint eqeqeq: 0 */
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    /* eslint eqeqeq: 0 */
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

export const hexToRGB = function (hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha || alpha === 0) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export const parseMarkdown = ({ inputMarkdown, businessName, businessAddress, zipCode, city, state, businessEmail, tel, phone, siteUrl }) => {
    const markdownParser = new MarkdownParser({ inputMarkdown, businessName, businessAddress, zipCode, city, state, businessEmail, tel, phone, siteUrl });
    return markdownParser.parseHtml();
}

export const findNextItem = (itemsArray, currentRowNumber) => {
    return itemsArray.find(item => item.data.rowNumber === currentRowNumber + 1)
}