import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"

import AppContext from "../context/AppContext"
import LocationBanner from "./LocationBanner"
import Navbar from "./Navbar"
import MobileNavbar from "./MobileNavbar"
import Footer from "./Footer"
import AlertMessage from "../components/AlertMessage"
import NavLogo from "./NavLogo"
import GallerySection from "./GallerySection"
import Map from "../components/Map"
import FooterLogoStripe from "../components/FooterLogoStripe"
import MonarchyStripe from "../components/MonarchyStripe"

const Layout = ({ children, salesLetter, innerLayout }) => {
  const {
    menu,
    locationData,
    socialLinks,
    site: { siteMetadata },
    latAndLong: { nodes },
    phoneData: { phoneData },
    telData: { telData },
    stateData: { stateData },
    cityData: { cityData },
  } = useStaticQuery(query)

  const { alertState, setAlertState } = useContext(AppContext)

  const lat = nodes?.find(node => node?.data?.Label === "Latitude")?.data?.Value
  const long = nodes?.find(node => node?.data?.Label === "Longitude")?.data
    ?.Value

  return (
    <>
      <LocationBanner
        phone={phoneData.Value}
        tel={telData.Value}
        state={stateData.Value}
        city={cityData.Value}
      />
      {salesLetter ? (
        <NavLogo />
      ) : (
        <Navbar
          siteMetadata={siteMetadata}
          innerLayout={innerLayout}
          menu={menu}
        />
      )}
      {children}
      <GallerySection />
      <Map lat={lat} long={long} mapName="map" />
      <FooterLogoStripe />
      <Footer
        siteMetadata={siteMetadata}
        menu={menu}
        locationData={locationData}
        socialLinks={socialLinks}
      />
      <MonarchyStripe />
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
    socialLinks: allAirtable(
      filter: {
        table: { eq: "Config" }
        data: { Name: { eq: "Social Links" } }
      }
    ) {
      socialLinks: nodes {
        data {
          Label
          Value
        }
      }
    }
    locationData: allAirtable(
      filter: {
        data: {
          Label: { regex: "/State|City|Phone|Tel:|Address|Weekdays|Weekends/" }
        }
      }
    ) {
      nodes {
        data {
          Name
          Value
          Label
        }
      }
    }
    menu: allAirtable(
      filter: { table: { eq: "Menu" }, data: { Parent: { regex: "/Navbar/" } } }
    ) {
      nodes {
        id
        data {
          Child
          Permalink
        }
      }
    }
    latAndLong: allAirtable(
      filter: {
        table: { eq: "Config" }
        data: {
          Name: { eq: "Details" }
          Label: { regex: "/Latitude|Longitude/" }
        }
      }
    ) {
      nodes {
        data {
          Label
          Value
        }
      }
    }
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
    phoneData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Phone" } }
    ) {
      phoneData: data {
        Value
      }
    }
    telData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Tel:" } }
    ) {
      telData: data {
        Value
      }
    }
    stateData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "State" } }
    ) {
      stateData: data {
        Value
      }
    }
    cityData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "City" } }
    ) {
      cityData: data {
        Value
      }
    }
  }
`

export default Layout
