import React, { useContext } from "react"
import styled from "styled-components"
import CopySection from "./CopySection"
import IntroSection from "./IntroSection"
import AppContext from "../context/AppContext"

const StyledTextSection = styled.section``

const TextSection = ({ superheading, heading, subheading, copy, columns }) => {
  const { isPhonePort } = useContext(AppContext)

  console.log(isPhonePort)

  function setColumns() {
    if (isPhonePort) return 1
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
