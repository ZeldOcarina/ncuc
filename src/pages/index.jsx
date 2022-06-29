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
    faqsTitle: { faqsTitle },
    faqsData: { faqsData },
  },
}) => {
  //console.log(faqsData)
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
          superheading={faqsTitle.superheading}
          heading={faqsTitle.heading}
          subheading={faqsTitle.subheading}
          faqs={faqsData.map(item => {
            return {
              id: item?.id,
              data: { question: item.data.heading, answer: item.data.copy },
            }
          })}
        />
      </StyledIndex>
    </Layout>
  )
}

export const query = graphql`
  query HomeFAQs {
    faqsTitle: airtable(
      table: { eq: "Home" }
      data: { blockName: { eq: "FAQs" } }
    ) {
      faqsTitle: data {
        subheading
        superheading
        heading
      }
    }
    faqsData: allAirtable(
      filter: { table: { eq: "Home" }, data: { blockName: { eq: "FaqItem" } } }
    ) {
      faqsData: nodes {
        data {
          heading
          copy
        }
        id
      }
    }
  }
`

export default IndexPage
