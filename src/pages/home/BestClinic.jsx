import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import IntroSection from "../../components/IntroSection"
import CopySection from "../../components/CopySection"
import BackgroundImage from "../../components/BackgroundImage"
import Button from "../../components/Button"
import { Colors } from "../../styles/abstracts/abstracts"

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
        header,
        subheading,
        intro,
        copy,
        btn1Label,
        btn1Link,
        btn2Label,
        // btn2Link,
        backgroundImage,
        backgroundImageAlt,
      },
    },
  } = useStaticQuery(query)

  return (
    <StyledBestClinic>
      <div className="container">
        <IntroSection
          title={header}
          subtitle={subheading}
          intro={intro}
          theme="light"
        />
        <CopySection columns={1} theme="light">
          {copy}
        </CopySection>
        <div className="buttons-container">
          <Button color={Colors.colorPrimary} type="button" width="27rem">
            {btn1Label}
          </Button>
          <Button color={Colors.colorSecondary} type="button" width="27rem">
            {btn2Label}
          </Button>
        </div>
      </div>
      <BackgroundImage
        image={getImage(backgroundImage.localFiles[0])}
        alt={backgroundImageAlt}
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
        header
        subheading
        intro
        copy
        btn1Label
        btn1Link
        btn2Label
        backgroundImageAlt
        backgroundImage {
          localFiles {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, quality: 100)
            }
          }
        }
      }
    }
  }
`

export default BestClinic
