import React from "react"
import styled, { css } from "styled-components"
import { graphql } from "gatsby"

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
    margin-bottom: 1rem;
  }

  .disclaimer {
    margin-top: var(--gutter);
    text-align: center;
    font-weight: 700;
  }

  .subheading {
    text-align: center;
    margin-bottom: var(--gutter);
    color: var(--color-tertiary);
    font-weight: 500;

    a {
      color: var(--color-tertiary);
      font-weight: 500;
      text-decoration: underline;
    }
  }
`

const ContactUs = ({
  data: {
    phoneData: { phoneData },
    telData: { telData },
  },
}) => {
  return (
    <Layout>
      <StyledContactUs>
        <div className="container">
          <h1>REQUEST A VISIT</h1>
          <p className="subheading">
            For faster assistance call{" "}
            <a href={`tel:${telData.Value}`}>{phoneData.Value}</a>
          </p>
          <Form cta="Submit" />
          <p className="disclaimer">
            Appointment Requests are typically responded to within 24 business
            hours. This request is for non-urgent appointments only. If you are
            experiencing a medical emergency, please call 911 immediately or
            head to your nearest emergency room. If you'd like to talk to
            someone directly, please call our office at{" "}
            <a className="phone" href={`tel:${telData.Value}`}>
              {phoneData.Value}
            </a>
            .
          </p>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

export const Head = () => <Seo title="Newport Urgent Care | Contact Us" />

export const query = graphql`
  query ContactUs {
    phoneData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Phone" } }
    ) {
      phoneData: data {
        Value
      }
    }
    telData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Tel:" } }
    ) {
      telData: data {
        Value
      }
    }
  }
`

export default ContactUs
