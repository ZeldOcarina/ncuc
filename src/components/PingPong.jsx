import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"
import { parseMarkdown } from "../helpers/helpers"

import IntroSection from "./IntroSection"

const StyledPingPong = styled.section`
  background-color: var(--background-dark);

  .container {
    display: grid;
    gap: 10rem;

    ${respond(
      1000,
      css`
        gap: 5rem;
      `
    )}
  }

  .ping-pong-card {
    display: flex;
    align-items: center;
    position: relative;

    ${respond(
      1000,
      css`
        display: block;
      `
    )}

    &__image {
      width: 60%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      object-position: center;

      ${respond(
        1000,
        css`
          position: static;
          width: 100%;
          transform: none;
          aspect-ratio: unset;
        `
      )}
    }

    &__content {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 65rem;
      height: 65rem;
      background-color: var(--white);
      aspect-ratio: 1 / 1;
      padding: 5rem;

      ${respond(
        1410,
        css`
          width: 55rem;
          height: 55rem;
        `
      )}
      ${respond(
        1200,
        css`
          width: 48rem;
          height: 48rem;
        `
      )}
      ${respond(
        1000,
        css`
          position: static;
          width: 100%;
          transform: none;
          aspect-ratio: unset;
        `
      )}
    }

    // Select all uneven childs
    &:nth-child(odd) {
      flex-direction: row-reverse;

      .ping-pong-card__content {
        top: 50%;
        left: 0;
        transform: translateY(-50%);

        ${respond(
          1000,
          css`
            transform: unset;
          `
        )}
      }
    }

    h5 {
      text-transform: uppercase;
      text-align: center;
      color: var(--color-tertiary);
      align-self: center;
      margin-bottom: var(--gutter);
      font-size: 2.5rem;
    }
  }
`

const PingPong = ({ superheading, heading, subheading, items }) => {
  return (
    <StyledPingPong>
      <div className="container">
        <IntroSection
          superheading={superheading}
          subheading={subheading}
          heading={heading}
        />
        {items.map(({ id, data }) => {
          const image = data?.Media?.localFiles[0].publicURL
          return (
            <article className="ping-pong-card" key={id}>
              {image ? (
                <img
                  src={image}
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
                <div className="text">
                  {parseMarkdown({
                    inputMarkdown: data.Copy,
                  })}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </StyledPingPong>
  )
}

export default PingPong
