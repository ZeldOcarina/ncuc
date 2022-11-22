import React, { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { graphql, Link, useStaticQuery } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"
import { GiHamburgerMenu } from "react-icons/gi"
import { v4 as uuidv4 } from "uuid"

import AppContext from "../context/AppContext"

import CategoryItem from "../components/CategoryItem"

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

  .navbar-container {
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
  .navbar-container {
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
      1420,
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
      1420,
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

  .left-part {
    display: flex;
    align-items: center;
    gap: var(--gutter);

    .logo {
      margin-right: var(--big-gutter);
    }
  }

  .nav-button {
    display: block;
    height: 100%;
    padding: 1.5rem;
    color: var(--white);
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 10px;

    ${respond(
      1040,
      css`
        display: none;
      `
    )}

    &--primary {
      background-color: var(--color-primary);
    }
    &--secondary {
      background-color: var(--color-secondary);
    }
    &--tertiary {
      background-color: var(--color-tertiary);
    }
    &--green {
      background-color: var(--green);
    }
  }
`

const Navbar = ({ innerPage, innerLayout, menuData }) => {
  const { navbarRef } = useContext(AppContext)
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false)
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(AppContext)

  const {
    logoData: { logoData },
  } = useStaticQuery(query)

  const logoUrl = logoData?.logo.localFiles[0]?.publicURL

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

  // console.log(menuData)

  return (
    <Wrapper
      scrolled={isNavbarScrolled}
      innerLayout={innerLayout}
      ref={navbarRef}
    >
      <div className={"navbar-container"}>
        <div className="left-part">
          <Link to={logoData.Permalink}>
            {<img src={logoUrl} alt="NCUC Logo" className="logo" />}
          </Link>
          <Link
            className="nav-button nav-button--green"
            to="/newport-beach-ca/minor-illnesses/flu-vaccine/"
          >
            GET A FLU VACCINE
          </Link>
          <a
            href="https://occctesting.com/"
            className="nav-button nav-button--tertiary"
          >
            BOOK COVID TEST
          </a>
          <Link to="/contact-us" className="nav-button nav-button--secondary">
            REQUEST A VISIT
          </Link>
        </div>

        <div
          className={
            innerPage
              ? "links-container links-container--dark"
              : "links-container"
          }
        >
          {Object.entries(menuData).map(([key, value]) => {
            // value.forEach(item => {
            //   console.log(item)
            //   console.log(!!item.children)
            // })

            if (value.length > 1)
              return (
                <CategoryItem
                  category={key}
                  key={uuidv4()}
                  categoryItems={value}
                />
              )
            if (value.length === 1) {
              return (
                <Link to={value[0].link} key={uuidv4()}>
                  <p className="nav-link">{value[0].item}</p>
                </Link>
              )
            }
            return ""
          })}
          {/* <Button
            color="var(--color-tertiary)"
            navButton
            type="link"
            url="https://occctesting.com/"
          >
            BOOK COVID TEST
            <br />
            <span className="subline">Multiple Locations</span>
          </Button> */}
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
    logoData: airtable(
      table: { eq: "Menu" }
      data: { Child: { eq: "Logo Wide" } }
    ) {
      logoData: data {
        Permalink
        logo {
          localFiles {
            publicURL
          }
        }
      }
    }
  }
`

export default Navbar
