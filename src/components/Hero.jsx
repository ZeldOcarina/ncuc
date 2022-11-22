import React, { useContext } from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import { Link } from "gatsby"

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

    ${respond(
      900,
      css`
        width: 80%;
      `
    )}
    ${respond(
      500,
      css`
        width: 90%;
      `
    )}

    &--inner-page {
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateY(-10rem) translateX(20rem);
      width: max-content;
      max-width: 50%;

      ${respond(
        900,
        css`
          transform: translateY(-50%) translateX(-50%);
          max-width: 100%;
          top: 50%;
          left: 50%;
          width: 100%;
        `
      )}

      .intro-section .heading {
        text-align: left;
        font-weight: 400;

        ${respond(
          900,
          css`
            text-align: center;
          `
        )}
      }

      .intro-section .subheading {
        text-align: left;
        margin: var(--gutter) 0 0 0;
        font-weight: 400;

        ${respond(
          900,
          css`
            text-align: center;
            margin: var(--gutter) auto 0 auto;
          `
        )}
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
    max-height: max-content;

    .heading {
      margin: 0px;
      z-index: 10;
      position: relative;
      text-align: center;
      text-transform: uppercase;
      font-size: 5rem;
      line-height: 1.2;
      font-weight: 500;

      ${respond(
        900,
        css`
          font-size: 4rem;
        `
      )}
      ${respond(
        500,
        css`
          font-size: 3rem;
        `
      )}
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

  const StyledButtonsStripe = styled.div`
    background-color: #afdfe4;
    color: var(--color-secondary);
    font-weight: 500;
    text-transform: uppercase;
    padding: 2rem 0;

    display: grid;
    grid-template-columns: repeat(2, max-content);
    place-items: center;
    place-content: center;
    gap: 2rem;

    ${respond(
      500,
      css`
        grid-template-columns: 1fr;
      `
    )}

    .button {
      display: block;
      height: 100%;
      padding: 1.5rem;
      color: var(--white);
      font-weight: 500;
      letter-spacing: 1px;
      border-radius: 10px;

      &--primary {
        background-color: var(--color-primary);
      }
      &--secondary {
        background-color: var(--color-secondary);
      }
      &--tertiary {
        background-color: var(--color-tertiary);
      }
      &--green {
        background-color: var(--green);
      }
    }
  `

  return (
    <>
      <StyledHero colors={colors}>
        <div
          className={
            isHomePage
              ? "text-content"
              : "text-content text-content--inner-page"
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
          <BackgroundVideo
            video={image}
            mimeType={mimeType}
            overlay={overlay}
          />
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
      <StyledButtonsStripe>
        We Accept all insurance!
        <Link to="/contact-us/" className="button button--primary">
          Request a visit
        </Link>
      </StyledButtonsStripe>
    </>
  )
}

export default Hero
