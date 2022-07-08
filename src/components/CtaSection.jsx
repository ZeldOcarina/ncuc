import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "./IntroSection"
import CopySection from "./CopySection"
import Button from "./Button"

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

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
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
  const realImage = backgroundImage?.localFiles[0]?.publicURL

  return (
    <StyledCtaSection image={realImage}>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
          theme={realImage ? "light" : "dark"}
          noPaddingTop={!!realImage}
        />
        <CopySection columns={1} theme={realImage ? "light" : "dark"}>
          {copy}
        </CopySection>
        <div className="buttons-container">
          <Button
            color="primary"
            type="internal"
            width="35rem"
            url="/contact-us"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
      {realImage && (
        <img className="bg-image" src={realImage} alt="" role="presentation" />
      )}
    </StyledCtaSection>
  )
}

export default CtaSection
