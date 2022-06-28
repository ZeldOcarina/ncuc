import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { graphql, Link, useStaticQuery } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"
import { GiHamburgerMenu } from "react-icons/gi"

import AppContext from "../context/AppContext"
import { LocationContext } from "../context/LocationContext"
import { createLinkWithParams } from "../utils/utils"

const Wrapper = styled.nav`
  position: static;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 150;

  height: 7rem;
  font-size: 1.6rem;

  ${respond(
    "tab-land",
    css`
      margin-top: 0;
    `
  )}
  ${respond(
    "phone-land",
    css`
      margin-top: 0;
      top: 0;
    `
  )}
    ${respond(
    "phone-port",
    css`
      margin-top: 3.5rem;
      top: 1rem;
      height: max-content;
    `
  )}
    ${respond(
    "iphone-5",
    css`
      margin-top: 1.5rem;
      top: 2rem;
      height: max-content;
    `
  )}
  ${respond(
    "big-desktop",
    css`
      height: 12rem;
    `
  )}
    .container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .links-container {
    display: flex;
    gap: 2.5rem;
    align-items: center;

    ${respond(
      "tab-port",
      css`
        display: none;
      `
    )}

    &--dark {
      margin-left: auto;
      li,
      a,
      p {
        color: var(--black);
      }
    }
  }

  .social-icons {
    ${respond(
      "tab-port",
      css`
        display: none;
      `
    )}
  }

  .social-icon {
    font-size: 2.3rem;
  }

  .nav-link {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    ${respond(
      "big-desktop",
      css`
        font-size: 2.1rem;
      `
    )}
  }

  .mobile-menu-activator {
    display: none;

    ${respond(
      "tab-port",
      css`
        display: block;
        color: var(--color-secondary);
        position: absolute;
        right: 10%;
        width: 6%;
        height: auto;
      `
    )}
  }

  .logo {
    width: 20rem;

    ${respond(
      "iphone-12-pro-land",
      css`
        width: 8rem;
      `
    )}
    ${respond(
      "iphone-5",
      css`
        width: 5rem;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        width: 40rem;
      `
    )}
  }

  .name {
    text-transform: initial;
    margin: 0;
    padding: 0;
  }
`

const Navbar = ({ innerPage, innerLayout, menu }) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(AppContext)
  const { params } = useContext(LocationContext)

  const { logo } = useStaticQuery(query)

  //console.log(logo.nodes[0].data.Permalink)

  const logoUrl = logo.nodes[0].data.logo[0].url

  return (
    <Wrapper scrolled={false} innerLayout={innerLayout}>
      <div className="container">
        <Link to={logo?.nodes[0]?.data?.Permalink}>
          {<img src={logoUrl} alt="NCUC Logo" className="logo" />}
        </Link>

        <div
          className={
            innerPage
              ? "links-container links-container--dark"
              : "links-container"
          }
        >
          {menu?.nodes.map(({ data, id }) => {
            const linkString = createLinkWithParams(data?.Permalink, params)
            return (
              <Link to={linkString} className="nav-link" key={id}>
                {data.Child}
              </Link>
            )
          })}
        </div>
        <GiHamburgerMenu
          className="mobile-menu-activator"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
          }}
        />
      </div>
    </Wrapper>
  )
}

const query = graphql`
  {
    logo: allAirtable(
      filter: { table: { eq: "Menu" }, data: { Parent: { regex: "/Logo/" } } }
    ) {
      nodes {
        id
        data {
          Child
          Permalink
          logo {
            url
          }
        }
      }
    }
  }
`

export default Navbar
