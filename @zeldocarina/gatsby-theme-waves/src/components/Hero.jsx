import React, { useContext } from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import BackgroundImage from "./BackgroundImage"
import BackgroundVideo from "./BackgroundVideo"

import AppContext from "../context/AppContext"

import ShortcodesParser from "../helpers/ShortcodesParser"

import HeroButtonsStripe from "./HeroButtonsStripe"
import HeroItem from "./HeroItem"
import MarkdownParser from "../helpers/MarkdownParser"
import useShortcodes from "../hooks/useShortcodes"

const StyledHero = styled.header`
  min-height: 60vh;
  position: relative;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || css`var(--white)`};

  /* Target not tall devices */
  @media (max-height: 790px) {
    min-height: 80vh;
  }
  @media (max-height: 640px) {
    min-height: 90vh;
  }
  @media (max-height: 550px) {
    min-height: 110vh;
  }
  @media (max-height: 450px) {
    min-height: 150vh;
  }
  ${respond(
    1130,
    css`
      min-height: 75vh;
    `
  )}
  ${respond(
    500,
    css`
      min-height: 72vh;
    `
  )}
  ${respond(
    380,
    css`
      min-height: 90vh;
    `
  )}
  ${respond(
    320,
    css`
      min-height: 135vh;
    `
  )}

  .text-content {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-35%, -5rem);
    z-index: 100;
    text-align: center;
    z-index: 1;
    display: grid;
    justify-items: center;
    max-width: 50%;
    margin: 0 auto;

    ${respond(
      1500,
      css`
        transform: translate(-25%, -5rem);
      `
    )}
    ${respond(
      1300,
      css`
        transform: translate(-10%, -5rem);
      `
    )}
    ${respond(
      1130,
      css`
        max-width: 90%;
        width: 100%;
        left: 50%;
        right: unset;
        transform: translateX(-50%);
        bottom: 5rem;
        place-content: center;
      `
    )}

    &--inner-page {
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateY(-10rem) translateX(20rem);
      width: max-content;
      max-width: 50%;
      right: unset;

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
      font-size: 4rem;
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
      font-weight: 300;
    }

    .heading {
      text-transform: uppercase;
    }

    .subheading {
      font-size: 2rem;
      margin-top: 0.5rem;
      font-weight: 400;

      a {
        color: var(--white);
      }
    }
    &::after {
      display: none;
    }
  }

  .hero-items {
    margin-top: var(--big-gutter);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--gutter);
    row-gap: calc(var(--gutter) * 2.5);

    ${respond(
      1130,
      css`
        width: 100%;
      `
    )}
    ${respond(
      400,
      css`
        column-gap: 1rem;
        row-gap: 4rem;
      `
    )}
    ${respond(
      320,
      css`
        grid-template-columns: 1fr;
      `
    )}
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
  isHomePage,
  heroItems,
  heroStripe,
}) => {
  const { colors } = useContext(AppContext)
  const shortcodes = useShortcodes()

  const parsedSubheading = new MarkdownParser({
    inputMarkdown: subheading,
    shortcodes,
  }).parseHtml()

  const parsedAltText = new ShortcodesParser(
    altText,
    shortcodes
  ).parseShortcodes()

  const heroCards = (
    <div className="hero-items">
      {heroItems.map(item => {
        return (
          <HeroItem
            key={item.id}
            {...item.data}
            bgImage={image}
            overlay={overlay}
          />
        )
      })}
    </div>
  )

  return (
    <>
      <StyledHero colors={colors} image={image} overlay={overlay}>
        <div
          className={
            isHomePage
              ? "text-content"
              : "text-content text-content--inner-page"
          }
        >
          <div className="intro-section">
            <h1 className="heading">{heading}</h1>
            <div className="subheading">{parsedSubheading}</div>
          </div>
          {heroItems && heroItems.length > 0 ? heroCards : null}
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
      {heroStripe &&
      heroStripe.Heading &&
      heroStripe.ButtonLabel &&
      heroStripe.ButtonLink ? (
        <HeroButtonsStripe
          title={heroStripe.Heading}
          link={heroStripe.ButtonLink}
          cta={heroStripe.ButtonLabel}
        />
      ) : null}
    </>
  )
}

export default Hero