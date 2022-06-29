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

const StyledSportsInjuries = styled.main``

const SportsInjuries = ({
  data: {
    metaTitle: {
      data: { pageMetaTitle },
    },
    heroData: { heroData },
    copySection: { copyData },
    pingPongTitle: { pingPongTitle },
    pingPongItems: { pingPongItems },
    ctaSectionData: { ctaSectionData },
    text2Data: { text2Data },
    faqsTitleData: { faqsTitleData },
    faqsData: { faqsData },
    cardsTitleData: { cardsTitleData },
    cardsData: { cardsData },
  },
}) => {
  //console.log(cardsData)
  return (
    <Layout>
      <Seo title={pageMetaTitle} />{" "}
      <StyledSportsInjuries>
        <InnerHero data={heroData} />
        <TextSection
          superheading={copyData.Superheader}
          subheading={copyData.Subheading}
          heading={copyData.Heading}
          copy={copyData.Copy}
        />
        <PingPong titleData={pingPongTitle} items={pingPongItems} />
        <CtaSection
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
        />
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
      </StyledSportsInjuries>
    </Layout>
  )
}

export const query = graphql`
  query SportsInjuries {
    metaTitle: airtable(
      table: { eq: "Sports injuries" }
      data: { Block: { eq: "PageMetadata" } }
    ) {
      data {
        pageMetaTitle
      }
    }
    heroData: airtable(
      table: { eq: "Sports injuries" }
      data: { Block: { eq: "Hero" } }
    ) {
      heroData: data {
        Subheading
        Heading
        Media {
          localFiles {
            childImageSharp {
              gatsbyImageData(placeholder: TRACED_SVG, layout: FULL_WIDTH)
            }
          }
        }
        heading
      }
    }
    copySection: airtable(
      table: { eq: "Sports injuries" }
      data: { Block: { eq: "Text" } }
    ) {
      copyData: data {
        Subheading
        Heading
        Superheader
        Copy
      }
    }
    pingPongTitle: airtable(
      table: { eq: "Sports injuries" }
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
        table: { eq: "Sports injuries" }
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
    ctaSectionData: airtable(
      table: { eq: "Sports injuries" }
      data: { Block: { eq: "CTA" } }
    ) {
      ctaSectionData: data {
        Subheading
        Heading
        Copy
        Button_Label
        Media {
          localFiles {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
    text2Data: airtable(
      table: { eq: "Sports injuries" }
      data: { Block: { eq: "Text2" } }
    ) {
      text2Data: data {
        Superheader
        Subheading
        Heading
        Copy
      }
    }
    faqsTitleData: airtable(
      table: { eq: "Sports injuries" }
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
        table: { eq: "Sports injuries" }
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
      table: { eq: "Sports injuries" }
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
        table: { eq: "Sports injuries" }
        data: { Block: { eq: "Card" } }
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

export default SportsInjuries
