import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const StyledAdvertisingBanner = styled.div`
  background-color: var(--color-tertiary);
  color: var(--white);
  padding: 1rem 0;

  .content-container {
    max-width: 95%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    .ad-title {
      color: var(--white);
      font-weight: 500;
      font-size: 1.6rem;
    }

    .btn {
      color: var(--white);
      font-weight: 500;
      font-size: 1.6rem;
      background-color: rgba(255, 255, 255, 0.3);
      padding: 0.8rem 1.5rem;
    }
  }
`

const AdvertisingBanner = () => {
  return (
    <StyledAdvertisingBanner>
      <div className="content-container">
        <h5 className="ad-title">
          Flu vaccines are now available at all of our locations.
        </h5>
        <Link
          to="/newport-beach-ca/minor-illnesses/flu-vaccine"
          className="btn"
        >
          Schedule Today!
        </Link>
      </div>
    </StyledAdvertisingBanner>
  )
}

export default AdvertisingBanner
