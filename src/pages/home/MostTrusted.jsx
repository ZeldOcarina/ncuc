import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

import IntroSection from "../../components/IntroSection"
import CopySection from "../../components/CopySection"

const StyledMostTrusted = styled.section``

const MostTrusted = () => {
  const {
    intro: {
      data: { copy, header, intro, subheading },
    },
  } = useStaticQuery(query)
  return (
    <StyledMostTrusted>
      <div className="container">
        <IntroSection title={header} subtitle={subheading} intro={intro} />
        <CopySection>{copy}</CopySection>
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
        header
        intro
        subheading
      }
    }
  }
`

export default MostTrusted
