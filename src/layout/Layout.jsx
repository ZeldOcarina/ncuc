import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"

import AppContext from "../context/AppContext"
import Navbar from "./Navbar"
import MobileNavbar from "./MobileNavbar"
import Footer from "./Footer"
import AlertMessage from "../components/AlertMessage"
import NavLogo from "./NavLogo"

const Layout = ({ children, salesLetter, innerLayout }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query)

  const { alertState, setAlertState } = useContext(AppContext)

  return (
    <>
      {salesLetter ? (
        <NavLogo />
      ) : (
        <Navbar siteMetadata={siteMetadata} innerLayout={innerLayout} />
      )}
      {children}
      <Footer siteMetadata={siteMetadata} />
      <MobileNavbar siteMetadata={siteMetadata} />

      <AlertMessage
        message={alertState.message}
        successful={alertState.successful}
        shown={alertState.shown}
        setAlertState={setAlertState}
      />
    </>
  )
}

const query = graphql`
  {
    site {
      siteMetadata {
        navbarLinks {
          social {
            youtube
          }
          pages {
            link
            name
          }
        }
      }
    }
  }
`

export default Layout
