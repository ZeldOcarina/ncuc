import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Seo from "../components/Seo"
import Layout from "../layout/Layout"
import IntroSection from "../components/IntroSection"
import CopySection from "../components/CopySection"

const StyledPrivacyPolicy = styled.main`
  h2 {
    color: var(--body-color);
    margin-bottom: var(--gutter);
  }
`

const PrivacyPolicy = ({
  data: {
    pageTitleData: { pageTitleData },
    textData: { textData },
  },
}) => {
  return (
    <StyledPrivacyPolicy>
      <Seo title={`NCUC | ${pageTitleData.Page_Title}`} />
      <Layout>
        <div className="container">
          <IntroSection heading={textData.Heading} />
          <CopySection columns={1}>{textData.Copy}</CopySection>
        </div>
      </Layout>
    </StyledPrivacyPolicy>
  )
}

export const query = graphql`
  query PrivacyPolicy {
    pageTitleData: airtable(
      table: { eq: "Sitemap" }
      data: { Permalink: { eq: "/privacy-policy/" } }
    ) {
      pageTitleData: data {
        Page_Title
      }
    }
    textData: airtable(
      table: { eq: "Privacy Policy" }
      data: { Block: { eq: "Text" } }
    ) {
      textData: data {
        Copy
        Heading
      }
    }
  }
`

export default PrivacyPolicy
