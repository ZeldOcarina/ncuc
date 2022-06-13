import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"
import { GiHamburgerMenu } from "react-icons/gi"
import { FaYoutube } from "react-icons/fa"

import AppContext from "../context/AppContext"
import { LocationContext } from "../context/LocationContext"
import { createLinkWithParams } from "../utils/utils"

//import giovanniLogo from "../images/giovanni-logo.svg"

const Wrapper = styled.nav`
  position: ${({ innerLayout }) =>
    innerLayout ? css`relative` : css`absolute`};
  top: 2rem;
  left: 0;
  width: 100%;

  height: 10rem;
  display: flex;
  align-items: center;
  z-index: 150;

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

  .container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
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
    width: 10rem;

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
  }

  .name {
    text-transform: initial;
    margin: 0;
    padding: 0;
  }
`

const Navbar = ({
  siteMetadata: {
    navbarLinks: {
      social: { youtube },
      pages,
    },
  },
  innerPage,
  innerLayout,
}) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(AppContext)
  const { params } = useContext(LocationContext)

  return (
    <Wrapper scrolled={false} innerLayout={innerLayout}>
      <div className="container">
        {/* <Link to="/">
          <img
            src={giovanniLogo}
            alt="Giovanni Setti Consulting Logo"
            className="logo"
          />
        </Link> */}

        <div
          className={
            innerPage
              ? "links-container links-container--dark"
              : "links-container"
          }
        >
          {pages.map(({ name, link }, i) => {
            const linkString = createLinkWithParams(link, params)
            return (
              <Link to={linkString} className="nav-link" key={i}>
                {name}
              </Link>
            )
          })}
          <a href={youtube} className="nav-link">
            <FaYoutube color="red" className="social-icon" />{" "}
            <span className="name">YouTube</span>
          </a>
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

export default Navbar
