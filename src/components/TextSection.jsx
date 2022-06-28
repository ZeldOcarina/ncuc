import React from "react"
import styled from "styled-components"
import CopySection from "./CopySection"
import IntroSection from "./IntroSection"

const StyledTextSection = styled.section``

const TextSection = ({ superheading, heading, subheading, copy, columns }) => {
  return (
    <StyledTextSection>
      <div className="container">
        <IntroSection
          superheading={superheading}
          subheading={subheading}
          heading={heading}
        />
        <CopySection columns={columns || 2}>{copy}</CopySection>
      </div>
    </StyledTextSection>
  )
}

export default TextSection
