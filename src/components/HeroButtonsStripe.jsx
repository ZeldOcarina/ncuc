import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"
import useParams from "../hooks/useParams"
// import useShortcodes from "../hooks/useShortcodes"

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
    800,
    css`
      grid-template-columns: 1fr;
      gap: 1rem;
      text-align: center;
    `
  )}

  .call {
    grid-column: 1 / -1;
  }

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
  const params = useParams()
  // const shortcodes = useShortcodes()

  // const phone = shortcodes.find(
  //   ({ shortcode }) => shortcode === "{{ phone }}"
  // ).data
  // const tel = shortcodes.find(({ shortcode }) => shortcode === "{{ tel }}").data

  return (
    <StyledHeroButtonsStripe>
      {title}
      <Link to={link + params} className="button button--primary">
        {cta}
      </Link>
      {/* <div className="call">
        <a className="button button--tertiary" href={`tel:${tel}`}>
          Call Now Immediately!
        </a>
      </div> */}
    </StyledHeroButtonsStripe>
  )
}

export default HeroButtonsStripe
