import React, { useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import { Loader } from "@googlemaps/js-api-loader"
import respond from "../styles/abstracts/mediaqueries"

const StyledMap = styled.div`
  height: 50vh;

  ${respond(
    "phone-land",
    css`
      height: 100vh;
    `
  )}

  &:not(:last-child) {
    margin-bottom: var(--gutter);
  }

  // border-radius: 20px;
`

const Map = ({ mapName, lat, long }) => {
  const mapRef = useRef(null)

  useEffect(() => {
    async function loadMap() {
      const loader = new Loader({
        apiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
      })

      const google = await loader.load()
      const latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(long))
      const map = new google.maps.Map(mapRef.current, {
        center: latLng,
        zoom: 11,
      })

      new google.maps.Marker({
        position: latLng,
        map,
        title: "Hello!",
      })
    }

    loadMap()
  }, [lat, long])

  return <StyledMap ref={mapRef} id={mapName}></StyledMap>
}

export default Map
