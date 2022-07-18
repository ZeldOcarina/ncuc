import React from "react"
import styled, { css } from "styled-components"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import Form from "../components/form/Form"
import respond from "../styles/abstracts/mediaqueries"

const StyledContactUs = styled.main`
  .container {
    margin: var(--section-gutter) auto;
    max-width: 50%;

    ${respond(
      "ipad-pro-11-port",
      css`
        max-width: 70%;
      `
    )}
    ${respond(
      "iphone-8-plus-land",
      css`
        max-width: 80%;
      `
    )}
    ${respond(
      "phone-port",
      css`
        max-width: 95%;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        max-width: 40%;
      `
    )}
  }

  h1 {
    text-transform: uppercase;
    font-weight: 300;
    color: var(--body-color);
    text-align: center;
  }

  .disclaimer {
    margin-top: var(--gutter);
    text-align: center;
    font-weight: 700;
  }
`

const ContactUs = () => {
  return (
    <Layout>
      <Seo title="Newport Urgent Care | Contact Us" />
      <StyledContactUs>
        <div className="container">
          <h1>REQUEST A VISIT</h1>
          <Form cta="Submit" />
          <p className="disclaimer">
            The appointment requests will be responded to within 24 business
            hours. <br />
            If it’s an emergency, please call 911 or go to the nearest ER.
          </p>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

export default ContactUs
