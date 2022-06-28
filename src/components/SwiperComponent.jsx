import React from "react"
import styled from "styled-components"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// Import Swiper styles
import "swiper/css/bundle"

const StyledSwiper = styled.div`
  .swiper-container {
    max-height: 60vh;
  }
  .image {
    width: 100%;
    height: 100%;

    img {
      min-height: 70vh;
    }
  }
`

const SwiperComponent = ({ images }) => {
  return (
    <StyledSwiper>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={3}
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
