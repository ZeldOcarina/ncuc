import React, { useContext } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import AppContext from "../../../context/AppContext"

import Layout from "../../../layout/Layout"
import Seo from "../../../components/Seo"

import InnerHero from "../../../components/InnerHero"
import TextSection from "../../../components/TextSection"
import MobilePingPong from "../../../components/MobilePingPong"
import PingPong from "../../../components/PingPong"
import CtaSection from "../../../components/CtaSection"
import Faqs from "../../../components/Faqs"
import CardsSection from "../../../components/CardsSection"

const StyledSplintingAndBraces = styled.main``

const SplintingAndBraces = ({
  data: {
    pageTitleData: { pageTitleData },
    heroData: { heroData },
    textData: { textData },
    pingPongTitle: { pingPongTitle },
    pingPongItems: { pingPongItems },
    ctaSectionData: { ctaSectionData },
    imageTextData: { imageTextData },
    faqsTitleData: { faqsTitleData },
    faqsData: { faqsData },
    cardsTitleData: { cardsTitleData },
    cardsData: { cardsData },
  },
}) => {
  const { isiPadPro12 } = useContext(AppContext)
  //console.log(pageTitleData)
  return (
    <Layout>
      <Seo title={`NCUC | ${pageTitleData.Page_Title}`} />
      <StyledSplintingAndBraces>
        <InnerHero data={heroData} />
        <TextSection
          superheading={textData.Superheader}
          subheading={textData.Subheading}
          heading={textData.Heading}
          copy={textData.Copy}
        />
        {isiPadPro12 ? (
          <MobilePingPong titleData={pingPongTitle} items={pingPongItems} />
        ) : (
          <PingPong titleData={pingPongTitle} items={pingPongItems} />
        )}

        <CtaSection
          heading={ctaSectionData.Heading}
          subheading={ctaSectionData.Subheading}
          copy={ctaSectionData.Copy}
          buttonLabel={ctaSectionData.Button_Label}
          backgroundImage={ctaSectionData.Media}
        />
        <TextSection
          superheading={imageTextData.Superheader}
          subheading={imageTextData.Subheading}
          heading={imageTextData.Heading}
          copy={imageTextData.Copy}
        />
        <Faqs
          superheading={faqsTitleData.Superheader}
          subheading={faqsTitleData.Subheading}
          heading={faqsTitleData.Heading}
          faqs={faqsData.map(item => {
            return {
              id: item?.id,
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
              id: cardDatum?.id,
              data: {
                heading: cardDatum.data.Heading,
                copy: cardDatum.data.Copy,
                icon: cardDatum.data.Media,
                linkLabel: cardDatum.data.Button_Label,
                link: cardDatum.data.Button_Link,
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
    pageTitleData: airtable(
      table: { eq: "Sitemap" }
      data: {
        Permalink: {
          eq: "/newport-beach-ca/minor-injuries/splinting-and-braces/"
        }
      }
    ) {
      pageTitleData: data {
        Page_Title
      }
    }
    heroData: airtable(
      table: { eq: "Splinting and Braces" }
      data: { Block: { eq: "Hero" } }
    ) {
      heroData: data {
        Heading
        Media {
          localFiles {
            publicURL
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
    ctaSectionData: airtable(
      table: { eq: "Splinting and Braces" }
      data: { Block: { eq: "CTA" } }
    ) {
      ctaSectionData: data {
        Subheading
        Heading
        Copy
        Button_Label
        Media {
          localFiles {
            publicURL
          }
        }
      }
    }
    imageTextData: airtable(
      table: { eq: "Splinting and Braces" }
      data: { Block: { eq: "ImageText" } }
    ) {
      imageTextData: data {
        Copy
        Heading
        Superheader
        Subheading
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
        data: { Block: { eq: "CardsItem" } }
      }
    ) {
      cardsData: nodes {
        data {
          Heading
          Copy
          Button_Label
          Button_Link
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
