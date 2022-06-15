import React from "react"
import styled from "styled-components"

const StyledCard = styled.article`
  background-color: var(--white);
  padding: 8rem 4rem 4rem 4rem;
  position: relative;

  .icon-container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--background-dark);
    padding: 1rem;
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
  }
`

const Card = ({ copy, header, icon }) => {
  console.log(copy, header, icon)
  return (
    <StyledCard>
      <div className="icon-container">
        <img src={icon.localFiles[0].publicURL} />
      </div>

      <h5>{header}</h5>
      <p>{copy}</p>
    </StyledCard>
  )
}

export default Card
