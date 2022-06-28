import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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

    &:nth-child(2) {
      margin-top: 10rem;
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
      transform: scale(1.07);
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
          return (
            <article className="ping-pong-card" key={id}>
              <GatsbyImage
                image={getImage(data.Media.localFiles[0])}
                alt={data.Heading}
                className="ping-pong-card__image"
              />
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
