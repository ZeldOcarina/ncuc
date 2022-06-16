import React from "react"
import styled, { css } from "styled-components"
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
  }

  p {
    font-weight: 400;
    font-size: 1.6rem;
    margin: 0 auto;
    text-align: left;
    width: 84%;
  }
`

const IntroSection = ({ title, subtitle, intro, padding, theme }) => {
  return (
    <StyledIntroSection padding={padding} theme={theme}>
      <h3>{subtitle}</h3>
      <h2>{title}</h2>
      <p>{intro}</p>
    </StyledIntroSection>
  )
}

IntroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  intro: PropTypes.string,
  padding: PropTypes.number,
  theme: PropTypes.string,
}

export default IntroSection
