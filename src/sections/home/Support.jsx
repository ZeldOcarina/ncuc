import React, { useContext } from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import AppContext from "../../context/AppContext"

import IntroSection from "../../components/IntroSection"
import CopySection from "../../components/CopySection"

const StyledSupport = styled.section`
  .phone-container {
    width: 90%;
    margin: 0 auto;
  }
`

const Support = () => {
  const { isiPhone12Land } = useContext(AppContext)
  const {
    intro: {
      data: { copy, superheading, heading, subheading },
    },
  } = useStaticQuery(query)
  return (
    <StyledSupport>
      <div className={isiPhone12Land ? "phone-container" : "container"}>
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
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
        superheading
        heading
        subheading
      }
    }
  }
`

export default Support
