import React from "react"
import styled from "styled-components"
import IntroSection from "../components/IntroSection"
import { graphql, useStaticQuery } from "gatsby"
import SwiperComponent from "../components/SwiperComponent"

const StyledGallerySection = styled.section`
  padding-bottom: 20px;
`

const GallerySection = () => {
  const {
    airtable: {
      data: { Media, superheading, heading, subheading },
    },
  } = useStaticQuery(query)

  return (
    <StyledGallerySection>
      <IntroSection
        superheading={superheading}
        heading={heading}
        subheading={subheading}
      />
      <SwiperComponent images={Media} />
    </StyledGallerySection>
  )
}

const query = graphql`
  query Gallery {
    airtable(
      table: { eq: "Footer (Global)" }
      data: { Media: { id: { ne: null } } }
    ) {
      data {
        Media {
          id
          localFiles {
            id
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
        superheading
        heading
        subheading
      }
    }
  }
`

export default GallerySection
