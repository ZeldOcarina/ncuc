import React from "react"
import styled, { css } from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "./IntroSection"

const StyledMobilePingPong = styled.div`
  background-color: var(--background-dark);
  padding-bottom: 5rem;
  .ping-pong-card {
    margin-bottom: var(--big-gutter);

    &__image {
      width: 70%;
      margin-left: 50%;
      transform: translateX(-50%);

      ${(respond("iphone-12-pro-max"),
      css`
        width: 100%;
      `)}
    }
  }

  h5 {
    text-align: center;
    text-transform: uppercase;
    color: var(--color-tertiary);
    margin: var(--big-gutter) 0 var(--gutter) 0;
  }

  p {
    width: 90%;
    margin: 0 auto;
  }
`

const MobilePingPong = ({
  titleData: { Heading, Subheading, Superheader },
  items,
}) => {
  return (
    <StyledMobilePingPong>
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
    </StyledMobilePingPong>
  )
}

export default MobilePingPong
