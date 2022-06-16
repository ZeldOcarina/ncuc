import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

import IntroSection from "../../components/IntroSection"
import CopySection from "../../components/CopySection"

const StyledSupport = styled.section``

const Support = () => {
  const {
    intro: {
      data: { copy, header, intro, subheading },
    },
  } = useStaticQuery(query)
  return (
    <StyledSupport>
      <div className="container">
        <IntroSection title={header} subtitle={subheading} intro={intro} />
        <CopySection>{copy}</CopySection>
      </div>
    </StyledSupport>
  )
}

const query = graphql`
  query Support {
    intro: airtable(
      table: { eq: "Home" }
      data: { blockName: { eq: "Support" } }
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

export default Support
