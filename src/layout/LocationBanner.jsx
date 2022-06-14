import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const StyledLocationBanner = styled.div`
  background-color: var(--color-secondary);
  color: var(--white);
  padding: 0.5rem 0;
  font-size: 1.6rem;

  .container {
    display: flex;
    justify-content: flex-end;
    font-weight: 500;
  }

  a {
    color: var(--white);
  }
`

const LocationBanner = () => {
  const {
    allAirtable: {
      nodes: [phone, tel, state, city],
    },
  } = useStaticQuery(query)

  return (
    <StyledLocationBanner>
      <div className="container">
        <p>
          Conveniently Located in {city.data.Value}, {state.data.Value} - Call
          Today: <a href={`tel:${tel.data.Value}`}>{phone.data.Value}</a>
        </p>
      </div>
    </StyledLocationBanner>
  )
}

const query = graphql`
  {
    allAirtable(
      filter: { data: { Label: { regex: "/State|City|Phone|Tel:/" } } }
    ) {
      nodes {
        data {
          Name
          Value
          Label
        }
      }
    }
  }
`

export default LocationBanner
