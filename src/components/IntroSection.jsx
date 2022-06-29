import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"
import PropTypes from "prop-types"

const StyledIntroSection = styled.section`
  text-align: center;
  margin: 0 auto var(--section-gutter) auto;
  padding-bottom: ${({ padding }) => {
    return padding || padding === 0 ? `${padding}rem` : `var(--gutter)`
  }};
  ${({ noPaddingTop }) => noPaddingTop && "padding-top: 0;"}

  ${respond(
    "iphone-12-mini-land",
    css`
      margin-bottom: 3rem;
    `
  )}

  h3 {
    color: var(--color-secondary);
    text-transform: uppercase;
    text-align: center;
    font-size: 2rem;

    ${respond(
      "iphone-8-plus-land",
      css`
        font-size: 1.8rem;
      `
    )}
    ${respond(
      "phone-port",
      css`
        font-size: 1.6rem;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        font-size: 3rem;
      `
    )}
  }

  h2,
  p {
    margin-left: auto;
    margin-right: auto;
    color: ${({ theme }) =>
      theme && theme === "light" ? css`var(--white)` : css`var(--grey500)`};
  }

  h2 {
    text-transform: uppercase;
    font-weight: 300;
    line-height: 1.5;
    font-size: 3.5rem;

    margin: var(--gutter) auto;
    width: 85%;

    ${respond(
      "iphone-8-plus-land",
      css`
        font-size: 3rem;
      `
    )}
    ${respond(
      "iphone-12-mini-land",
      css`
        width: 95%;
        font-size: 2.8rem;
      `
    )}
    ${respond(
      "phone-port",
      css`
        width: 100%;
        font-size: 2.5rem;
        margin-top: 1rem;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        font-size: 6rem;
      `
    )}
  }

  p {
    font-weight: 400;
    font-size: 1.6rem;
    margin: 0 auto;
    text-align: left;
    width: 84%;

    ${respond(
      "iphone-12-mini-land",
      css`
        width: 90%;
        font-size: 1.4rem;
      `
    )}
    ${respond(
      "phone-port",
      css`
        font-size: 1.3rem;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        font-size: 2.5rem;
      `
    )}
  }
`

const IntroSection = ({
  superheading,
  heading,
  subheading,
  padding,
  theme,
  noPaddingTop,
}) => {
  return (
    <StyledIntroSection
      padding={padding}
      theme={theme}
      noPaddingTop={noPaddingTop}
    >
      {superheading && <h3>{superheading}</h3>}
      <h2>{heading}</h2>
      <p>{subheading}</p>
    </StyledIntroSection>
  )
}

IntroSection.propTypes = {
  superheading: PropTypes.string,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  padding: PropTypes.number,
  theme: PropTypes.string,
}

export default IntroSection
