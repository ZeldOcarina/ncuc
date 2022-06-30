import React from "react"
import styled, { css } from "styled-components"
import { getImage } from "gatsby-plugin-image"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "./IntroSection"
import CopySection from "./CopySection"
import BackgroundImage from "./BackgroundImage"
import Button from "./Button"

import { Colors } from "../styles/abstracts/abstracts"

const StyledCtaSection = styled.section`
  position: relative;
  ${({ image }) => {
    return (
      !image &&
      css`
        background-color: var(--background-color);
      `
    )
  }}

  a {
    color: ${({ image }) =>
      image ? css`var(--white)` : css`var(--body-color)`};
  }

  .buttons-container {
    display: grid;
    grid-template-columns: max-content max-content;
    justify-items: center;
    width: max-content;
    margin: 0 auto;
    gap: var(--gutter);
    margin-top: 7rem;

    ${respond(
      "phone-port",
      css`
        grid-template-columns: 1fr;
      `
    )}
  }

  .container {
    position: relative;
    z-index: 100;
  }
`

const CtaSection = ({
  superheading,
  heading,
  subheading,
  copy,
  buttonLabel,
  backgroundImage,
}) => {
  const image = getImage(backgroundImage?.localFiles[0])

  return (
    <StyledCtaSection image={image}>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
          theme={image ? "light" : "dark"}
          noPaddingTop={!!image}
        />
        <CopySection columns={1} theme={image ? "light" : "dark"}>
          {copy}
        </CopySection>
        <div className="buttons-container">
          <Button color={Colors.colorPrimary} type="button" width="35rem">
            {buttonLabel}
          </Button>
        </div>
      </div>
      {image && <BackgroundImage image={image} alt="" role="decoration" />}
    </StyledCtaSection>
  )
}

export default CtaSection
