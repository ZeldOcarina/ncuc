import { createGlobalStyle } from "styled-components"

import thinSfPro from "../../fonts/SF-Pro-Display-Thin.otf"
import regularSfPro from "../../fonts/SF-Pro-Display-Regular.otf"
import lightSfProItalic from "../../fonts/SF-Pro-Display-LightItalic.otf"
import lightSfPro from "../../fonts/SF-Pro-Display-Light.otf"
import boldSfPro from "../../fonts/SF-Pro-Display-Bold.otf"

export default createGlobalStyle`
    @font-face {
        font-family: "SF Pro Display";
        src: url(${thinSfPro}) format("opentype");
        font-weight: 200;
    }
    @font-face {
        font-family: "SF Pro Display";
        src: url(${lightSfPro}) format("opentype");
        font-weight: 300;
    }

    @font-face {
        font-family: "SF Pro Display";
        src: url(${lightSfProItalic}) format("opentype");
        font-weight: 300;
        font-style: italic;
    }

    @font-face {
        font-family: "SF Pro Display";
        src: url(${regularSfPro}) format("opentype");
        font-weight: 500;
    }

    @font-face {
        font-family: "SF Pro Display";
        src: url(${boldSfPro}) format("opentype");
        font-weight: 700;
    }
`
