import React from "react"
import styled from "styled-components"

import IntroSection from "./IntroSection"
import CardsContainer from "./CardsContainer"
import Card from "./Card"

const StyledCardsSection = styled.section`
  background-color: var(--background-dark);

  .container {
    margin-bottom: 10rem;
  }
`

const CardsSection = ({ superheading, heading, subheading, cards }) => {
  return (
    <StyledCardsSection>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
      </div>

      <CardsContainer>
        {cards.map(({ id, data }) => {
          return <Card key={id} {...data} />
        })}
      </CardsContainer>
    </StyledCardsSection>
  )
}

export default CardsSection
