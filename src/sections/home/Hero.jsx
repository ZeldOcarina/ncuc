import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import React from "react"
import styled, { css } from "styled-components"
import BackgroundImage from "../../components/BackgroundImage"
import respond from "../../styles/abstracts/mediaqueries"

import downArrow from "../../images/icons/down-arrow.svg"

import Button from "../../components/Button"

const StyledHero = styled.header`
  min-height: 90vh;
  background-color: var(--background-dark);
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;

  .down-arrow {
    margin-top: var(--big-gutter);
    width: 6.5rem;
  }

  ${respond(
    "ipad-pro-12-port",
    css`
      min-height: 92vh;
    `
  )}
  ${respond(
    "iphone-12-pro-land",
    css`
      min-height: 120vh;
    `
  )}
  ${respond(
    "iphone-12-mini-land",
    css`
      min-height: 140vh;
    `
  )}
  ${respond(
    "phone-port",
    css`
      min-height: 85vh;
    `
  )}
  ${respond(
    "big-desktop",
    css`
      min-height: 88vh;
    `
  )}

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

    ${respond(
      "macbook-air",
      css`
        font-size: 5rem;
      `
    )}
    ${respond(
      "iphone-12-pro-land",
      css`
        font-size: 4rem;
        max-width: 80%;
      `
    )}
    ${respond(
      "phone-port",
      css`
        font-size: 3.5rem;
        max-width: 85%;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        font-size: 7.8rem;
      `
    )}
  }
`

const Hero = () => {
  const {
    airtable: {
      data: { backgroundImage, btn1Label, heading, backgroundImageAlt },
    },
  } = useStaticQuery(query)
  return (
    <StyledHero>
      <div className="content-container">
        <h1 className="title">{heading}</h1>
        <div className="buttons-container">
          <Button
            type="internal"
            color="primary"
            width="30rem"
            url="/contact-us"
          >
            {btn1Label}
          </Button>
        </div>
        <a href="#dr-doonan-bio">
          <img
            className="down-arrow"
            src={downArrow}
            alt="Go to next section"
          />
        </a>
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
        btnTarget
        heading
      }
    }
  }
`
export default Hero
