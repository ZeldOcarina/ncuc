import React from "react"
import styled from "styled-components"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import Hero from "./home/Hero"
import Services from "./home/Services"

const StyledIndex = styled.main``

const IndexPage = () => (
  <Layout>
    <Seo title="Gatsby Contentful Starter" />
    <StyledIndex>
      <Hero />
      <Services />
    </StyledIndex>
  </Layout>
)

export default IndexPage
