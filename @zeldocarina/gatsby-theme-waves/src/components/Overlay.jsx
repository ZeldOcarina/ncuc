import React from "react"
import styled from "styled-components"

const StyledOverlay = styled.div`
  ${({ background, isCards }) => {
    // console.log(background, isCards)

    if (background) {
      let css = `
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      `

      if (!isCards) {
        css += `
          background: ${background};
        `
      } else {
        css += `
        background: linear-gradient(
            -45deg,
            ${background[0]},
            ${background[1]}
          );`
      }
      return css
    }
  }}
`

const Overlay = ({ overlay, isCards }) => {
  return <StyledOverlay background={overlay} isCards={isCards} />
}

export default Overlay
