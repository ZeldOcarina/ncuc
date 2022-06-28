import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

const StyledCard = styled.article`
  background-color: var(--white);
  padding: 8rem 4rem 4rem 4rem;
  position: relative;

  ${respond(
    "big-desktop",
    css`
      padding: 10rem 6rem 4rem 6rem;
    `
  )}

  .icon-container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--background-dark);
    padding: 1rem;
    border-radius: 50%;
    width: 12rem;
    height: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 40%;
  }

  h5 {
    color: var(--color-tertiary);
    text-transform: uppercase;
    font-size: 2.4rem;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: var(--gutter);
    line-height: 1.4;
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;

    ${respond(
      "big-desktop",
      css`
        font-size: 3.2rem;
      `
    )}
  }
`

const Card = ({ copy, heading, icon }) => {
  return (
    <StyledCard>
      <div className="icon-container">
        <img src={icon?.localFiles[0]?.publicURL} alt={heading} />
      </div>

      <h5>{heading}</h5>
      <p>{copy}</p>
    </StyledCard>
  )
}

export default Card
