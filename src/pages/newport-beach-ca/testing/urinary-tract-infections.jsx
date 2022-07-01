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

const StyledUrinaryTractInfections = styled.main``

const UrinaryTractInfections = ({
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

  // console.log(pingPongItems)
  // console.log(
  //     pingPongItems.some(item => item.Media && item.Media.localFiles[0])
  // )

  // console.log(imageTextData)

  function setPingPong() {
    if (
      pingPongItems.length === 0 ||
      !pingPongItems.some(
        item => item.data.Media && item.data.Media.localFiles[0]
      )
    )
      return ""
    if (isiPadPro12)
      return <MobilePingPong titleData={pingPongTitle} items={pingPongItems} />
    return <PingPong titleData={pingPongTitle} items={pingPongItems} />
  }

  return (
    <Layout>
      <Seo title={`NCUC | ${pageTitleData.Page_Title}`} />
      <StyledUrinaryTractInfections>
        <InnerHero data={heroData} />
        <TextSection
          superheading={textData.Superheader}
          subheading={textData.Subheading}
          heading={textData.Heading}
          copy={textData.Copy}
        />
        {setPingPong()}
        <CtaSection
          heading={ctaSectionData.Heading}
          subheading={ctaSectionData.Subheading}
          copy={ctaSectionData.Copy}
          buttonLabel={ctaSectionData.Button_Label}
          backgroundImage={ctaSectionData.Media}
        />
        {imageTextData?.Heading && imageTextData?.Copy && (
          <TextSection
            superheading={imageTextData.Superheader}
            subheading={imageTextData.Subheading}
            heading={imageTextData.Heading}
            copy={imageTextData.Copy}
          />
        )}

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
      </StyledUrinaryTractInfections>
    </Layout>
  )
}

export const query = graphql`
  query UrinaryTractInfections {
    pageTitleData: airtable(
      table: { eq: "Sitemap" }
      data: {
        Permalink: { eq: "/newport-beach-ca/testing/urinary-tract-infections/" }
      }
    ) {
      pageTitleData: data {
        Page_Title
      }
    }
    heroData: airtable(
      table: { eq: "Urinary Tract Infections" }
      data: { Block: { eq: "Hero" } }
    ) {
      heroData: data {
        Heading
        Overlay
        Media {
          localFiles {
            publicURL
          }
        }
        Subheading
      }
    }
    textData: airtable(
      table: { eq: "Urinary Tract Infections" }
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
      table: { eq: "Urinary Tract Infections" }
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
        table: { eq: "Urinary Tract Infections" }
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
      table: { eq: "Urinary Tract Infections" }
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
      table: { eq: "Urinary Tract Infections" }
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
      table: { eq: "Urinary Tract Infections" }
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
        table: { eq: "Urinary Tract Infections" }
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
      table: { eq: "Urinary Tract Infections" }
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
        table: { eq: "Urinary Tract Infections" }
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

export default UrinaryTractInfections
