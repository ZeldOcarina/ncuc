import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

import Button from "./Button"

const StyledFooterLogoStripe = styled.div`
  padding: var(--gutter) 0;

  .phone {
    color: var(--color-primary);
    font-weight: 700;
    font-size: 2.6rem;
    margin-top: var(--gutter);
  }

  .logo {
    width: 50rem;
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

const FooterLogoStripe = () => {
  const {
    buttons: {
      data: { btn1Label, btn2Label },
    },
    allAirtable: { nodes },
  } = useStaticQuery(query)

  const phoneNumber = nodes.find(node => node.data.Label === "Phone").data.Value
  const telString = nodes.find(node => node.data.Label === "Tel:").data.Value
  const logo = nodes.find(node => node.data.Label === "Wide").data.Attachments
    .localFiles[0].publicURL

  return (
    <StyledFooterLogoStripe>
      <div className="container">
        <div className="top-part">
          <img src={logo} alt="logo" className="logo" />
          <a className="phone" href={telString}>
            {phoneNumber}
          </a>
        </div>

        <div className="buttons">
          <Button
            color="var(--color-primary)"
            width="30rem"
            className="button"
            type="link"
          >
            {btn1Label}
          </Button>
          <Button
            type="link"
            color="var(--color-secondary)"
            width="30rem"
            className="button"
          >
            {btn2Label}
          </Button>
        </div>
      </div>
    </StyledFooterLogoStripe>
  )
}

export const query = graphql`
  query FooterLogoStripe {
    buttons: airtable(
      data: { Block: { eq: "FooterLogoStrip" } }
      table: { eq: "Footer (Global)" }
    ) {
      data {
        btn1Label
        btn2Label
      }
    }
    allAirtable(
      filter: {
        table: { eq: "Config" }
        data: {
          Name: { regex: "/Logo|Details/" }
          Label: { regex: "/Wide|Phone|Tel:/" }
        }
      }
    ) {
      nodes {
        data {
          Attachments {
            localFiles {
              publicURL
            }
          }
          Label
          Value
        }
      }
    }
  }
`

export default FooterLogoStripe
