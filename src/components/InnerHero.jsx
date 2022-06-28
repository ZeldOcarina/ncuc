import { getImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"

import BackgroundImage from "./BackgroundImage"

const StyledInnerHero = styled.header`
  min-height: 88vh;
  background-color: var(--background-dark);
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;

  .text-container {
    margin: 0;
    z-index: 10;
    position: absolute;
    bottom: 20rem;
    left: 20rem;
    text-transform: uppercase;
    max-width: 50%;
  }

  h1 {
    color: var(--white);
    font-size: 6rem;
    line-height: 1.2;
    font-weight: 400;
    margin: 0;
  }

  p {
    color: var(--white);
    font-weight: 400;
    margin-top: var(--gutter);
    font-size: 1.5rem;
  }
`

const InnerHero = ({ data }) => {
  const image = getImage(data.Media.localFiles[0].childImageSharp)

  return (
    <StyledInnerHero>
      <div className="text-container">
        <h1>{data.Heading}</h1>
        <p>{data.Subheading}</p>
      </div>

      <BackgroundImage image={image} alt={data.Heading} />
    </StyledInnerHero>
  )
}

export default InnerHero
