import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../../layout/Layout"
import Seo from "../../components/Seo"

import InnerHero from "../../components/InnerHero"
import TextSection from "../../components/TextSection"
import PingPong from "../../components/PingPong"
import CtaSection from "../../components/CtaSection"
import Faqs from "../../components/Faqs"
import CardsSection from "../../components/CardsSection"

const StyledSplintingAndBraces = styled.main``

const SplintingAndBraces = ({
  data: {
    heroData: { heroData },
    textData: { textData },
    pingPongTitle: { pingPongTitle },
    pingPongItems: { pingPongItems },
    faqsTitleData: { faqsTitleData },
    faqsData: { faqsData },
    cardsTitleData: { cardsTitleData },
    cardsData: { cardsData },
  },
}) => {
  //console.log(textData)
  return (
    <Layout>
      <Seo title={"NCUC | Splinting and Braces"} />{" "}
      <StyledSplintingAndBraces>
        <InnerHero data={heroData} />
        <TextSection
          superheading={textData.Superheader}
          subheading={textData.Subheading}
          heading={textData.Heading}
          copy={textData.Copy}
        />
        <PingPong titleData={pingPongTitle} items={pingPongItems} />
        {/* <CtaSection
          heading={ctaSectionData.Heading}
          subheading={ctaSectionData.Subheading}
          copy={ctaSectionData.Copy}
          buttonLabel={ctaSectionData.Button_Label}
          backgroundImage={ctaSectionData.Media}
        />
        <TextSection
          superheading={text2Data.Superheader}
          subheading={text2Data.Subheading}
          heading={text2Data.Heading}
          copy={text2Data.Copy}
        /> */}
        <Faqs
          superheading={faqsTitleData.Superheader}
          subheading={faqsTitleData.Subheading}
          heading={faqsTitleData.Heading}
          faqs={faqsData.map(item => {
            return {
              id: item.id,
              data: { question: item.data.Heading, answer: item.data.Copy },
            }
          })}
        />
        <CardsSection
          superheading={cardsTitleData.Superheader}
          heading={cardsTitleData.Heading}
          subheading={cardsTitleData.Subheading}
          cards={cardsData.map(cardDatum => {
            return {
              id: cardDatum.id,
              data: {
                heading: cardDatum.data.Heading,
                copy: cardDatum.data.Copy,
                icon: cardDatum.data.Media,
              },
            }
          })}
        />
      </StyledSplintingAndBraces>
    </Layout>
  )
}

export const query = graphql`
  query SplintingAndBraces {
    heroData: airtable(
      table: { eq: "Splinting and Braces" }
      data: { Block: { eq: "Hero" } }
    ) {
      heroData: data {
        Heading
        Media {
          localFiles {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
            }
          }
        }
        Subheading
      }
    }
    textData: airtable(
      table: { eq: "Splinting and Braces" }
      data: { Block: { eq: "Text" } }
    ) {
      textData: data {
        Superheader
        Heading
        Subheading
        Copy
      }
    }
    pingPongTitle: airtable(
      table: { eq: "Splinting and Braces" }
      data: { Block: { eq: "PingPong" } }
    ) {
      pingPongTitle: data {
        Subheading
        Heading
        Superheader
      }
    }
    pingPongItems: allAirtable(
      filter: {
        table: { eq: "Splinting and Braces" }
        data: { Block: { eq: "PingPongItem" } }
      }
    ) {
      pingPongItems: nodes {
        data {
          Heading
          Copy
          Media {
            localFiles {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        id
      }
    }
    faqsTitleData: airtable(
      table: { eq: "Splinting and Braces" }
      data: { Block: { eq: "FAQ" } }
    ) {
      faqsTitleData: data {
        Superheader
        Subheading
        Heading
      }
    }
    faqsData: allAirtable(
      filter: {
        table: { eq: "Splinting and Braces" }
        data: { Block: { eq: "FaqItem" } }
      }
    ) {
      faqsData: nodes {
        data {
          Heading
          Copy
        }
        id
      }
    }
    cardsTitleData: airtable(
      table: { eq: "Splinting and Braces" }
      data: { Block: { eq: "Cards" } }
    ) {
      cardsTitleData: data {
        Superheader
        Subheading
        Heading
      }
    }
    cardsData: allAirtable(
      filter: {
        table: { eq: "Splinting and Braces" }
        data: { Block: { eq: "CardItem" } }
      }
    ) {
      cardsData: nodes {
        data {
          Heading
          Copy
          Media {
            localFiles {
              publicURL
            }
          }
        }
        id
      }
    }
  }
`

export default SplintingAndBraces
