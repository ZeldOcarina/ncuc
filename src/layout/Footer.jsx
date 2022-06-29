import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import FooterSocialIcons from "./FooterSocialIcons"

import { Colors } from "../styles/abstracts/abstracts"

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
    }
  }

  .copyright {
    display: grid;
    grid-template-columns: max-content max-content max-content;
    gap: 1rem;
  }
`

const Footer = ({ siteMetadata, menu, locationData, socialLinks }) => {
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
          {menu.nodes.map(menuItem => {
            return (
              <Link key={menuItem?.id} to={menuItem.data.Permalink}>
                {menuItem.data.Child}
              </Link>
            )
          })}
        </div>
        <div className="col-2">
          <h5>LOCATION</h5>
          <a href={telLink}>{phoneString}</a>
          <p>{weekdays}</p>
          <p>{weekends}</p>
          <p>{address.split("107")[0]}</p>
          <p>{address.split("107")[1]}</p>
          <p>&copy; {new Date().getFullYear()} NCUC. All Rights Reserved.</p>
          <p className="copyright">
            <Link to="/privacy">Privacy Policy</Link> |{" "}
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </p>
        </div>
      </div>
      <FooterSocialIcons socialLinks={socialLinks} />
    </StyledFooter>
  )
}

export default Footer
