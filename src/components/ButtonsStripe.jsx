import React from "react"
import styled from "styled-components"
import Button from "../components/Button"
import { Colors } from "../styles/abstracts/abstracts"

const StyledButtonsStripe = styled.section`
  background-color: var(--color-secondary200);

  .buttons-container {
    display: grid;
    grid-template-columns: max-content max-content;
    justify-items: center;
    width: max-content;
    margin: 0 auto;
    gap: var(--gutter);
  }
`

const ButtonsStripe = () => {
  return (
    <StyledButtonsStripe>
      <div className="buttons-container">
        <Button type="button" width="30rem" color={Colors.colorPrimary}>
          Book in-person visit
        </Button>
        <Button type="button" width="30rem" color={Colors.colorSecondary}>
          Book Telemedicine
        </Button>
      </div>
    </StyledButtonsStripe>
  )
}

export default ButtonsStripe
