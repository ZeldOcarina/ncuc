import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import respond from "../styles/abstracts/mediaqueries"

import { MdViewCarousel } from "react-icons/md"

import AppContext from "../context/AppContext"

// Import Swiper styles
import "swiper/css/bundle"

const StyledSwiper = styled.div`
  position: relative;

  ${respond(
    "phone-port",
    css`
      position: relative;
    `
  )}
  .swiper-container {
    max-height: 60vh;

    ${respond(
      "iphone-12-pro-land",
      css`
        max-height: 100vh;
      `
    )}
    ${respond(
      "phone-port",
      css`
        max-height: 60vh;
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
      ${respond(
        "ipad-pro-11-port",
        css`
          min-height: 70vh;
        `
      )}
      ${respond(
        "phone-port",
        css`
          min-height: 60vh;
          margin: 0 auto;
        `
      )}
    }
  }

  .slide-icon {
    color: var(--color-secondary);
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 4rem;
    z-index: 500;
  }
`

const SwiperComponent = ({ images }) => {
  const { isiPadPro11, isiPadPro12 } = useContext(AppContext)

  function setSlidesAmount() {
    if (isiPadPro11) {
      return 1
    } else if (isiPadPro12) {
      return 2
    } else {
      return 3
    }
  }

  return (
    <StyledSwiper>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={setSlidesAmount()}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={swiper => console.log(swiper)}
        className="swiper-container"
      >
        {images?.localFiles?.map(image => {
          return (
            <SwiperSlide key={image?.id}>
              <GatsbyImage
                image={getImage(image)}
                className="image"
                alt="internal and external spaces"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      {isiPadPro11 && <MdViewCarousel className="slide-icon" />}
    </StyledSwiper>
  )
}

export default SwiperComponent
