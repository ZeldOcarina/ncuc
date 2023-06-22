import { useContext } from "react"

import { LocationContext } from "../context/LocationContext"

function useParams() {
  const { params } = useContext(LocationContext)

  const parsedParams = params.toString() ? "?" + params.toString() : ""

  return parsedParams
}

export default useParams
