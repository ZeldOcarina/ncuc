import React from "react"
import styled from "styled-components"

const StyledCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 480px);
  max-width: 90%;
  margin: 0 auto;
  column-gap: var(--gutter);
  row-gap: 8rem;
  justify-content: center;
`

const CardsContainer = ({ children }) => {
  return <StyledCardsContainer>{children}</StyledCardsContainer>
}

export default CardsContainer
