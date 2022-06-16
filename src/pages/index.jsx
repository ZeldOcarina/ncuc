import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import Hero from "./home/Hero"
import Services from "./home/Services"
import Support from "./home/Support"
import VideoSection from "./home/VideoSection"
import UrgentCare from "./home/UrgentCare"
import BestClinic from "./home/BestClinic"
import MostTrusted from "./home/MostTrusted"
import ButtonsStripe from "../components/ButtonsStripe"
import Faqs from "../components/Faqs"

const StyledIndex = styled.main``

const IndexPage = ({
  data: {
    Faqs: { faqs },
  },
}) => {
  console.log(faqs)
  return (
    <Layout>
      <Seo title="Newport Urgent Care" />
      <StyledIndex>
        <Hero />
        <Services />
        <Support />
        <VideoSection />
        <UrgentCare />
        <BestClinic />
        <MostTrusted />
        <ButtonsStripe />
        <Faqs faqs={faqs} />
      </StyledIndex>
    </Layout>
  )
}

export const query = graphql`
  {
    Faqs: allAirtable(filter: { table: { eq: "Faqs" } }) {
      faqs: nodes {
        id
        data {
          answer
          question
        }
        table
      }
    }
  }
`

export default IndexPage
