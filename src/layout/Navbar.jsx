import React, { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { graphql, Link, useStaticQuery } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"
import { GiHamburgerMenu } from "react-icons/gi"

import AppContext from "../context/AppContext"

import CategoryItem from "../components/CategoryItem"

import Button from "../components/Button"

const Wrapper = styled.nav`
  position: static;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 150;
  height: 8rem;
  font-size: 1.6rem;
  transition: all 0.3s ease-in-out;

  ${({ scrolled }) =>
    scrolled &&
    css`
      background-color: var(--white);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
      position: fixed;
      top: 0;
    `}

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
      ${({ scrolled }) =>
        !scrolled &&
        css`
          top: 1rem;
        `}
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
    max-width: 95%;
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

  .container {
    max-width: 1900px;

    ${respond(
      "big-desktop",
      css`
        max-width: 2200px;
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
      1550,
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
    color: var(--body-color);
    cursor: pointer;

    &:hover {
      color: var(--color-secondary);
    }

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
      1550,
      css`
        display: block;
        color: var(--color-secondary);
        position: absolute;
        right: 5%;
        width: 4rem;
        height: auto;
      `
    )}
    ${respond(
      "ipad-pro-12-port",
      css`
        right: 10%;
      `
    )}
  }

  .logo {
    width: 25rem;

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
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const { isMobileMenuOpen, setIsMobileMenuOpen, isBigLaptop } =
    useContext(AppContext)
  //const { params } = useContext(LocationContext)
  const { logo } = useStaticQuery(query)

  const logoUrl = logo.nodes[0].data.logo[0].url

  useEffect(() => {
    // Make navbar fixed on scroll
    const makeNavbarSticky = () => {
      window.scrollY === 0
        ? setIsNavbarScrolled(false)
        : setIsNavbarScrolled(true)
    }

    document.addEventListener("scroll", makeNavbarSticky)
    // cleanup state after component unmount
    return () => {
      document.removeEventListener("scroll", makeNavbarSticky)
    }
  })

  return (
    <Wrapper scrolled={isNavbarScrolled} innerLayout={innerLayout}>
      <div className={isBigLaptop ? "navbar-notebook-container" : "container"}>
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
            let locationsPage =
              category === "COVID Testing" &&
              menuData.menuData.find(item => item.data.Child === "Locations")

            const categoryItems = menuData.menuData.filter(
              item =>
                item.data.Parent === category && item.data.Child !== "Locations"
            )
            locationsPage && categoryItems.push(locationsPage)
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
          <Link className="nav-link" to="/newport-beach-ca/about-us/">
            ABOUT US
          </Link>
          <Button
            color="var(--color-tertiary)"
            navButton
            type="link"
            url="https://occctesting.com/"
          >
            BOOK COVID TEST
            <br />
            <span className="subline">Multiple Locations</span>
          </Button>
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
