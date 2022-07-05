import React, { useContext } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import AppContext from "../../context/AppContext"

import Layout from "../../layout/Layout"
import Seo from "../../components/Seo"

import InnerHero from "../../components/InnerHero"
import TextSection from "../../components/TextSection"
import MobilePingPong from "../../components/MobilePingPong"
import PingPong from "../../components/PingPong"
import CtaSection from "../../components/CtaSection"

const StyledAboutUs = styled.main``

const AboutUs = ({
  data: {
    pageTitleData: { pageTitleData },
    heroData: { heroData },
    textData: { textData },
    pingPongTitle: { pingPongTitle },
    pingPongItems: { pingPongItems },
    ctaSectionData: { ctaSectionData },
    imageTextData: { imageTextData },
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
      return <PingPong titleData={pingPongTitle} items={pingPongItems} />
    if (isiPadPro12)
      return <MobilePingPong titleData={pingPongTitle} items={pingPongItems} />
    return <PingPong titleData={pingPongTitle} items={pingPongItems} />
  }

  return (
    <Layout>
      <Seo title={`NCUC | ${pageTitleData.Page_Title}`} />
      <StyledAboutUs>
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
      </StyledAboutUs>
    </Layout>
  )
}

export const query = graphql`
  query AboutUs {
    pageTitleData: airtable(
      table: { eq: "Sitemap" }
      data: { Permalink: { eq: "/newport-beach-ca/about-us/" } }
    ) {
      pageTitleData: data {
        Page_Title
      }
    }
    heroData: airtable(
      table: { eq: "About Us" }
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
      table: { eq: "About Us" }
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
      table: { eq: "About Us" }
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
        table: { eq: "About Us" }
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
      table: { eq: "About Us" }
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
      table: { eq: "About Us" }
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

export default AboutUs
