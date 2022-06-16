import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import BackgroundImage from "../../components/BackgroundImage"

import Button from "../../components/Button"
import { Colors } from "../../styles/abstracts/abstracts"

const StyledHero = styled.header`
  min-height: 88vh;
  background-color: var(--background-dark);
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;

  .buttons-container {
    display: grid;
    gap: var(--small-gutter);
    margin-top: var(--section-gutter);
  }

  .content-container {
    z-index: 1;
    display: grid;
    justify-items: center;
    width: 100%;
  }

  h1 {
    margin: 0;
    z-index: 10;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    color: var(--white);
    max-width: 60%;
    font-size: 6rem;
    line-height: 1.2;
    font-weight: 400;
  }
`

const Hero = () => {
  const {
    airtable: {
      data: {
        backgroundImage,
        btn1Label,
        btn2Label,
        header,
        backgroundImageAlt,
      },
    },
  } = useStaticQuery(query)
  return (
    <StyledHero>
      <div className="content-container">
        <h1 className="title">{header}</h1>
        <div className="buttons-container">
          <Button type="button" color={Colors.colorSecondary} width="30rem">
            {btn1Label}
          </Button>
          <Button type="button" color={Colors.colorPrimary} width="30rem">
            {btn2Label}
          </Button>
        </div>
      </div>

      <BackgroundImage
        image={getImage(backgroundImage?.localFiles[0])}
        alt={backgroundImageAlt}
        overlay={"rgba(0, 0, 0, 0.226)"}
      />
    </StyledHero>
  )
}

const query = graphql`
  query Hero {
    airtable(data: { blockName: { eq: "Hero" } }, table: { eq: "Home" }) {
      id
      data {
        backgroundImage {
          localFiles {
            childImageSharp {
              gatsbyImageData(placeholder: TRACED_SVG)
            }
          }
        }
        backgroundImageAlt
        btn1Label
        btn2Label
        btnTarget
        header
      }
    }
  }
`
export default Hero
