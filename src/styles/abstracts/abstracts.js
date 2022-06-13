import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  :root {
      // COLORS
    --body-background: #FFFFFF;
    --body-color: #3D4C55;
    --color-primary: #0074FF;
    --color-primary-dark: #111251;
    --color-secondary: #FEAF03;
    --color-tertiary: ##FD5E01;
    --grey: #646C83; /*USED BY BLOCKQUOTE*/
    --black: #000000;
    --white: #ffffff;

    //FONT FAMILY
    --title-font: "Kallisto", sans-serif;
    --body-font: "Poppins", sans-serif;
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
