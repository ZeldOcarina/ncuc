import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { MdClose } from "react-icons/md"
import { Link } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"

import AppContext from "../context/AppContext"
import Button from "../components/Button"

const StyledMobileNavbar = styled.div`
  width: 100vw;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(22, 176, 216, 0.96);
  transform: translateX(200vw);
  transition: all 0.3s ease-in-out;
  overflow: scroll;

  ${({ open }) => {
    //console.log(open);

    return (
      open &&
      css`
        transform: translateX(0);
      `
    )
  }}

  .close-icon {
    position: absolute;
    right: 3rem;
    top: 3rem;
    width: 5rem;
    height: auto;
    color: var(--white);

    ${respond(
      "phone-land",
      css`
        width: 5%;
      `
    )}
    ${respond(
      "phone-port",
      css`
        width: 3rem;
      `
    )}
    ${respond(
      "iphone-12-mini",
      css`
        top: 3rem;
        right: 3rem;
      `
    )}
  }

  .mobile-navbar {
    color: var(--color-primary);
    font-weight: 500;
    text-transform: uppercase;
    font-family: var(--body-font);
    font-size: 3.2rem;
    position: static;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rem;
    overflow: scroll;
    margin: 5rem 0;
    padding-bottom: 7rem;

    ${respond(
      "phone-land",
      css`
        font-size: 2.5rem;
        gap: 4rem;
      `
    )}
    ${respond(
      "phone-port",
      css`
        font-size: 2.3rem;
        width: 85%;

        margin: 4rem auto;
      `
    )}

    &__top-ul {
      list-style: none;
    }
    &__top-li {
      &:not(:last-child) {
        margin-bottom: 1.8rem;
      }
    }
    &__top-link {
      color: var(--white);
      font-family: var(--alternative-font);
      font-weight: 400;
    }
  }

  .categories-subitems {
    list-style: none;
    color: var(--white);
    margin-left: 2rem;

    li {
      color: var(--white);
    }

    &__link {
      color: #ffffff;
      font-size: 2.5rem;

      ${respond(
        "phone-port",
        css`
          font-size: 2rem;
        `
      )}
    }
  }
`

const MobileNavbar = ({ menuData: { categories, menuData } }) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(AppContext)

  return (
    <StyledMobileNavbar open={isMobileMenuOpen}>
      <nav className="mobile-navbar">
        <ul className="mobile-navbar__top-ul">
          <li className="mobile-navbar__top-li">
            <Button
              color="var(--color-tertiary)"
              width={"2rem"}
              navButton
              mobileNavButton
              type="link"
              url="/"
            >
              BOOK COVID TEST
            </Button>
          </li>
          {categories.map((category, i) => {
            const categoryItems = menuData.filter(
              item => item.data.Parent === category
            )
            return (
              <li className="mobile-navbar__top-li" key={i}>
                {/* <Link
                  className="mobile-navbar__top-link"
                  to={link}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                  }}
                > */}
                {category}
                <ul className="categories-subitems">
                  {categoryItems.map((item, i) => {
                    return (
                      <li className="categories-subitems__item" key={i}>
                        <Link
                          className="categories-subitems__link"
                          to={item.data.Permalink}
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          {item.data.Child}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                {/* </Link> */}
              </li>
            )
          })}
        </ul>
      </nav>
      <MdClose
        className="close-icon"
        onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen)
        }}
      />
    </StyledMobileNavbar>
  )
}

export default MobileNavbar
