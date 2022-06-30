import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Seo from "../components/Seo"
import Layout from "../layout/Layout"
import IntroSection from "../components/IntroSection"
import CopySection from "../components/CopySection"

const StyledTermsOfUse = styled.main`
  h2 {
    color: var(--body-color);
    margin-bottom: var(--gutter);
  }
`

const TermsOfUse = ({
  data: {
    pageTitleData: { pageTitleData },
    textData: { textData },
  },
}) => {
  return (
    <StyledTermsOfUse>
      <Seo title={`NCUC | ${pageTitleData.Page_Title}`} />
      <Layout>
        <div className="container">
          <IntroSection heading={textData.Heading} />
          <CopySection columns={1}>{textData.Copy}</CopySection>
        </div>
      </Layout>
    </StyledTermsOfUse>
  )
}

export const query = graphql`
  query TermsOfUse {
    pageTitleData: airtable(
      table: { eq: "Sitemap" }
      data: { Permalink: { eq: "/terms-of-use/" } }
    ) {
      pageTitleData: data {
        Page_Title
      }
    }
    textData: airtable(
      table: { eq: "Terms of Use" }
      data: { Block: { eq: "Text" } }
    ) {
      textData: data {
        Copy
        Heading
      }
    }
  }
`

export default TermsOfUse
