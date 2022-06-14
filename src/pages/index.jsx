import React from "react"
import styled from "styled-components"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"

const StyledIndex = styled.main`
  background-color: darkgreen;
`

const IndexPage = () => (
  <Layout>
    <Seo title="Gatsby Contentful Starter" />
    <StyledIndex>
      <h1>Hello World</h1>
    </StyledIndex>
  </Layout>
)

export default IndexPage
