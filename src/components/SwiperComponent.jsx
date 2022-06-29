import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import respond from "../styles/abstracts/mediaqueries"

import AppContext from "../context/AppContext"

// Import Swiper styles
import "swiper/css/bundle"

const StyledSwiper = styled.div`
  .swiper-container {
    max-height: 60vh;

    ${respond(
      "iphone-12-pro-land",
      css`
        max-height: 100vh;
      `
    )}
  }
  .image {
    width: 100%;
    height: 100%;

    img {
      min-height: 70vh;

      ${respond(
        "iphone-12-pro-land",
        css`
          min-height: 90vh;
        `
      )}
    }
  }
`

const SwiperComponent = ({ images }) => {
  const { isiPadPro12 } = useContext(AppContext)

  return (
    <StyledSwiper>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={isiPadPro12 ? 2 : 3}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={swiper => console.log(swiper)}
        className="swiper-container"
      >
        {images?.localFiles?.map(image => {
          return (
            <SwiperSlide key={image.id}>
              <GatsbyImage
                image={getImage(image)}
                className="image"
                alt="internal and external spaces"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </StyledSwiper>
  )
}

export default SwiperComponent
