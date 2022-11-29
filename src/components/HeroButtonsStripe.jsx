import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

const StyledHeroButtonsStripe = styled.div`
  background-color: #afdfe4;
  color: var(--color-secondary);
  font-weight: 500;
  text-transform: uppercase;
  padding: 2rem 0;

  display: grid;
  grid-template-columns: repeat(2, max-content);
  place-items: center;
  place-content: center;
  gap: 2rem;

  ${respond(
    500,
    css`
      grid-template-columns: 1fr;
      gap: 1rem;
    `
  )}

  .button {
    display: block;
    height: 100%;
    padding: 1.5rem;
    color: var(--white);
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 10px;

    &--primary {
      background-color: var(--color-primary);
    }
    &--secondary {
      background-color: var(--color-secondary);
    }
    &--tertiary {
      background-color: var(--color-tertiary);
    }
    &--green {
      background-color: var(--green);
    }
  }
`

const HeroButtonsStripe = ({ title, link, cta }) => {
  return (
    <StyledHeroButtonsStripe>
      {title}
      <Link to={link} className="button button--primary">
        {cta}
      </Link>
    </StyledHeroButtonsStripe>
  )
}

export default HeroButtonsStripe
