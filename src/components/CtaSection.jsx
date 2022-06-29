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
        background-color: orange;
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
  return (
    <StyledCtaSection>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
          theme="light"
        />
        <CopySection columns={1} theme="light">
          {copy}
        </CopySection>
        <div className="buttons-container">
          <Button color={Colors.colorPrimary} type="button" width="35rem">
            {buttonLabel}
          </Button>
        </div>
      </div>
      <BackgroundImage
        image={getImage(backgroundImage.localFiles[0])}
        alt=""
        role="decoration"
      />
    </StyledCtaSection>
  )
}

export default CtaSection
