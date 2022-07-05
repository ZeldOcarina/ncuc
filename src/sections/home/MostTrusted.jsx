import React, { useContext } from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import AppContext from "../../context/AppContext"

import IntroSection from "../../components/IntroSection"
import CopySection from "../../components/CopySection"

import { setColumns } from "../../helpers/helpers"

const StyledMostTrusted = styled.section``

const MostTrusted = () => {
  const {
    intro: {
      data: { copy, superheading, heading, subheading },
    },
  } = useStaticQuery(query)

  const { isPhonePort } = useContext(AppContext)

  return (
    <StyledMostTrusted>
      <div className={"container"}>
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
        <CopySection columns={setColumns(isPhonePort)}>{copy}</CopySection>
      </div>
    </StyledMostTrusted>
  )
}

const query = graphql`
  query MostTrusted {
    intro: airtable(
      table: { eq: "Home" }
      data: { blockName: { eq: "MostTrusted" } }
    ) {
      data {
        copy
        superheading
        heading
        subheading
      }
    }
  }
`

export default MostTrusted
