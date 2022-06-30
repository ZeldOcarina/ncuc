import React, { useContext } from "react"
import styled from "styled-components"
import CopySection from "./CopySection"
import IntroSection from "./IntroSection"
import AppContext from "../context/AppContext"

const StyledTextSection = styled.section``

const TextSection = ({ superheading, heading, subheading, copy, columns }) => {
  const { isPhone12ProMax } = useContext(AppContext)

  function setColumns() {
    if (isPhone12ProMax) return 1
    if (columns) return columns
    else return 2
  }
  return (
    <StyledTextSection>
      <div className="container">
        <IntroSection
          superheading={superheading}
          subheading={subheading}
          heading={heading}
        />
        <CopySection columns={setColumns()}>{copy}</CopySection>
      </div>
    </StyledTextSection>
  )
}

export default TextSection
