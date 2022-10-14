import React, { useContext } from "react"
import styled, { css } from "styled-components"

import BackgroundImage from "./BackgroundImage"
import BackgroundVideo from "./BackgroundVideo"

import AppContext from "../context/AppContext"

import IntroSection from "./IntroSection"

import ShortcodeParser from "../helpers/ShortcodesParser"

const StyledHero = styled.header`
  min-height: 55vh;
  display: grid;
  place-items: center;
  position: relative;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || css`var(--white)`};

  .text-content {
    z-index: 100;
    text-align: center;
    z-index: 1;
    display: grid;
    justify-items: center;
    width: 50%;
    margin: 0 auto;

    &--inner-page {
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateY(-10rem) translateX(10rem);
      width: 60%;

      .intro-section .heading {
        text-align: left;
        font-weight: 400;
      }

      .intro-section .subheading {
        text-align: left;
        margin: var(--gutter) 0 0 0;
        font-weight: 400;
      }
    }
  }

  .intro-section {
    max-width: 100%;
    margin-bottom: var(--big-gutter);
    padding-bottom: 0;
    text-align: center;
    margin: 0 auto;
    padding: 0;

    .heading {
      margin: 0px;
      z-index: 10;
      position: relative;
      text-align: center;
      text-transform: uppercase;

      font-size: 5rem;
      line-height: 1.2;
      font-weight: 500;
    }

    .heading,
    .subheading {
      color: var(--white);
      text-transform: uppercase;
      font-weight: 300;
    }

    .subheading {
      font-size: 2rem;
    }
    &::after {
      display: none;
    }
  }
`

const Hero = ({
  image,
  mobileImage,
  superheading,
  heading,
  subheading,
  altText,
  overlay,
  isVideo,
  mimeType,
  button1Label,
  button1Link,
  button2Label,
  button2Link,
  isHomePage,
}) => {
  const { globalShortcodesData, colors } = useContext(AppContext)

  const parsedAltText = new ShortcodeParser(
    altText,
    globalShortcodesData
  ).parseShortcodes()

  let buttonContainer = ""
  if ((button1Label && button1Link) || (button2Label && button2Link)) {
    buttonContainer = (
      <div className="button-container">
        {button1Label && button1Link && (
          <a href={button1Link} className="btn btn--primary">
            {button1Label}
          </a>
        )}
        {button2Label && button2Link && (
          <a href={button2Link} className="btn btn--secondary">
            {button2Label}
          </a>
        )}
      </div>
    )
  }

  return (
    <StyledHero colors={colors}>
      <div
        className={
          isHomePage ? "text-content" : "text-content text-content--inner-page"
        }
      >
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
          makeHeadingH1
        />
        {buttonContainer}
      </div>
      {isVideo ? (
        <BackgroundVideo video={image} mimeType={mimeType} overlay={overlay} />
      ) : (
        <BackgroundImage
          image={image}
          mobileImage={mobileImage}
          altText={parsedAltText}
          isPlainImg
          overlay={overlay}
        />
      )}
    </StyledHero>
  )
}

export default Hero
