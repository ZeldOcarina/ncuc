/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// gatsby-ssr.js
import React from "react"
// import "normalize.css/normalize.css"
import GlobalStyles from "./src/styles/global-styles"
import { ContextProvider } from "./src/context/AppContext"
import { LocationContext } from "./src/context/LocationContext"
import { parseParams } from "./src/utils/utils"

export const wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>
}

export const wrapPageElement = ({ element }) => {
  const params = parseParams(element.props.location.search)
  return (
    <>
      <LocationContext.Provider value={{ params }}>
        <GlobalStyles />
        {element}
      </LocationContext.Provider>
    </>
  )
}

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "en" })
}
