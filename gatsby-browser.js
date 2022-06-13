/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"
import "./src/scss/index.scss"

import GlobalStyles from "./src/styles/global-styles"
import { ContextProvider } from "./src/context/AppContext"
import { LocationContext } from "./src/context/LocationContext"
import { parseParams } from "./src/utils/utils"

export const wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>
}

export const wrapPageElement = ({ element }) => {
  const params = parseParams(element.props.location.search)
  //console.log(params.toString())
  return (
    <>
      <GlobalStyles />
      <LocationContext.Provider value={{ params }}>
        {element}
      </LocationContext.Provider>
    </>
  )
}
