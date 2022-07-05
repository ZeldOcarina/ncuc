import React, { useContext } from "react"
import styled from "styled-components"
import CopySection from "./CopySection"
import IntroSection from "./IntroSection"
import AppContext from "../context/AppContext"

import { setColumns } from "../helpers/helpers"

const StyledTextSection = styled.section``

const TextSection = ({ superheading, heading, subheading, copy, columns }) => {
  const { isPhonePort } = useContext(AppContext)

  return (
    <StyledTextSection>
      <div className="container">
        <IntroSection
          superheading={superheading}
          subheading={subheading}
          heading={heading}
        />
        <CopySection columns={setColumns(isPhonePort, columns)}>
          {copy}
        </CopySection>
      </div>
    </StyledTextSection>
  )
}

export default TextSection
