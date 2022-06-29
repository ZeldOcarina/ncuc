import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

const StyledLocationBanner = styled.div`
  background-color: var(--color-secondary);
  color: var(--white);
  padding: 0.5rem 0;
  font-size: 1.6rem;

  ${respond(
    "iphone-12-land",
    css`
      text-align: center;
    `
  )}
  ${respond(
    "iphone-12-mini",
    css`
      font-size: 1.4rem;
    `
  )}
  ${respond(
    "big-desktop",
    css`
      font-size: 2.2rem;
    `
  )}

  .container {
    display: flex;
    justify-content: flex-end;
    font-weight: 500;
  }

  a {
    color: var(--white);
  }
`

const LocationBanner = ({ phone, tel, state, city }) => {
  return (
    <StyledLocationBanner>
      <div className="container">
        <p>
          Conveniently Located in {city}, {state} - Call Today:{" "}
          <a href={`tel:${tel}`}>{phone}</a>
        </p>
      </div>
    </StyledLocationBanner>
  )
}

export default LocationBanner
