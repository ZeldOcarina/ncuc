import React from "react"

import Abstracts from "./abstracts/abstracts"
import Animations from "./abstracts/animations"
import Base from "./base/base"
//import Typography from "./typography/fonts"
import Utils from "./utils/utils"
import Safari from "./utils/safari"

const GlobalStyles = () => {
  return (
    <>
      {/* <Typography /> */}
      <Abstracts />
      <Animations />
      <Base />
      <Utils />
      <Safari />
    </>
  )
}

export default GlobalStyles
