import React from "react"
import styled, { css } from "styled-components"
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
      "phone-port",
      css`
        width: 90%;
      `
    )}
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

    ${respond(
      "phone-port",
      css`
        grid-template-columns: 1fr;
        justify-items: center;
      `
    )}
  }
`

const FooterLogoStripe = ({ phone, tel, logo }) => {
  return (
    <StyledFooterLogoStripe>
      <div className="container">
        <div className="top-part">
          <img src={logo} alt="logo" className="logo" />
          <a className="phone" href={`tel:${tel}`}>
            {phone}
          </a>
        </div>

        <div className="buttons">
          <Button
            color="primary"
            className="button"
            type="internal"
            url="/contact-us"
          >
            Schedule a Visit
          </Button>
        </div>
      </div>
    </StyledFooterLogoStripe>
  )
}

export default FooterLogoStripe
