import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import Hero from "../sections/home/Hero"
import Services from "../sections/home/Services"
import Support from "../sections/home/Support"
import VideoSection from "../sections/home/VideoSection"
import UrgentCare from "../sections/home/UrgentCare"
import BestClinic from "../sections/home/BestClinic"
import MostTrusted from "../sections/home/MostTrusted"
import ButtonsStripe from "../components/ButtonsStripe"
import Faqs from "../components/Faqs"

const StyledIndex = styled.main``

const IndexPage = ({
  data: {
    allAirtable: { faqs },
  },
}) => {
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
        <Faqs
          superheading="Newport Center Urgent Care Emergency Clinic"
          heading="Frequently Asked Questions"
          subheading=" Find Out Answers To The Most Commonly Asked Urgent Care Questions to help you and your family get the best possible medical care in Southern, CA"
          faqs={faqs}
        />
      </StyledIndex>
    </Layout>
  )
}

export const query = graphql`
  query HomeFAQs {
    allAirtable(
      filter: { table: { eq: "Home" }, data: { blockName: { eq: "FaqItem" } } }
    ) {
      faqs: nodes {
        data {
          question
          answer
        }
        id
      }
    }
  }
`

export default IndexPage
