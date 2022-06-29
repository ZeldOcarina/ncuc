import React, { useContext, useEffect } from "react"
import styled, { css } from "styled-components"
import { graphql, Link, useStaticQuery } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"
import { GiHamburgerMenu } from "react-icons/gi"

import AppContext from "../context/AppContext"
import { LocationContext } from "../context/LocationContext"

import CategoryItem from "../components/CategoryItem"
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
      margin-top: 0;
      top: 1rem;
      height: 8rem;
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

  .navbar-notebook-container {
    max-width: 1250px;
    margin: 0 auto;

    ${respond(
      "laptop-s",
      css`
        max-width: 1200px;
      `
    )}
    ${respond(
      "ipad-pro-11-land",
      css`
        max-width: 1000px;
      `
    )}
    ${respond(
      "tab-land",
      css`
        max-width: 800px;
      `
    )}
    ${respond(
      "iphone-12-pro-land",
      css`
        width: 85% !important;
        margin: 0 auto;
      `
    )}
  }

  .container,
  .navbar-notebook-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .links-container {
    display: flex;
    gap: 2.5rem;
    align-items: center;
    height: 100%;

    ${respond(
      "ipad-pro-12.9-land",
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
      "ipad-pro-12.9-land",
      css`
        display: block;
        color: var(--color-secondary);
        position: absolute;
        right: 10%;
        width: 4rem;
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
      "iphone-12-pro-land",
      css`
        width: 18rem;
      `
    )}
    ${respond(
      "phone-port",
      css`
        width: 22rem;
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

const Navbar = ({ innerPage, innerLayout, menuData }) => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    hoveredCategory,
    setHoveredCategory,
    isNotebook,
  } = useContext(AppContext)
  const { params } = useContext(LocationContext)
  const { logo } = useStaticQuery(query)

  const logoUrl = logo.nodes[0].data.logo[0].url

  return (
    <Wrapper scrolled={false} innerLayout={innerLayout}>
      <div className={isNotebook ? "navbar-notebook-container" : "container"}>
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
          {menuData.categories.map((category, i) => {
            const categoryItems = menuData.menuData.filter(
              item => item.data.Parent === category
            )
            //const linkString = createLinkWithParams(data?.Permalink, params)
            return (
              //<Link to={linkString} className="nav-link" key={id}>
              <CategoryItem
                category={category}
                key={i}
                categoryItems={categoryItems}
              />

              //</Link>
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
