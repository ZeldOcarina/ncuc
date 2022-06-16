import React from "react"
import styled from "styled-components"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import Hero from "./home/Hero"
import Services from "./home/Services"
import Support from "./home/Support"
import VideoSection from "./home/VideoSection"

const StyledIndex = styled.main``

const IndexPage = () => (
  <Layout>
    <Seo title="Newport Urgent Care" />
    <StyledIndex>
      <Hero />
      <Services />
      <Support />
      <VideoSection />
    </StyledIndex>
  </Layout>
)

export default IndexPage
