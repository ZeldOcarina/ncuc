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

function organizeMenu(categoriesData) {
  const categories = new Set()
  const organizedMenuData = {}

  categoriesData.forEach(category => {
    if (category.data.Parent === "Logo") return
    categories.add(category.data.Parent)
  })

  categories.forEach(category => {
    organizedMenuData[category] = []
  })

  categoriesData.forEach(navItem => {
    if (navItem.data.Parent === "Logo") return
    organizedMenuData[navItem.data.Parent].push({
      link: navItem.data.Permalink,
      name: navItem.data.Child,
      category: navItem.data.Parent,
    })
  })

  const noLogoCategoriesData = categoriesData.filter(
    item => item.data.Parent !== "Logo"
  )

  return { categories: [...categories], menuData: noLogoCategoriesData }
}

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
    categoriesData: { categoriesData },
    logoData: { logoData },
    quickLinksData: { quickLinksData },
  } = useStaticQuery(query)

  const { alertState, setAlertState } = useContext(AppContext)

  const lat = nodes?.find(node => node?.data?.Label === "Latitude")?.data?.Value
  const long = nodes?.find(node => node?.data?.Label === "Longitude")?.data
    ?.Value

  const menuData = organizeMenu(categoriesData)

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
          menuData={menuData}
        />
      )}
      {children}
      <GallerySection />
      <Map lat={lat} long={long} mapName="map" />
      <FooterLogoStripe
        phone={phoneData.Value}
        tel={telData.Value}
        logo={logoData.Attachments.localFiles[0].publicURL}
      />
      <Footer
        siteMetadata={siteMetadata}
        quickLinks={quickLinksData}
        locationData={locationData}
        socialLinks={socialLinks}
      />
      <MonarchyStripe />
      <MobileNavbar siteMetadata={siteMetadata} menuData={menuData} />

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
    categoriesData: allAirtable(filter: { table: { eq: "Menu" }, data: {} }) {
      categoriesData: nodes {
        data {
          Parent
          Child
          Permalink
        }
      }
    }
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
    logoData: airtable(
      data: { Label: { eq: "Wide" }, Name: { eq: "Media" } }
      table: { eq: "Config" }
    ) {
      logoData: data {
        Attachments {
          localFiles {
            publicURL
          }
        }
        Name
        Label
      }
    }
    quickLinksData: allAirtable(
      filter: {
        table: { eq: "Footer (Global)" }
        data: { Block: { eq: "QuickLinks" } }
      }
    ) {
      quickLinksData: nodes {
        data {
          superheading
          heading
        }
      }
    }
  }
`

export default Layout
