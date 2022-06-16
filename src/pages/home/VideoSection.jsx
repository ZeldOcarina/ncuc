import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import IntroSection from "../../components/IntroSection"
import YouTubeEmbed from "../../components/YouTubeEmbed"

const StyledVideoSection = styled.section`
  background-color: var(--background-dark);
`

const VideoSection = () => {
  const {
    video: {
      data: { header, subheading, videoId },
    },
  } = useStaticQuery(query)

  return (
    <StyledVideoSection>
      <IntroSection title={header} subtitle={subheading} padding={0} />
      <div className="container">
        <YouTubeEmbed id={videoId} />
      </div>
    </StyledVideoSection>
  )
}

const query = graphql`
  query VideoSection {
    video: airtable(
      table: { eq: "Home" }
      data: { blockName: { eq: "VideoSection" } }
    ) {
      data {
        subheading
        header
        videoId
      }
    }
  }
`

export default VideoSection
