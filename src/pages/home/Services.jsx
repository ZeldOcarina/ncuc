import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import IntroSection from "../../components/IntroSection"
import CardsContainer from "../../components/CardsContainer"
import Card from "../../components/Card"

const StyledServices = styled.section`
  background-color: var(--background-dark);
`

const Services = () => {
  const {
    intro: {
      data: { superheading, heading, subheading },
    },
    cards,
  } = useStaticQuery(query)

  return (
    <StyledServices>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
      </div>

      <CardsContainer>
        {cards?.nodes?.map(({ id, data }) => {
          return (
            <Card key={id} {...data}>
              Card
            </Card>
          )
        })}
      </CardsContainer>
    </StyledServices>
  )
}

const query = graphql`
  query Services {
    intro: airtable(
      table: { eq: "Home" }
      data: { blockName: { eq: "CardsIntro" } }
    ) {
      data {
        copy
        superheading
        heading
        subheading
      }
      id
    }
    cards: allAirtable(
      filter: { table: { eq: "Home" }, data: { blockName: { eq: "Card" } } }
    ) {
      nodes {
        data {
          copy
          superheading
          heading
          subheading
          icon {
            localFiles {
              publicURL
            }
          }
        }
        id
      }
    }
  }
`

export default Services
