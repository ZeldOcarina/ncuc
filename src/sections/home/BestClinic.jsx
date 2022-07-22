import React from "react"
import styled, { css } from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import respond from "../../styles/abstracts/mediaqueries"

import IntroSection from "../../components/IntroSection"
import CopySection from "../../components/CopySection"
import BackgroundImage from "../../components/BackgroundImage"
import Button from "../../components/Button"

const StyledBestClinic = styled.section`
  position: relative;

  .buttons-container {
    display: grid;
    grid-template-columns: max-content max-content;
    justify-items: center;
    width: max-content;
    margin: 0 auto;
    gap: var(--gutter);
    margin-top: 7rem;

    ${respond(
      "phone-port",
      css`
        grid-template-columns: 1fr;
      `
    )}
  }

  .container {
    position: relative;
    z-index: 100;
  }
`

const BestClinic = () => {
  const {
    bestClinic: {
      data: {
        superheading,
        heading,
        subheading,
        copy,
        btn1Label,
        backgroundImage,
        backgroundImageAlt,
      },
    },
  } = useStaticQuery(query)

  return (
    <StyledBestClinic>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
          theme="light"
          whiteSuperTitle
        />
        <CopySection columns={1} theme="light">
          {copy}
        </CopySection>
        <div className="buttons-container">
          <Button
            color="primary"
            url="/contact-us"
            type="internal"
            width="27rem"
          >
            {btn1Label}
          </Button>
        </div>
      </div>
      <BackgroundImage
        image={backgroundImage.localFiles[0].publicURL}
        alt={backgroundImageAlt}
        isPlainImg
      />
    </StyledBestClinic>
  )
}

const query = graphql`
  query BestClinic {
    bestClinic: airtable(
      table: { eq: "Home" }
      data: { blockName: { eq: "BestClinic" } }
    ) {
      data {
        heading
        subheading
        superheading
        copy
        btn1Label
        btn1Link
        btn2Label
        backgroundImageAlt
        backgroundImage {
          localFiles {
            publicURL
          }
        }
      }
    }
  }
`

export default BestClinic
