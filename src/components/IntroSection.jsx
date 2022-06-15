import React from "react"
import styled from "styled-components"

const StyledIntroSection = styled.section`
  text-align: center;
  margin: 0 auto var(--section-gutter) auto;

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
  }

  h2 {
    text-transform: uppercase;
    font-weight: 300;
    line-height: 1.5;
    font-size: 3.5rem;
    color: var(--grey);
    margin: var(--gutter) auto;
    width: 85%;
  }

  p {
    color: var(--grey500);
    font-weight: 400;
    font-size: 1.6rem;
    margin: 0 auto;
    text-align: left;
    width: 84%;
  }
`

const IntroSection = ({ title, subtitle, intro }) => {
  return (
    <StyledIntroSection>
      <h3>{subtitle}</h3>
      <h2>{title}</h2>
      <p>{intro}</p>
    </StyledIntroSection>
  )
}

export default IntroSection
