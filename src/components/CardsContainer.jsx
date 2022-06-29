import React from "react"
import styled from "styled-components"
import respond from "../styles/abstracts/mediaqueries"
import { css } from "styled-components"

const StyledCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 480px);
  max-width: 90%;
  margin: 0 auto;
  column-gap: var(--gutter);
  row-gap: 8rem;
  justify-content: center;

  ${respond(
    "phone-port",
    css`
      grid-template-columns: repeat(auto-fit, 400px);
    `
  )}
  ${respond(
    "iphone-12",
    css`
      grid-template-columns: 100%;
    `
  )}
  ${respond(
    "big-desktop",
    css`
      grid-template-columns: repeat(auto-fit, 600px);
    `
  )}
`

const CardsContainer = ({ children }) => {
  return <StyledCardsContainer>{children}</StyledCardsContainer>
}

export default CardsContainer
