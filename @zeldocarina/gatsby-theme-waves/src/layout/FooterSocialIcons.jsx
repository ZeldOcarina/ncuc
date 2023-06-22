import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaPinterest,
  FaYoutube,
  FaYelp,
  FaTwitter,
} from "react-icons/fa"

const StyledFooterSocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--section-gutter);
  gap: var(--gutter);

  ${respond(
    "big-desktop",
    css`
      margin-top: 8rem;
      gap: 3rem;
    `
  )}

  .icon {
    font-size: 3rem;

    ${respond(
      "big-desktop",
      css`
        font-size: 5rem;
      `
    )}
  }

  .active {
    color: var(--color-secondary) !important;
  }
`

const FooterSocialIcons = ({ socialLinks: { socialLinks } }) => {
  const facebookLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Facebook"
  )
  const instagramLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Instagram"
  )
  const twitterLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Twitter"
  )
  const youTubeLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Youtube"
  )
  const linkedInLink = socialLinks.find(
    socialLink => socialLink.data.Label === "LinkedIn"
  )
  const pinterestLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Pinterest"
  )
  const yelpLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Yelp"
  )

  function handleMouseEnter({ target }) {
    target.style.color = "var(--color-secondary)"
  }
  function handleMouseLeave({ target }) {
    target.style.color = "white"
  }

  return (
    <StyledFooterSocialIcons>
      {instagramLink.data.Value && (
        <div role="link" tabIndex={0}>
          <a href={instagramLink.data.Value}>
            <FaInstagram
              color="white"
              className="icon"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </a>
        </div>
      )}
      {facebookLink.data.Value && (
        <div role="link" tabIndex={0}>
          <a href={facebookLink.data.Value}>
            <FaFacebook
              color="white"
              className="icon"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </a>
        </div>
      )}
      {twitterLink.data.Value && (
        <div>
          <a href={twitterLink.data.Value}>
            <FaTwitter
              color="white"
              className="icon"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </a>
        </div>
      )}
      {youTubeLink.data.Value && (
        <div>
          <a href={youTubeLink.data.Value}>
            <FaYoutube
              color="white"
              className="icon"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </a>
        </div>
      )}
      {linkedInLink.data.Value && (
        <div>
          <a href={linkedInLink.data.Value}>
            <FaLinkedin
              color="white"
              className="icon"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </a>
        </div>
      )}
      {pinterestLink.data.Value && (
        <div>
          <a href={pinterestLink.data.Value}>
            <FaPinterest
              color="white"
              className="icon"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </a>
        </div>
      )}
      {yelpLink.data.Value && (
        <div>
          <a href={yelpLink.data.Value}>
            <FaYelp
              color="white"
              className="icon"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </a>
        </div>
      )}
    </StyledFooterSocialIcons>
  )
}

export default FooterSocialIcons
