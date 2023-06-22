import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import BackgroundImage from "./BackgroundImage"

const StyledInnerHero = styled.header`
  min-height: 88vh;
  background-color: var(--background-dark);
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;

  ${respond(
    "ipad-pro-12.9-land",
    css`
      min-height: 90vh;
    `
  )}
  ${respond(
    "ipad-pro-12-port",
    css`
      min-height: 92vh;
    `
  )}
  ${respond(
    "iphone-12-pro-land",
    css`
      min-height: 120vh;
    `
  )}
  ${respond(
    "iphone-12-pro-max",
    css`
      min-height: 85vh;
    `
  )}
  ${respond(
    "iphone-8-plus",
    css`
      min-height: 75vh;
    `
  )}

  .text-container {
    margin: 0;
    z-index: 10;
    position: absolute;
    bottom: 20rem;
    left: 20rem;
    text-transform: uppercase;
    max-width: 50%;

    ${respond(
      "notebook",
      css`
        bottom: 15rem;
        left: 15rem;
      `
    )}

    ${respond(
      "iphone-12-pro-land",
      css`
        bottom: 50%;
        left: 50%;
        transform: translate(-50%, 50%);
      `
    )}
    ${respond(
      "iphone-12-pro-max",
      css`
        max-width: 100%;
        width: 90%;
        bottom: 27rem;
      `
    )}

${respond(
      "iphone-8-plus",
      css`
        bottom: 15rem;
      `
    )}
  }

  h1 {
    color: var(--white);
    font-size: 4rem;
    line-height: 1.2;
    font-weight: 400;
    margin: 0;

    ${respond(
      "notebook",
      css`
        font-size: 4rem;
      `
    )}
  }

  p {
    color: var(--white);
    font-weight: 400;
    margin-top: var(--gutter);
    font-size: 1.5rem;
  }
`

const InnerHero = ({ data }) => {
  const image = data.Media.localFiles[0].publicURL

  return (
    <StyledInnerHero>
      <div className="text-container">
        <h1>{data.Heading}</h1>
        <p>{data.Subheading}</p>
      </div>
      <BackgroundImage
        image={image}
        alt={data.Heading}
        overlay={data.Overlay}
        isPlainImg
      />
    </StyledInnerHero>
  )
}

export default InnerHero
