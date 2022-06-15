import React from "react"
import styled from "styled-components"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import Hero from "./home/Hero"

const StyledIndex = styled.main``

const IndexPage = () => (
  <Layout>
    <Seo title="Gatsby Contentful Starter" />
    <StyledIndex>
      <Hero />
    </StyledIndex>
  </Layout>
)

export default IndexPage
