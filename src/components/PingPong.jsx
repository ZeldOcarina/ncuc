import React from "react"
import styled, { css } from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "./IntroSection"

const StyledPingPong = styled.section`
  background-color: var(--background-dark);

  .ping-pong-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 70vh;
    align-content: center;
    justify-content: center;
    position: relative;
    transform: translateX(5rem) scale(1.03);
    margin-bottom: 15rem;

    ${respond(
      "notebook",
      css`
        height: 80vh;
        margin-bottom: 15rem;
      `
    )}
    ${("ipad-pro-12.9-land",
    css`
      height: 70vh;
      margin-bottom: 10rem;
    `)}    

    &:nth-child(2) {
      margin-top: 10rem;

      ${("ipad-pro-12.9-land",
      css`
        margin-top: 0;
      `)}
    }

    &:not(:nth-child(2n)) {
      //grid-template-columns: 1.2fr 1.2fr;
      transform: translateX(-5rem) scale(1.03);

      .ping-pong-card__image {
        grid-column: 2 / 3;
        z-index: 1;
        position: relative;
      }
      .ping-pong-card__content {
        grid-column: 1 / 2;
        z-index: 10;
        transform: translateX(10rem) translateY(-50%);
        position: absolute;
      }
    }

    &__image {
    }

    &__content {
      position: absolute;
      top: 50%;
      right: 0;
      max-width: 65rem;
      background-color: var(--white);
      height: 60vh;
      padding: 5rem;
      transform: translateX(-10rem) translateY(-50%);
      overflow-y: auto;

      ${respond(
        "notebook",
        css`
          transform: translateX(-10rem) translateY(-50%) scale(1.05);
          max-width: 55rem;
          font-size: 1.8rem;
          height: 75vh;
        `
      )}

      ${("ipad-pro-12.9-land",
      css`
        max-height: 55vh;
      `)}

      ${("ipad-pro-11-land",
      css`
        max-height: 60vh;
        transform: translateX(0) translateY(-50%) scale(1);
        font-size: 1.6rem;
      `)}
      ${respond(
        "big-desktop",
        css`
          transform: translateX(-20rem) translateY(-50%) scale(1.05);
          max-width: 100rem;
        `
      )}

      h5 {
        text-transform: uppercase;
        text-align: center;
        color: var(--color-tertiary);
        align-self: center;
        margin-bottom: var(--gutter);
        font-size: 2.5rem;
      }
    }
  }
`

const PingPong = ({
  titleData: { Heading, Subheading, Superheader },
  items,
}) => {
  return (
    <StyledPingPong>
      <div className="container">
        <IntroSection
          superheading={Superheader}
          subheading={Subheading}
          heading={Heading}
        />
        {items.map(({ id, data }) => {
          const image = getImage(data?.Media?.localFiles[0])
          return (
            <article className="ping-pong-card" key={id}>
              {image ? (
                <GatsbyImage
                  image={image}
                  alt={data.Heading}
                  className="ping-pong-card__image"
                />
              ) : (
                <img
                  className="ping-pong-card__image"
                  src="https://via.placeholder.com/700?text=Image+not+available"
                  alt="Not found"
                />
              )}
              <div className="ping-pong-card__content">
                <h5>{data.Heading}</h5>
                <p>{data.Copy}</p>
              </div>
            </article>
          )
        })}
      </div>
    </StyledPingPong>
  )
}

export default PingPong
