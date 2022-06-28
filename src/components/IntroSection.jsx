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
  h3 {
    color: var(--color-secondary);
    text-transform: uppercase;
    text-align: center;
    font-size: 2rem;

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
}) => {
  return (
    <StyledIntroSection padding={padding} theme={theme}>
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
