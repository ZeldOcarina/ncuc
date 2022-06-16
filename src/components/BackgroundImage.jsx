import React from "react"
import styled, { css } from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

const StyledBackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  .overlay {
    ${({ background }) => {
      if (background) {
        return css`
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-image: linear-gradient(${background}, ${background});
        `
      }
    }}
  }

  .bg-image {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
  }
`

const BackgroundImage = ({ image, alt, overlay }) => {
  return (
    <StyledBackgroundImage background={overlay}>
      {overlay && <div className="overlay" />}
      <GatsbyImage className="bg-image" image={image} alt={alt} />
    </StyledBackgroundImage>
  )
}

export default BackgroundImage
