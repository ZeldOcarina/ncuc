import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"

const AppContext = React.createContext({})

function ContextProvider(props) {
  const isBrowser = typeof window !== "undefined"

  const isTabLand = useMediaQuery({ query: "(max-width: 75em)" })
  const isTabPort = useMediaQuery({ query: "(max-width: 56.25em)" })
  const isPhoneLand = useMediaQuery({ query: "(max-height: 400px)" })
  const isiPhone12 = useMediaQuery({ query: `(max-width: ${390 / 16}em)` })
  const isiPhone12ProMax = useMediaQuery({
    query: `(max-width: ${428 / 16}em)`,
  })
  const isPhonePort = useMediaQuery({ query: `(max-width: ${450 / 16}em)` })
  const isiPadPro11 = useMediaQuery({ query: `(max-width: ${834 / 16}em)` })
  const isiPhone12Land = useMediaQuery({ query: `(max-width: ${844 / 16}em)` })
  const isiPadPro12 = useMediaQuery({ query: `(max-width: ${1024 / 16}em)` })
  const isBigLaptop = useMediaQuery({ query: `(max-width: ${1920 / 16}em)` })
  const isNotebook = useMediaQuery({ query: `(max-width: ${1366 / 16}em)` })

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

  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState("")

  return (
    <AppContext.Provider
      value={{
        isTabLand,
        isTabPort,
        isPhoneLand,
        isPhonePort,
        isiPhone12Land,
        isiPadPro12,
        isiPadPro11,
        isiPhone12ProMax,
        isiPhone12,
        isNotebook,
        isBigLaptop,
        alertState,
        setAlertState,
        formData,
        setFormData,
        isFormSubmitting,
        setIsFormSubmitting,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isBrowser,
        hoveredCategory,
        setHoveredCategory,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
export { ContextProvider }
