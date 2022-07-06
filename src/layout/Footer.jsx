import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"

import FooterSocialIcons from "./FooterSocialIcons"

import { Colors } from "../styles/abstracts/abstracts"
import { useContext } from "react"
import AppContext from "../context/AppContext"

const StyledFooter = styled.footer`
  background-color: ${Colors.colorPrimary700};
  padding: var(--section-gutter) 0;

  .container {
    color: var(--white);
    display: grid;
    align-items: center;
    justify-content: center;
    height: 15rem;
    text-align: center;
    height: max-content;
    grid-template-columns: max-content max-content;
    align-items: flex-start;
    justify-content: space-around;

    ${respond(
      "iphone-12-pro-land",
      css`
        grid-template-columns: 1fr;
      `
    )}

    h5 {
      color: var(--grey500);
      font-weight: 400;
      font-size: 4rem;
    }

    a {
      color: var(--white);
      display: block;

      &:hover {
        color: var(--color-secondary);
      }
    }

    .col-1,
    .col-2 {
      display: grid;
      gap: 1rem;
      text-transform: uppercase;
      text-align: left;
      font-weight: 500;

      ${respond(
        "iphone-12-pro-land",
        css`
          text-align: center;
        `
      )}
    }
  }

  .copyright {
    display: grid;
    grid-template-columns: max-content max-content max-content;
    gap: 1rem;

    ${respond(
      "iphone-12-pro-land",
      css`
        margin-top: var(--big-gutter);
        justify-content: center;
      `
    )}
    ${respond(
      "iphone-12",
      css`
        margin-top: var(--big-gutter);
        grid-template-columns: 1fr;
      `
    )}
  }
`

const Footer = ({ quickLinks, locationData, socialLinks }) => {
  const { isiPhone12 } = useContext(AppContext)
  const phoneString = locationData.nodes.find(
    item => item.data.Label === "Phone"
  ).data.Value
  const telLink = locationData.nodes.find(item => item.data.Label === "Tel:")
    .data.Value
  // const state = locationData.nodes.find(item => item.data.Label === "State")
  //   .data.Value
  // const city = locationData.nodes.find(item => item.data.Label === "City").data
  //   .Value
  const address = locationData.nodes.find(item => item.data.Label === "Address")
    .data.Value
  const weekdays = locationData.nodes.find(
    item => item.data.Label === "Weekdays"
  ).data.Value
  const weekends = locationData.nodes.find(
    item => item.data.Label === "Weekends"
  ).data.Value

  return (
    <StyledFooter>
      <div className="container">
        <div className="col-1">
          <h5>QUICK LINKS</h5>
          {quickLinks.map((quickLink, i) => {
            return (
              <Link key={i} to={quickLink.data.heading}>
                {quickLink.data.superheading}
              </Link>
            )
          })}
        </div>
        <div className="col-2">
          <h5>LOCATION</h5>
          <a href={`tel:${telLink}`}>{phoneString}</a>
          <p>{weekdays}</p>
          <p>{weekends}</p>
          <p>{address.split("107")[0]}</p>
          <p>{address.split("107")[1]}</p>
          <p>&copy; {new Date().getFullYear()} NCUC. All Rights Reserved.</p>
          <p className="copyright">
            <Link to="/privacy-policy">Privacy Policy</Link>{" "}
            {isiPhone12 ? "" : " | "}
            <Link to="/terms-of-use">Terms of Use</Link>
          </p>
        </div>
      </div>
      <FooterSocialIcons socialLinks={socialLinks} />
    </StyledFooter>
  )
}

export default Footer
