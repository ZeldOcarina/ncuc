import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { MenuOrganizer } from "../helpers/MenuOrganizer"

import AppContext from "../context/AppContext"
import LocationBanner from "./LocationBanner"
import Navbar from "./Navbar"
import MobileNavbar from "./MobileNavbar"
import Footer from "./Footer"
import AlertMessage from "../components/AlertMessage"
import GallerySection from "./GallerySection"
import Map from "../components/Map"
import FooterLogoStripe from "../components/FooterLogoStripe"
import MonarchyStripe from "../components/MonarchyStripe"
// import ChristmasModal from "../components/ChristmasModal"
// import AdvertisingBanner from "../components/AdvertisingBanner"

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

  // console.table(organizedMenuData, categoriesData)

  const noLogoCategoriesData = categoriesData.filter(
    item => item.data.Parent !== "Logo"
  )

  return { categories: [...categories], menuData: noLogoCategoriesData }
}

const Layout = ({ children, innerLayout }) => {
  const {
    locationData,
    socialLinks,
    latAndLong: { nodes },
    phoneData: { phoneData },
    telData: { telData },
    stateData: { stateData },
    zipData: { zipData },
    cityData: { cityData },
    categoriesData: { categoriesData },
    logoData: { logoData },
    quickLinksData: { quickLinksData },
    galleryData: { galleryData },
  } = useStaticQuery(query)

  const { alertState, setAlertState } = useContext(AppContext)

  const lat = nodes?.find(node => node?.data?.Label === "Latitude")?.data?.Value
  const long = nodes?.find(node => node?.data?.Label === "Longitude")?.data
    ?.Value

  const address = locationData.nodes.find(item => item.data.Label === "Address")
    ?.data.Value

  const menuData = organizeMenu(categoriesData)
  const organizedMenu = new MenuOrganizer(categoriesData)

  return (
    <>
      {/* <AdvertisingBanner /> */}
      <LocationBanner
        phone={phoneData.Value}
        tel={telData.Value}
        address={address}
        state={stateData.Value}
        zip={zipData.Value}
        city={cityData.Value}
      />

      <Navbar innerLayout={innerLayout} menuData={organizedMenu} />

      {children}
      <GallerySection
        superheading={galleryData.Superheading}
        heading={galleryData.Heading}
        images={galleryData.Media.localFiles.map(image => image.publicURL)}
      />
      <Map lat={lat} long={long} mapName="map" />
      <FooterLogoStripe
        phone={phoneData.Value}
        tel={telData.Value}
        logo={logoData.File.localFiles[0].publicURL}
      />
      <Footer
        quickLinks={quickLinksData}
        locationData={locationData}
        socialLinks={socialLinks}
        state={stateData.Value}
        zip={zipData.Value}
        city={cityData.Value}
      />
      <MonarchyStripe />
      {/* <ChristmasModal /> */}
      <MobileNavbar menuData={menuData} />

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
          SubSection
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
    zipData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "ZipCode" } }
    ) {
      zipData: data {
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
        File {
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
        table: { eq: "Sitemap" }
        data: { Category: { eq: "QuickLinks" } }
      }
    ) {
      quickLinksData: nodes {
        data {
          Page_Title
          Permalink
        }
      }
    }
    galleryData: airtable(
      table: { eq: "Footer (Global)" }
      data: { Block: { eq: "Slider" } }
    ) {
      galleryData: data {
        Superheading
        Heading
        Media {
          localFiles {
            publicURL
          }
        }
      }
    }
  }
`

export default Layout
