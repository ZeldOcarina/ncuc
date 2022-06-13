import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"

const AppContext = React.createContext({})

function ContextProvider(props) {
  const isBrowser = typeof window !== "undefined"

  const isTabLand = useMediaQuery({ query: "(max-width: 75em)" })
  const isTabPort = useMediaQuery({ query: "(max-width: 56.25em)" })
  const isPhoneLand = useMediaQuery({ query: "(max-height: 400px)" })
  const isPhonePort = useMediaQuery({ query: "(max-width: 28.125em)" })

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

  return (
    <AppContext.Provider
      value={{
        isTabLand,
        isTabPort,
        isPhoneLand,
        isPhonePort,
        alertState,
        setAlertState,
        formData,
        setFormData,
        isFormSubmitting,
        setIsFormSubmitting,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isBrowser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
export { ContextProvider }
