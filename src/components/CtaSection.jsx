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
  image,
  buttonLink,
  useButtonLink,
}) => {
  return (
    <StyledCtaSection image={image} id="cta">
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
          theme={image ? "light" : "dark"}
          noPaddingTop={!!image}
          whiteSuperTitle
        />
        <CopySection columns={1} theme={image ? "light" : "dark"}>
          {copy}
        </CopySection>
        <div className="buttons-container">
          {useButtonLink ? (
            <a className="button" href={buttonLink}>
              {buttonLabel}
            </a>
          ) : (
            <Button
              color="primary"
              type="internal"
              width="35rem"
              url="/contact-us"
            >
              {buttonLabel}
            </Button>
          )}
        </div>
      </div>
      {image && (
        <img className="bg-image" src={image} alt="" role="presentation" />
      )}
    </StyledCtaSection>
  )
}

export default CtaSection
