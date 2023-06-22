import React from "react"
import styled from "styled-components"
import IntroSection from "../components/IntroSection"
import SwiperComponent from "../components/SwiperComponent"

const StyledGallerySection = styled.section`
  padding-bottom: 20px;
`

const GallerySection = ({ superheading, heading, images }) => {
  // console.log({ superheading, heading, images })
  return (
    <StyledGallerySection>
      <IntroSection superheading={superheading} heading={heading} />
      <SwiperComponent images={images} />
    </StyledGallerySection>
  )
}

export default GallerySection
