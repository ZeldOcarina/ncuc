import React from "react"
import styled from "styled-components"
import IntroSection from "./IntroSection"
import VideoPlayer from "./VideoPlayer"

const StyledVideoSection = styled.section`
  background-color: var(--background-dark);
`

const VideoSection = ({ superheading, heading, video, mimeType, autoplay }) => {
  // console.log({ video, mimeType })
  return (
    <StyledVideoSection id="video">
      <IntroSection superheading={superheading} heading={heading} padding={0} />
      <div className="container mt-5">
        <VideoPlayer
          video={video}
          mimeType={mimeType}
          autoplay={autoplay === false ? false : true}
        />
      </div>
    </StyledVideoSection>
  )
}

export default VideoSection
