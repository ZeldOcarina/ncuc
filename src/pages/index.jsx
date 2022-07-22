import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import Hero from "../sections/home/Hero"
import ImageText from "../components/ImageText"
import Services from "../sections/home/Services"
import Support from "../sections/home/Support"
import VideoSection from "../components/VideoSection"
import UrgentCare from "../sections/home/UrgentCare"
import BestClinic from "../sections/home/BestClinic"
import MostTrusted from "../sections/home/MostTrusted"
import ButtonsStripe from "../components/ButtonsStripe"
import Faqs from "../components/Faqs"

const StyledIndex = styled.main``

const IndexPage = ({
  data: {
    keywordsData: { keywordsData },
    faqsTitle: { faqsTitle },
    faqsData: { faqsData },
    videoData: { videoData },
    imageTextData: { imageTextData },
  },
}) => {
  return (
    <Layout>
      <Seo
        title="Newport Urgent Care"
        keywords={`${keywordsData.Main_Keyword} ${keywordsData.Relative_Keywords}`}
      />
      <StyledIndex>
        <Hero />
        <ImageText {...imageTextData} />
        <VideoSection
          superheading={videoData.superheading}
          heading={videoData.heading}
          video={videoData.mediaDrop.localFiles[0].publicURL}
          mimeType={videoData.mediaDrop.raw.type}
          autoplay={false}
        />
        <Services />
        <Support />
        <ButtonsStripe />
        <UrgentCare />
        <BestClinic />
        <MostTrusted />
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
  query Home {
    keywordsData: airtable(
      table: { eq: "Sitemap" }
      data: { Category: { eq: "Home" } }
    ) {
      keywordsData: data {
        Main_Keyword
        Relative_Keywords
      }
    }
    videoData: airtable(
      table: { eq: "Home" }
      data: { blockName: { eq: "VideoSection" } }
    ) {
      videoData: data {
        superheading
        heading
        mediaDrop {
          localFiles {
            publicURL
          }
          raw {
            type
          }
        }
      }
    }
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
    imageTextData: airtable(
      table: { eq: "Home" }
      data: { blockName: { eq: "ImageText" } }
    ) {
      imageTextData: data {
        superheading
        heading
        copy
        AltText
        mediaDrop {
          localFiles {
            publicURL
          }
        }
      }
    }
  }
`

export default IndexPage
