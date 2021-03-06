import React, { useContext } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import AppContext from "../../../context/AppContext"
import Layout from "../../../layout/Layout"
import Seo from "../../../components/Seo"

import InnerHero from "../../../components/InnerHero"
import TextSection from "../../../components/TextSection"
import VideoSection from "../../../components/VideoSection"
import PingPong from "../../../components/PingPong"
import CtaSection from "../../../components/CtaSection"
import Faqs from "../../../components/Faqs"
import CardsSection from "../../../components/CardsSection"
import MobilePingPong from "../../../components/MobilePingPong"

const StyledSportsInjuries = styled.main``

const SportsInjuries = ({
  data: {
    pageTitleData: { pageTitleData },
    keywordsData: { keywordsData },
    heroData: { heroData },
    copySection: { copyData },
    videoData: { videoData },
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
  const { isiPadPro12 } = useContext(AppContext)

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
      <Seo
        title={`NCUC | ${pageTitleData.Page_Title}`}
        keywords={`${keywordsData.Main_Keyword} ${keywordsData.Relative_Keywords}`}
      />
      <StyledSportsInjuries>
        <InnerHero data={heroData} />
        <TextSection
          superheading={copyData.Superheader}
          subheading={copyData.Subheading}
          heading={copyData.Heading}
          copy={copyData.Copy}
        />
        <VideoSection
          heading={videoData.Heading}
          video={videoData.Media.localFiles[0].publicURL}
          mimeType={videoData.Media.raw.type}
          autoplay={false}
        />
        {setPingPong()}
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
            //console.log(cardDatum)
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
      </StyledSportsInjuries>
    </Layout>
  )
}

export const query = graphql`
  query SportsInjuries {
    keywordsData: airtable(
      table: { eq: "Sitemap" }
      data: { Page_Title: { eq: "Sports Injuries" } }
    ) {
      keywordsData: data {
        Main_Keyword
        Relative_Keywords
      }
    }
    pageTitleData: airtable(
      table: { eq: "Sitemap" }
      data: {
        Permalink: { eq: "/newport-beach-ca/minor-injuries/sports-injuries/" }
      }
    ) {
      pageTitleData: data {
        Page_Title
      }
    }
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
            publicURL
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
    videoData: airtable(
      table: { eq: "Sports injuries" }
      data: { Block: { eq: "Video" } }
    ) {
      videoData: data {
        Heading
        Media {
          raw {
            type
          }
          localFiles {
            publicURL
          }
        }
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
            publicURL
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

export default SportsInjuries
