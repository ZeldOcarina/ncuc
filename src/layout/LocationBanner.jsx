import React from "react"
import styled from "styled-components"

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

const LocationBanner = ({
  locationData: {
    nodes: [phone, tel, state, city],
  },
}) => {
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

export default LocationBanner
