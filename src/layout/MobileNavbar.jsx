import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { MdClose } from "react-icons/md"
import { Link } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"

import AppContext from "../context/AppContext"
import SocialIcons from "../components/SocialIcons"

const StyledMobileNavbar = styled.div`
  width: 100vw;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(29, 122, 237, 0.96);
  transform: translateX(200vw);
  transition: all 0.3s ease-in-out;

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
    right: 5rem;
    top: 5rem;
    width: 10%;
    height: auto;
    color: var(--white);

    ${respond(
      "phone-land",
      css`
        width: 5%;
      `
    )}
  }

  .mobile-navbar {
    color: var(--white);
    text-transform: uppercase;
    font-family: var(--body-font);
    font-size: 3.2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rem;

    ${respond(
      "phone-land",
      css`
        font-size: 2.5rem;
        gap: 4rem;
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
`

const MobileNavbar = ({
  siteMetadata: {
    navbarLinks: { pages, social },
  },
}) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(AppContext)

  return (
    <StyledMobileNavbar open={isMobileMenuOpen}>
      <nav className="mobile-navbar">
        <ul className="mobile-navbar__top-ul">
          {pages.map(({ link, name }, i) => {
            return (
              <li className="mobile-navbar__top-li" key={i}>
                <Link
                  className="mobile-navbar__top-link"
                  to={link}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                  }}
                >
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
        <SocialIcons socialLinks={social} mobileVersion />
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
