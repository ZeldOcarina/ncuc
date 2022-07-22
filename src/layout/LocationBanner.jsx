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

  .content-container {
    display: flex;
    justify-content: flex-end;
    font-weight: 500;
    max-width: 97.5%;

    ${respond(
      1500,
      css`
        max-width: 95%;
      `
    )}
  }

  a {
    color: var(--white);
  }
`

const LocationBanner = ({ phone, tel, state, city, address, zip }) => {
  return (
    <StyledLocationBanner>
      <div className="content-container">
        <p>
          Located at{" "}
          <a href="https://www.google.com/maps/dir//Newport+Center+Urgent+Care+-+Newport+Beach+Urgent+Care,+360+San+Miguel+Dr+%23107,+Newport+Beach,+CA+92660,+United+States/@33.6134912,-117.8718255,20z/data=!4m8!4m7!1m0!1m5!1m1!1s0x80dce08f365b0ab9:0x981ae22279f7dd5!2m2!1d-117.8716033!2d33.6136217">
            {address} {city}, {state} {zip}
          </a>{" "}
          - Call Today: <a href={`tel:${tel}`}>{phone}</a>
        </p>
      </div>
    </StyledLocationBanner>
  )
}

export default LocationBanner
