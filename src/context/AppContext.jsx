import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useMediaQuery } from "react-responsive"

const AppContext = React.createContext({})

function ContextProvider(props) {
  const data = useStaticQuery(query)

  // Select virtual dom refs
  const navbarRef = React.useRef(null)
  const locationBarRef = React.useRef(null)
  const anchorRef = React.useRef(null)

  const globalShortcodes = data.globalShortcodesData.globalShortcodesData

  const businessPhoneData = {
    phone: data.phoneData.phoneData.Value,
    tel: data.telData.telData.Value,
  }

  const colors = {
    bodyBackground: data.bodyBackgroundData.bodyBackgroundData.Value,
    backgroundDark: data.backgroundDarkData.backgroundDarkData.Value,
    bodyColor: data.bodyColorData.bodyColorData.Value,
    colorPrimary: data.colorPrimaryData.colorPrimaryData.Value,
    colorSecondary: data.colorSecondaryData.colorSecondaryData.Value,
    colorTertiary: data.colorTertiaryData.colorTertiaryData.Value,
    grey: data.greyData.greyData.Value,
    grey500: data.grey500Data.grey500Data.Value,
    green: data.greenData.greenData.Value,
    locationBannerBgColor:
      data.locationBarBgColorData.locationBarBgColorData.Value,
    appointmentButtonColor:
      data.appointmentButtonColorData.appointmentButtonColorData.Value,
    appointmentButtonHoverColor:
      data.appointmentButtonHoverColorData.appointmentButtonHoverColorData
        .Shortcodes,
    dentalOfferButtonColor:
      data.dentalOfferButtonColorData.dentalOfferButtonColorData.Value,
    mobileMenuColor: data.mobileMenuColorData.mobileMenuColorData.Value,
    mobileMenuCategoryColor:
      data.mobileMenuCategoryColorData.mobileMenuCategoryColorData.Value,
    dentalOfferButtonHoverColor:
      data.dentalOfferButtonHoverColorData.dentalOfferButtonHoverColorData
        .Shortcodes,
    black: data.blackData.blackData.Value,
    white: data.whiteData.whiteData.Value,
  }

  const isBrowser = typeof window !== "undefined"

  function checkMediaQuery(pixels) {
    if (!isBrowser) return
    const isMedia = window.matchMedia(`(max-width: ${pixels / 16}em)`)
    return isMedia.matches
  }
  const isPhonePort = useMediaQuery({ query: `(max-width: ${450 / 16}em)` })
  const isiPad = useMediaQuery({ query: `(max-width: ${768 / 16}em)` })
  const isBigLaptop = useMediaQuery({ query: `(max-width: ${1920 / 16}em)` })
  const isBigDesktop = useMediaQuery({ query: `(min-width: ${2500 / 16}em)` })

  const [alertState, setAlertState] = useState({
    successful: false,
    shown: false,
    message: "",
  })

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    privacy_accepted: false,
    newsletter_accepted: false,
  })

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState("")
  const [secondaryHoveredCategory, setSecondaryHoveredCategory] = useState("")

  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    setIsMobile(window.matchMedia("(hover:none)").matches)
  }, [])

  return (
    <AppContext.Provider
      value={{
        navbarRef,
        locationBarRef,
        anchorRef,
        globalShortcodes,
        businessName: data.businessData.businessData.Value,
        businessPhoneData,
        isMobile,
        checkMediaQuery,
        isPhonePort,
        isiPad,
        isBigLaptop,
        isBigDesktop,
        alertState,
        setAlertState,
        formData,
        setFormData,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isBrowser,
        hoveredCategory,
        setHoveredCategory,
        secondaryHoveredCategory,
        setSecondaryHoveredCategory,
        isNavbarOpen,
        setIsNavbarOpen,
        colors,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

const query = graphql`
  {
    colorPrimaryData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "colorPrimary" } }
    ) {
      colorPrimaryData: data {
        Value
      }
    }
    colorSecondaryData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "colorSecondary" } }
    ) {
      colorSecondaryData: data {
        Value
      }
    }
    colorTertiaryData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "colorTertiary" } }
    ) {
      colorTertiaryData: data {
        Value
      }
    }
    bodyBackgroundData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "bodyBackground" } }
    ) {
      bodyBackgroundData: data {
        Value
      }
    }
    backgroundDarkData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "backgroundDark" } }
    ) {
      backgroundDarkData: data {
        Value
      }
    }
    bodyColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "bodyColor" } }
    ) {
      bodyColorData: data {
        Value
      }
    }
    greyData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "grey" } }
    ) {
      greyData: data {
        Value
      }
    }
    grey500Data: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "grey500" } }
    ) {
      grey500Data: data {
        Value
      }
    }
    greenData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "green" } }
    ) {
      greenData: data {
        Value
      }
    }
    locationBarBgColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "locationBarBgColor" } }
    ) {
      locationBarBgColorData: data {
        Value
      }
    }
    appointmentButtonColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "appointmentButtonColor" } }
    ) {
      appointmentButtonColorData: data {
        Value
      }
    }
    appointmentButtonHoverColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "appointmentButtonColor" } }
    ) {
      appointmentButtonHoverColorData: data {
        Shortcodes
      }
    }
    dentalOfferButtonColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "dentalOfferButtonColor" } }
    ) {
      dentalOfferButtonColorData: data {
        Value
      }
    }
    dentalOfferButtonHoverColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "dentalOfferButtonColor" } }
    ) {
      dentalOfferButtonHoverColorData: data {
        Shortcodes
      }
    }
    mobileMenuColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "mobileMenuColor" } }
    ) {
      mobileMenuColorData: data {
        Value
      }
    }
    mobileMenuCategoryColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "mobileMenuCategoryColor" } }
    ) {
      mobileMenuCategoryColorData: data {
        Value
      }
    }
    blackData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "black" } }
    ) {
      blackData: data {
        Value
      }
    }
    whiteData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "white" } }
    ) {
      whiteData: data {
        Value
      }
    }
    addressData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Address" } }
    ) {
      addressData: data {
        Value
        Shortcodes
      }
    }
    businessData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Business Name" } }
    ) {
      businessData: data {
        Value
        Shortcodes
      }
    }
    cityData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "City" } }
    ) {
      cityData: data {
        Value
        Shortcodes
      }
    }
    stateData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "State" } }
    ) {
      stateData: data {
        Value
        Shortcodes
      }
    }
    cityStateData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "City, St" } }
    ) {
      cityStateData: data {
        Value
        Shortcodes
      }
    }
    zipcodeData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Zipcode" } }
    ) {
      zipcodeData: data {
        Value
        Shortcodes
      }
    }
    phoneData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Phone" } }
    ) {
      phoneData: data {
        Value
        Shortcodes
      }
    }
    telData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Tel:" } }
    ) {
      telData: data {
        Value
        Shortcodes
      }
    }
    businessEmailData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Email" } }
    ) {
      businessEmailData: data {
        Value
        Shortcodes
      }
    }
    siteUrlData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Web URL" } }
    ) {
      siteUrlData: data {
        Value
        Shortcodes
      }
    }
    globalShortcodesData: allAirtable(
      filter: {
        table: { eq: "Config" }
        data: { Shortcodes: { ne: null }, Category: { eq: "Details" } }
      }
    ) {
      globalShortcodesData: nodes {
        data {
          Label
          Shortcodes
          Value
          Category
        }
      }
    }
  }
`

export default AppContext
export { ContextProvider }
