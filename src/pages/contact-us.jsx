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
`

const ContactUs = () => {
  return (
    <Layout>
      <Seo title="Newport Urgent Care | Contact Us" />
      <StyledContactUs>
        <div className="container">
          <h1>SCHEDULE A VISIT</h1>
          <Form cta="Submit" />
        </div>
      </StyledContactUs>
    </Layout>
  )
}

export default ContactUs
