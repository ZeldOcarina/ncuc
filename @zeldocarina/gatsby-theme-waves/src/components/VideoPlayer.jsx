import React from "react"
import styled from "styled-components"

const StyledVideoPlayer = styled.div`
  .video {
    width: 100%;
    height: 100%;
    border-radius: 40px;
    overflow: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 19px 51px 0 rgba(0, 0, 0, 0.16),
      0 14px 19px 0 rgba(0, 0, 0, 0.07);
  }
`

const VideoPlayer = ({ video, mimeType, autoplay }) => {
  //console.log({ video, mimeType })
  return (
    <StyledVideoPlayer>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="video"
        autoPlay={autoplay === false ? false : true}
        controls
      >
        <source src={video} type={mimeType || "video/mp4"} />
        Your browser is not supported
      </video>
    </StyledVideoPlayer>
  )
}

export default VideoPlayer
