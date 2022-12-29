import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { graphql } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"

import backgroundImage from "../images/hero.png"

import AppContext from "../context/AppContext"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"

import TextSection from "../components/TextSection"
import MobilePingPong from "../components/MobilePingPong"
import PingPong from "../components/PingPong"
import CtaSection from "../components/CtaSection"

const StyledThankYou = styled.main`
  .thank-you-container {
    background-image: linear-gradient(
        to right,
        rgba(43, 57, 144, 0.73),
        rgba(43, 57, 144, 0.73)
      ),
      url(${backgroundImage});
    padding: 0;
    margin: 0;
    background-size: cover;
    background-position: center;

    .container {
      min-height: 88vh;
      display: flex;
      justify-content: center;
      flex-direction: column;

      ${respond(
        "phone-port",
        css`
          padding: var(--section-gutter) 0;
          max-width: 95%;
        `
      )}
    }

    h1 {
      z-index: 10;
      text-transform: uppercase;
      color: var(--white);
      text-align: center;
      font-weight: 300;
    }

    p {
      font-size: 2.3rem;
      text-align: center;
      margin: 0.5rem auto;
      font-weight: 200;
      color: var(--white);
    }
  }
`

const ThankYou = ({
  data: {
    textData: { textData },
    pingPongTitle: { pingPongTitle },
    pingPongItems: { pingPongItems },
    ctaSectionData: { ctaSectionData },
    imageTextData: { imageTextData },
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
      return <PingPong titleData={pingPongTitle} items={pingPongItems} />
    if (isiPadPro12)
      return <MobilePingPong titleData={pingPongTitle} items={pingPongItems} />
    return <PingPong titleData={pingPongTitle} items={pingPongItems} />
  }

  return (
    <Layout>
      <StyledThankYou>
        <div className="thank-you-container">
          <div className="container">
            <h1>
              Thank you for contacting
              <br />
              Newport Center Urgent Care & Covid Clinic
            </h1>
            <p>
              We got your request and we will get back to you as soon as
              possible.
            </p>
            <p>
              Note that requests that come after 8PM or before 7AM will be
              handled the subsequent day.
            </p>
            <p>For medical emergencies, please call 911 immediately.</p>
          </div>
        </div>
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
          buttonLabel={ctaSectionData.ButtonLabel}
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
      </StyledThankYou>
    </Layout>
  )
}

export const Head = () => <Seo title={`NCUC | Thank You`} />

export const query = graphql`
  query ThankYou {
    textData: airtable(
      table: { eq: "About Us" }
      data: { Block: { eq: "Text" } }
    ) {
      textData: data {
        Superheading
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
        Superheading
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
              publicURL
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
        ButtonLabel
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
        Superheading
        Subheading
      }
    }
  }
`

export default ThankYou
