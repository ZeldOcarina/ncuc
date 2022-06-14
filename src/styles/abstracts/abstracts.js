import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  :root {
      // COLORS
    --body-background: #FFFFFF;
    --background-dark: #EDEFEF;
    --body-color: #6B6E7E;
    --color-primary: #2B3990;
    --color-primary-700: #222741;
    --color-secondary: #16B0D8;
    --color-secondary200: #AFDFE4;
    --color-tertiary: #EF4136;
    --grey: #646C83; /*USED BY BLOCKQUOTE*/
    --black: #000000;
    --white: #ffffff;

    //FONT FAMILY
    --title-font: "SF Pro Display", sans-serif;
    --body-font: "SF Pro Display", sans-serif;
    --bold: 700;

    // FONT-SIZES
    --basic-font-size: 1.8rem;
    --mobile-font-size: 1.5rem;

    --big-title: 4.8rem;
    --title-font-size: 2.8rem;
    --mobile-title-font-size: 3rem;
    --small-title: 2.5rem;
    --big-text: 2rem;
  }
`
