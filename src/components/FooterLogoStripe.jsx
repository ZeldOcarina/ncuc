import React from "react"
import styled, { css } from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"

import Button from "./Button"

const StyledFooterLogoStripe = styled.div`
  padding: var(--gutter) 0;

  .phone {
    color: var(--color-primary);
    font-weight: 700;
    font-size: 2.6rem;
    margin-top: var(--gutter);

    ${respond(
      "big-desktop",
      css`
        font-size: 5rem;
      `
    )}
  }

  .logo {
    width: 50rem;

    ${respond(
      "big-desktop",
      css`
        width: 70rem;
      `
    )}
  }

  .top-part {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .buttons {
    display: grid;
    grid-template-columns: max-content max-content;
    justify-content: center;
    gap: var(--gutter);
    margin-top: var(--big-gutter);
    margin-bottom: var(--big-gutter);
  }
`

const FooterLogoStripe = ({ phone, tel, logo }) => {
  return (
    <StyledFooterLogoStripe>
      <div className="container">
        <div className="top-part">
          <img src={logo} alt="logo" className="logo" />
          <a className="phone" href={tel}>
            {phone}
          </a>
        </div>

        <div className="buttons">
          <Button
            color="var(--color-primary)"
            width="30rem"
            className="button"
            type="link"
          >
            Book in-person visit
          </Button>
          <Button
            type="link"
            color="var(--color-secondary)"
            width="30rem"
            className="button"
          >
            Book Telemedicine
          </Button>
        </div>
      </div>
    </StyledFooterLogoStripe>
  )
}

export default FooterLogoStripe
