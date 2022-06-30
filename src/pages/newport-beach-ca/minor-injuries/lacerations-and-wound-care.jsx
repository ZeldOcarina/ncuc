import React from "react"
import styled from "styled-components"

import Layout from "../../../layout/Layout"
import Seo from "../../../components/Seo"
import { graphql } from "gatsby"

import InnerHero from "../../../components/InnerHero"
import TextSection from "../../../components/TextSection"
import CtaSection from "../../../components/CtaSection"
import Faqs from "../../../components/Faqs"
import CardsSection from "../../../components/CardsSection"

const StyledLacerationsAndWoundCare = styled.main``

const LacerationsAndWoundCare = ({
  data: {
    pageTitleData: { pageTitleData },
    heroData: { heroData },
    textData: { textData },
    ctaSectionData: { ctaSectionData },
    imageTextData: { imageTextData },
    faqsTitleData: { faqsTitleData },
    faqsData: { faqsData },
    cardsTitleData: { cardsTitleData },
    cardsData: { cardsData },
  },
}) => {
  //   console.log(textData)
  return (
    <Layout>
      <Seo title={`NCUC | ${pageTitleData.Page_Title}`} />
      <StyledLacerationsAndWoundCare>
        <InnerHero data={heroData} />
        <TextSection
          superheading={textData.Superheader}
          subheading={textData.Subheading}
          heading={textData.Heading}
          copy={textData.Copy}
        />
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
              id: cardDatum.id,
              data: {
                heading: cardDatum.data.Heading,
                copy: cardDatum.data.Copy,
                icon: cardDatum.data.Media,
              },
            }
          })}
        />
      </StyledLacerationsAndWoundCare>
    </Layout>
  )
}

export const query = graphql`
  query LacerationAndWoundCare {
    pageTitleData: airtable(
      table: { eq: "Sitemap" }
      data: {
        Permalink: {
          eq: "/newport-beach-ca/minor-injuries/lacerations-and-wound-care/"
        }
      }
    ) {
      pageTitleData: data {
        Page_Title
      }
    }
    heroData: airtable(
      table: { eq: "Lacerations and Wound Care" }
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
      table: { eq: "Lacerations and Wound Care" }
      data: { Block: { eq: "Text" } }
    ) {
      textData: data {
        Superheader
        Heading
        Subheading
        Copy
      }
    }
    ctaSectionData: airtable(
      table: { eq: "Lacerations and Wound Care" }
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
    faqsTitleData: airtable(
      table: { eq: "Lacerations and Wound Care" }
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
        table: { eq: "Lacerations and Wound Care" }
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
      table: { eq: "Lacerations and Wound Care" }
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
        table: { eq: "Lacerations and Wound Care" }
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
    imageTextData: airtable(
      table: { eq: "Lacerations and Wound Care" }
      data: { Block: { eq: "ImageText" } }
    ) {
      imageTextData: data {
        Copy
        Heading
        Superheader
        Subheading
      }
    }
  }
`

export default LacerationsAndWoundCare
