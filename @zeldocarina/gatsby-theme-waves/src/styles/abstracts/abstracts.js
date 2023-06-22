import { createGlobalStyle } from "styled-components"

export const Colors = {
  bodyBackground: "#FFFFFF",
  backgroundDark: "#EDEFEF",
  bodyColor: "#6B6E7E",
  colorPrimary: "#2B3990",
  colorPrimary700: "#222741",
  colorSecondary: "#16B0D8",
  colorSecondary200: "#AFDFE4",
  colorTertiary: "#EF4136",
  grey: "#707070",
  grey500: "#6B6E7E",
  black: "#000000",
  white: "#ffffff",
}

export default createGlobalStyle`
  :root {
      // COLORS
    --body-background: ${Colors.bodyBackground};
    --background-dark: ${Colors.backgroundDark};
    --body-color: ${Colors.bodyColor};
    --color-primary: ${Colors.colorPrimary};
    --color-primary-700: ${Colors.colorPrimary700};
    --color-secondary: ${Colors.colorSecondary};
    --color-secondary200: ${Colors.colorSecondary200};
    --color-tertiary: ${Colors.colorTertiary};
    --grey: ${Colors.grey}; /*USED BY BLOCKQUOTE*/
    --grey500: ${Colors.grey500}; /*USED BY BLOCKQUOTE*/
    --black: ${Colors.black};
    --white: ${Colors.white};
    
    --gutter: 2rem;
    --small-gutter: 1rem;
    --big-gutter: 4rem;
    --section-gutter: 6rem;

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
