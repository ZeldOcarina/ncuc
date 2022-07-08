import React from "react"
import styled, { css } from "styled-components"
import Button from "../components/Button"
import respond from "../styles/abstracts/mediaqueries"

const StyledButtonsStripe = styled.section`
  background-color: var(--color-secondary200);

  ${respond(
    "big-desktop",
    css`
      padding: 12rem 0;
    `
  )}

  .buttons-container {
    display: grid;
    grid-template-columns: max-content max-content;
    justify-items: center;
    width: max-content;
    margin: 0 auto;
    gap: var(--gutter);

    ${respond(
      "phone-port",
      css`
        grid-template-columns: 1fr;
      `
    )}
  }
`

const ButtonsStripe = () => {
  return (
    <StyledButtonsStripe>
      <div className="buttons-container">
        <Button type="internal" url="/contact-us" width="30rem" color="primary">
          Schedule a Visit
        </Button>
      </div>
    </StyledButtonsStripe>
  )
}

export default ButtonsStripe
